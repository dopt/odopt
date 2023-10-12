import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { blocksApi, setupSocket } from '@dopt/javascript-common';
import { Logger } from '@dopt/logger';

import { DoptContext } from './context';
import {
  BlockTransitionHandler,
  Blocks,
  FlowIntentHandler,
  Flows,
  FlowStatus,
  ProviderConfig,
} from './types';
import { PKG_NAME, PKG_VERSION, URL_PREFIX, SOCKET_PREFIX } from './utils';

import type {
  Block as APIBlock,
  Flow as APIFlow,
  Field as APIField,
} from '@dopt/javascript-common';

type Socket = ReturnType<typeof setupSocket>;

function flowVersionsEqual(
  previous: ProviderConfig['flowVersions'],
  current: ProviderConfig['flowVersions']
): boolean {
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

/**
 * A React context provider for accessing block state.
 *
 * Using {@link ProviderConfig}
 * @example
 * ```tsx
 *  import { DoptProvider } from '@dopt/react';
 *  import Application from './application';
 *
 *  export function Index() {
 *    return (
 *      <DoptProvider
 *        userId={userId}
 *        apiKey={blockAPIKey}
 *        flowVersions={{
 *          onboardingFlow: 3,
 *          upgradeFlow: 1
 *        }}
 *      >
 *        <Application />
 *      </DoptProvider>
 *    );
 *  }
 * ```
 *
 */
export function DoptProvider(props: ProviderConfig) {
  const {
    userId,
    groupId,
    apiKey,
    flowVersions,
    children,
    logLevel,
    optimisticUpdates = true,
  } = props;

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

  const [socket, setSocket] = useState<Socket>();
  const [socketDirty, setSocketDirty] = useState<boolean>(false);

  const [resolvedFlowVersions, setResolvedFlowVersions] =
    useState<Record<APIFlow['sid'], APIFlow['version']>>();
  const fetching = resolvedFlowVersions === undefined;

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

  /**
   * Create a ref around Logger so that
   * we can use it within hooks.
   */
  const logger = useRef<Logger>(
    new Logger({ logLevel, prefix: ` ${PKG_NAME} ` })
  );
  useEffect(() => {
    logger.current = new Logger({ logLevel, prefix: ` ${PKG_NAME} ` });
  }, [logLevel]);

  useEffect(() => {
    if (userId === undefined) {
      logger.current.info(
        'The `userId` prop is undefined. The SDK will partially initialize, returning defaults for any requested blocks until the `userId` prop becomes defined.'
      );
    }
  }, [userId]);

  useEffect(() => {
    if (groupId === undefined) {
      logger.current.info(
        'The `groupId` prop is undefined. The SDK wont be able to target the entry conditions and update blocks if you are actively using groups properties.'
      );
    }
  }, [groupId]);

  useEffect(() => {
    logger.current.debug('<DoptProvider /> mounted');
    return () => logger.current.debug('<DoptProvider /> unmounted');
  }, []);

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
    [userId, apiKey, groupId]
  );

  useEffect(() => {
    // Avoid any fetching until the user is defined
    if (!userId) {
      return;
    }

    /**
     * Begin the fetching process.
     */
    setResolvedFlowVersions(undefined);

    /*
     * Fetch all Flows based on the **in parallel**
     * provided (Flow['sid'], Flow['version'])
     * tuples (via the `flowVersions` props)
     */
    Promise.all(
      Object.entries(stableFlowVersions).map(([sid, version]) =>
        getFlow({ sid, version })
      )
    )
      .then((flows) => {
        const _flows: Flows = {};
        const _flowBlocks: typeof flowBlocks = new Map();
        const _flowStatuses: Record<APIFlow['sid'], FlowStatus> = {};
        const _resolvedFlowVersions: Record<
          APIFlow['sid'],
          APIFlow['version']
        > = {};

        const _blocks: Blocks = {};
        const _blockFields: typeof blockFields = new Map();
        const _blockUidBySid: typeof blockUidBySid = new Map();

        flows.forEach((flow) => {
          _flows[flow.sid] = flow;
          _flowStatuses[flow.sid] = {
            pending: false,
            failed: flow.version === -1,
          };
          _resolvedFlowVersions[flow.sid] = flow.version;

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
        setFlowStatuses(_flowStatuses);
        setResolvedFlowVersions(_resolvedFlowVersions);
        setFlowBlocks(_flowBlocks);

        setBlocks(_blocks);
        setBlockFields(_blockFields);
        setBlockSidMap(_blockUidBySid);

        logger.current.info('Flows and blocks fetched successfully');
      })
      .catch((_) => {
        logger.current.error(`
            An error occurred while fetching blocks for the
            flow versions specified: \`${JSON.stringify(stableFlowVersions)}\`
          `);
      });
  }, [userId, groupId, getFlow, stableFlowVersions]);

  const updateBlockState = useCallback(
    (updated: Record<APIBlock['uid'], APIBlock>) =>
      setBlocks((prevBlocks) => ({
        ...prevBlocks,
        ...updated,
      })),
    []
  );

  const updateFlowState = useCallback((flow: APIFlow) => {
    setFlows((prev) => {
      return {
        ...prev,
        [flow.sid]: flow,
      };
    });
  }, []);

  useEffect(() => {
    const _socket = setupSocket({
      apiKey,
      userId,
      groupId,
      log: logger.current,
      urlPrefix: SOCKET_PREFIX,
    });

    if (!_socket) {
      return () => {
        /* no-op */
      };
    }

    _socket.on('ready', () => {
      logger.current.debug(
        `Socket is ready for user "${userId}" and group "${groupId}"`
      );
      setSocket(_socket);
      setSocketDirty(true);
    });

    return () => {
      logger.current.debug(
        `Closing socket for user "${userId}" and group "${groupId}"`
      );
      _socket.close();
    };
  }, [apiKey, userId, groupId]);

  useEffect(() => {
    if (!socket) {
      return () => {
        /* no-op */
      };
    }

    const blocksHandler = (updatedBlocks: Blocks) => {
      logger.current.debug(
        `The following blocks were updated and pushed from the server.\n${Object.values(
          updatedBlocks
        )
          .map((block) => JSON.stringify(block, null, 2))
          .join('\n')}`
      );
      updateBlockState(updatedBlocks);
    };

    const flowHandler = (updatedFlow: APIFlow) => {
      logger.current.debug(
        `The following flow was updated and pushed from the server.\n${JSON.stringify(
          updatedFlow,
          null,
          2
        )}`
      );
      updateFlowState(updatedFlow);
    };

    socket.on('blocks', blocksHandler);
    socket.on('flow', flowHandler);

    return () => {
      socket.off('blocks', blocksHandler);
      socket.off('flows', flowHandler);
    };
  }, [socket, updateBlockState, updateFlowState]);

  useEffect(() => {
    if (!socket || !resolvedFlowVersions || !socketDirty) {
      return;
    }

    Object.entries(resolvedFlowVersions).forEach(([sid, version]) => {
      if (version !== -1) {
        socket.emit('watch:flow', sid, version);
      }
    });

    setSocketDirty(false);
  }, [socket, socketDirty, resolvedFlowVersions]);

  const blockIntention: BlockTransitionHandler = useMemo(() => {
    if (fetching) {
      return () => {
        /* no-op */
      };
    }

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
          updateBlockState({
            [uid]: {
              ...block,
              state: {
                entered: true,
                exited: true,
                active: false,
              },
            },
          });
        }
      }
    };
  }, [fetching, blockIntent, blocks, optimisticUpdates, updateBlockState]);

  const flowIntention: FlowIntentHandler = useMemo(() => {
    if (fetching) {
      return {
        start: () => {
          /* no-op */
        },
        reset: () => {
          /* no-op */
        },
        finish: () => {
          /* no-op */
        },
        stop: () => {
          /* no-op */
        },
      } as FlowIntentHandler;
    }

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
  }, [fetching, flowIntent]);

  return (
    <DoptContext.Provider
      value={{
        fetching,
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
    </DoptContext.Provider>
  );
}
