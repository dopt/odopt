import { useCallback, useEffect, useMemo, useState } from 'react';

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

  const log = new Logger({ logLevel, prefix: ` ${PKG_NAME} ` });

  const [flows, setFlows] = useState<Flows>({});
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

  const [fetching, setFetching] = useState<boolean>(true);
  const [socket, setSocket] = useState<ReturnType<typeof setupSocket>>();

  const [flowStatuses, setFlowStatuses] = useState<
    Record<APIFlow['sid'], FlowStatus>
  >({});

  useEffect(() => {
    if (userId === undefined) {
      log.info(
        'The `userId` prop is undefined. The SDK will partially initialize, returning defaults for any requested blocks until the `userId` prop becomes defined.'
      );
    }
  }, [userId]);

  useEffect(() => {
    if (groupId === undefined) {
      log.info(
        'The `groupId` prop is undefined. The SDK wont be able to target the entry conditions and update blocks if you are actively using groups properties.'
      );
    }
  }, [groupId]);

  useEffect(() => {
    log.debug('<DoptProvider /> mounted');
    return () => log.debug('<DoptProvider /> unmounted');
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
        logger: log,
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

    /*
     * Fetch all Flows based on the **in parallel**
     * provided (Flow['sid'], Flow['version'])
     * tuples (via the `flowVersions` props)
     */
    Promise.all(
      Object.entries(flowVersions).map(([sid, version]) =>
        getFlow({ sid, version })
      )
    )
      .then((flows) => {
        const _flows: Flows = {};
        const _flowBlocks: typeof flowBlocks = new Map();

        const _blocks: Blocks = {};
        const _blockFields: typeof blockFields = new Map();
        const _blockUidBySid: typeof blockUidBySid = new Map();

        flows.forEach((flow) => {
          _flows[flow.sid] = flow;

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

        /*
         * If we've made it here we can safely progress i.e. the
         * SDK has fetched correctly.
         */
        setFetching(false);

        log.info('Flows & Blocks fetching successful');
      })
      .catch((error) => {
        log.error(`
            An error occurred while fetching blocks for the
            flow versions specified: \`${JSON.stringify(flowVersions)}\`
          `);
      });
  }, [JSON.stringify(flowVersions), userId, groupId]);

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

    setFlowStatuses((previousFlowStatuses) => {
      /*
       *  Some flow intents generate side effects (they start flows if not started),
       *  this tracks that those intents are propagated back to the client
       */
      if (previousFlowStatuses[flow.sid]?.pending) {
        return {
          ...previousFlowStatuses,
          [flow.sid]: { pending: false, failed: false },
        };
      } else {
        return previousFlowStatuses;
      }
    });
  }, []);

  const blocksSocketCallback = useCallback(
    (updatedBlocks: Blocks) => {
      log.debug(
        `The following blocks were updated and pushed from the server.\n${Object.values(
          updatedBlocks
        )
          .map((block) => JSON.stringify(block, null, 2))
          .join('\n')}`
      );
      updateBlockState(updatedBlocks);
    },
    [updateBlockState]
  );

  const flowSocketCallback = useCallback(
    (updatedFlow: APIFlow) => {
      log.debug(
        `The following flow was updated and pushed from the server.\n${JSON.stringify(
          updatedFlow,
          null,
          2
        )}`
      );
      updateFlowState(updatedFlow);
    },
    [updateFlowState]
  );

  useEffect(() => {
    const _socket = setupSocket({
      apiKey,
      userId,
      groupId,
      log,
      urlPrefix: SOCKET_PREFIX,
    });

    if (!_socket) {
      return () => {};
    }

    _socket.on('ready', () => {
      log.debug(
        `Socket is ready for user ${userId}; group ${groupId}; flows ${Object.keys(
          flowVersions
        ).join(' ')}`
      );
      setSocket(_socket);
    });

    return () => {
      log.debug(
        `Closing socket for user ${userId}; group ${groupId}; flows ${Object.keys(
          flowVersions
        ).join(' ')}`
      );
      _socket.close();
    };
  }, [apiKey, userId, groupId]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    if (!(Object.keys(blocks).length > 0) || !(Object.keys(flows).length > 0)) {
      return;
    }

    socket.on('blocks', blocksSocketCallback);
    socket.on('flow', flowSocketCallback);

    // Log a warning if we end up in the situation above
    if (socket.listeners('blocks').length > 1) {
      log.warn('Socket listeners to `blocks` are growing unexpectedly.');
    }

    if (socket.listeners('flow').length > 1) {
      log.warn('Socket listeners to `flow` are growing unexpectedly.');
    }

    for (let uid in blocks) {
      const version = blocks[uid].version;

      socket.emit('watch:block', uid, version);

      socket.on(`${uid}_${version}`, (block) => {
        updateBlockState(block);
      });

      if (socket.listeners(`${uid}_${version}`).length > 1) {
        log.error(
          `Socket listeners to \`${uid}_${version}\` are growing unexpectedly.`
        );
      }
    }

    Object.values(flows).forEach(({ sid, version }) => {
      socket.emit('watch:flow', sid, version);
      socket.on(`${sid}_${version}`, updateFlowState);
    });
  }, [
    JSON.stringify(Object.keys(blocks).sort()),
    JSON.stringify(Object.keys(flows).sort()),
    socket,
  ]);

  useEffect(() => {
    if (!fetching && socket) {
      setFlowStatuses(
        Object.values(flows).reduce((statuses, flow) => {
          let pending = false;

          if (!flow.state.started) {
            /*
             * Start the Flow if it hasn't been started
             */
            pending = true;

            flowIntent({
              sid: flow.sid,
              version: flow.version,
              intent: 'start',
            }).then(
              (intentHasSideEffects) => {
                if (!intentHasSideEffects) {
                  setFlowStatuses((previousFlowStatuses) => ({
                    ...previousFlowStatuses,
                    [flow.sid]: { pending: false, failed: false },
                  }));
                }
              },
              () => {
                setFlowStatuses((previousFlowStatuses) => ({
                  ...previousFlowStatuses,
                  [flow.sid]: { pending: false, failed: true },
                }));
              }
            );
          }

          statuses[flow.sid] = { pending, failed: false };
          return statuses;
        }, {} as Record<APIFlow['sid'], FlowStatus>)
      );
    }
  }, [socket, fetching]);

  const blockIntention: BlockTransitionHandler = useMemo(() => {
    if (fetching) {
      return () => {};
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
  }, [fetching, blockIntent, blocks]);

  const flowIntention: FlowIntentHandler = useMemo(() => {
    if (fetching) {
      return {
        start: () => {},
        reset: () => {},
        finish: () => {},
        stop: () => {},
      };
    }

    return {
      start: (sid, version) => {
        flowIntent({ sid, version, intent: 'start' });
      },
      reset: (sid, version) => {
        flowIntent({ sid, version, intent: 'reset' });
      },
      finish: (sid, version) => {
        flowIntent({ sid, version, intent: 'finish' });
      },
      stop: (sid, version) => {
        flowIntent({ sid, version, intent: 'stop' });
      },
    };
  }, [fetching, flows]);

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
        log,
      }}
    >
      {children}
    </DoptContext.Provider>
  );
}
