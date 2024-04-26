import React, {
  MutableRefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { blocksApi } from '@dopt/javascript-common';

import {
  BlockTransitionHandler,
  Blocks,
  FlowIntentHandler,
  Flows,
  FlowStatus,
  ProviderConfig,
} from './types';
import { PKG_NAME, PKG_VERSION, URL_PREFIX } from './utils';

import type {
  Block as APIBlock,
  Flow as APIFlow,
  Field as APIField,
} from '@dopt/javascript-common';
import { DoptContext } from './context';
import { Logger } from '@dopt/logger';

function flowVersionsEqual(
  previous: ProviderConfig['flows'],
  current: ProviderConfig['flows']
): boolean {
  if (!previous || !current) {
    return false;
  }

  const previousFlows = Object.keys(previous);
  const currentFlows = Object.keys(current);

  if (previousFlows.length !== currentFlows.length) {
    return false;
  }

  for (const previousFlow of previousFlows) {
    if (previous[previousFlow] !== current[previousFlow]) {
      return false;
    }
  }

  return true;
}

export type FlowContext = {
  uninitialized: boolean;
  flows: Flows;
  flowBlocks: Map<APIFlow['sid'], APIBlock['uid'][]>;
  flowStatuses: Record<APIFlow['uid'], FlowStatus>;
  flowIntention: FlowIntentHandler;
  blocks: Blocks;
  blockUidBySid: Map<APIBlock['sid'], APIBlock['uid']>;
  blockIntention: BlockTransitionHandler;
  blockFields: Map<APIBlock['uid'], Map<APIField['sid'], APIField>>;
  log: MutableRefObject<Logger>;
};

export const FlowContext = createContext<FlowContext>({} as FlowContext);

export interface FlowProviderProps
  extends Pick<ProviderConfig, 'optimisticUpdates' | 'children'> {
  flows: ProviderConfig['flows'];
}

export function FlowProvider(props: FlowProviderProps) {
  const { flows: flowVersions, children, optimisticUpdates = true } = props;
  const { apiKey, groupId, userId, logger, socket, socketStatus } =
    useContext(DoptContext);

  const [flows, setFlows] = useState<Flows>({});
  const [flowStatuses, setFlowStatuses] = useState<
    Record<APIFlow['sid'], FlowStatus>
  >({});
  const [flowBlocks, setFlowBlocks] = useState<
    Map<APIFlow['sid'], APIBlock['uid'][]>
  >(new Map());

  const [blocks, setBlocks] = useState<Blocks>({});
  const [blockFields, setBlockFields] = useState<
    Map<APIBlock['uid'], Map<APIField['sid'], APIField>>
  >(new Map());
  const [blockUidBySid, setBlockSidMap] = useState<Map<string, string>>(
    new Map<string, string>()
  );

  const [uninitialized, setUninitialized] = useState<boolean>(true);

  /**
   * Create a stable state variable for flowVersions so that
   * we can use it as a dependency in hooks.
   */
  const [stableFlowVersions, setStableFlowVersions] = useState(flowVersions);
  useEffect(() => {
    setStableFlowVersions((stableFlowVersions) => {
      return !flowVersionsEqual(stableFlowVersions, flowVersions)
        ? flowVersions
        : stableFlowVersions;
    });
  }, [flowVersions]);

  /*
   * Create the Blocks API Client
   */
  const { getFlow, flowIntent, blockIntent } = useMemo(
    () =>
      blocksApi({
        apiKey,
        userId,
        groupId,
        logger: logger.current,
        config: {
          urlPrefix: URL_PREFIX,
          packageVersion: PKG_VERSION,
          packageName: PKG_NAME,
        },
      }),
    [userId, apiKey, groupId, logger]
  );

  const fetchFlows = useCallback(
    (flows: ProviderConfig['flows']) => {
      return Promise.all(
        Object.entries(flows || {}).map(([sid, version]) =>
          getFlow({ sid, version })
        )
      );
    },
    [getFlow]
  );

  useEffect(() => {
    if (!socket) {
      return;
    }

    function handleBlocksFromServer(blocks: Blocks) {
      logger.current.debug(
        `The following blocks were updated and pushed from the server.\n${Object.values(
          blocks
        )
          .map((block) => JSON.stringify(block, null, 2))
          .join('\n')}`
      );

      setBlocks((previousBlocks) => ({
        ...previousBlocks,
        ...blocks,
      }));
    }

    function handleFlowFromServer(flow: APIFlow) {
      logger.current.debug(
        `The following flow was updated and pushed from the server.\n${JSON.stringify(
          flow,
          null,
          2
        )}`
      );

      setFlows((previousFlows) => {
        return {
          ...previousFlows,
          [flow.sid]: flow,
        };
      });
    }

    socket.on('blocks', handleBlocksFromServer);
    socket.on('flow', handleFlowFromServer);

    return () => {
      socket.off('blocks', handleBlocksFromServer);
      socket.off('flows', handleFlowFromServer);
    };
  }, [socket, logger]);

  useEffect(() => {
    if (!socket || !stableFlowVersions) {
      return;
    }

    function handleReadyFromServer() {
      if (stableFlowVersions) {
        Object.entries(stableFlowVersions).forEach(([sid, version]) => {
          socket?.emit('watch:flow', sid, version);
          logger.current.debug(
            `Watching flow "${sid}" (version "${version}") for state changes and transitions`
          );
        });
      }
    }

    socket.on('ready', handleReadyFromServer);

    return () => {
      socket.off('ready', handleReadyFromServer);
    };
  }, [socket, stableFlowVersions, logger]);

  useEffect(() => {
    if (!socket || !userId || socketStatus !== 'ready') {
      return;
    }

    /*
     * Fetch all Flows based on the Record<Flow['sid'], Flow['version']>
     * entries passed in as props (via `flowVersions`)
     */
    fetchFlows(stableFlowVersions)
      .then((flows) => {
        const _flows: Flows = {};
        const _flowBlocks: typeof flowBlocks = new Map();
        const _flowStatuses: Record<APIFlow['sid'], FlowStatus> = {};

        const _blocks: Blocks = {};
        const _blockFields: typeof blockFields = new Map();
        const _blockUidBySid: typeof blockUidBySid = new Map();

        flows.forEach((flow) => {
          _flows[flow.sid] = flow;
          _flowStatuses[flow.sid] = {
            pending: false,
            failed: flow.version === -1,
          };

          _flowBlocks.set(flow.sid, flow.blocks?.map(({ uid }) => uid) || []);

          flow.blocks?.forEach((block) => {
            _blocks[block.uid] = block;

            _blockUidBySid.set(block.sid, block.uid);

            _blockFields.set(
              block.uid,
              block.fields.reduce((map, field) => {
                return map.set(field.sid, field);
              }, new Map<APIField['sid'], APIField>())
            );
          });
        });

        setFlows(_flows);
        setFlowBlocks(_flowBlocks);

        setBlocks(_blocks);
        setBlockFields(_blockFields);
        setBlockSidMap(_blockUidBySid);

        setFlowStatuses(_flowStatuses);

        setUninitialized(false);

        logger.current?.info('Flows and blocks fetched successfully');
      })
      .catch((_) => {
        logger.current?.error(`
          An error occurred while fetching blocks for the
          flow versions specified: \`${JSON.stringify(stableFlowVersions)}\`
        `);
      });
  }, [socket, userId, fetchFlows, socketStatus, stableFlowVersions, logger]);

  const blockIntention: BlockTransitionHandler = useMemo(() => {
    return (uid, transitions) => {
      if (blocks[uid]) {
        const block = blocks[uid];

        blockIntent({
          uid,
          sid: block.sid,
          version: block.version,
          transitions,
        });

        if (optimisticUpdates && block.state.active) {
          setBlocks((previousBlocks) => ({
            ...previousBlocks,
            [uid]: {
              ...block,
              state: {
                entered: true,
                exited: true,
                active: false,
              },
            },
          }));
        }
      }
    };
  }, [blockIntent, blocks, optimisticUpdates]);

  const flowIntention: FlowIntentHandler = useMemo(() => {
    return {
      start: (sid, version, force) => {
        flowIntent({ sid, version, intent: 'start', force });
      },
      reset: (sid, version, force) => {
        flowIntent({ sid, version, intent: 'reset', force });
      },
      finish: (sid, version) => {
        flowIntent({ sid, version, intent: 'finish' });
      },
      stop: (sid, version) => {
        flowIntent({ sid, version, intent: 'stop' });
      },
    };
  }, [flowIntent]);

  return (
    <FlowContext.Provider
      value={{
        uninitialized,
        flowStatuses,
        flowBlocks,
        flows,
        flowIntention,
        blocks,
        blockUidBySid,
        blockIntention,
        blockFields,
        log: logger,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}
