import { useCallback, useEffect, useMemo, useState } from 'react';

import { Block, Field, Flow, ModelTypeConst } from '@dopt/block-types';

import { blocksApi, setupSocket } from '@dopt/javascript-common';
import { Logger } from '@dopt/logger';

import { DoptContext } from './context';
import {
  BlockIntentHandler,
  Blocks,
  FlowIntentHandler,
  Flows,
  FlowStatus,
  ProviderConfig,
} from './types';
import { PKG_NAME, PKG_VERSION, URL_PREFIX } from './utils';

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
    Map<Flow['sid'], Block['uid'][]>
  >(new Map());

  const [blocks, setBlocks] = useState<Blocks>({});
  const [blockFields, setBlockFields] = useState<
    Map<Block['uid'], Map<Field['sid'], Field>>
  >(new Map());
  const [blockUidBySid, setBlockSidMap] = useState<Map<string, string>>(
    new Map<string, string>()
  );

  const [fetching, setFetching] = useState<boolean>(true);
  const [socketReady, setSocketReady] = useState<boolean>(false);

  const [flowStatuses, setFlowStatuses] = useState<
    Record<Flow['sid'], FlowStatus>
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

  /*
   * Instantiate the socket, used to connect to the Blocks Service
   *
   */
  const socket = useMemo(() => {
    return setupSocket({ apiKey, userId, log, urlPrefix: URL_PREFIX, groupId });
  }, [apiKey, userId, groupId]);

  useEffect(() => {
    // Avoid any fetching until the user is defined
    if (!userId) {
      return;
    }

    /*
     * Fetch all Flows based on the **in parallel**
     * provided (Flow['uid'], Flow['version'])
     * tuples (via the `flowVersions` props)
     */
    Promise.all(
      Object.entries(flowVersions).map(([uid, version]) =>
        getFlow({ uid, version })
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

            if (block.type === ModelTypeConst) {
              _blockFields.set(
                block.uid,
                block.fields.reduce((map, field) => {
                  return map.set(field.sid, field);
                }, new Map<Field['sid'], Field>())
              );
            }
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
    (updated: Record<Block['uid'], Block>) =>
      setBlocks((prevBlocks) => ({
        ...prevBlocks,
        ...updated,
      })),
    []
  );

  const updateFlowState = useCallback((flow: Flow) => {
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
    (updatedFlow: Flow) => {
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
    if (!socket) {
      return;
    }
    socket.on('ready', () => {
      setSocketReady(true);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    if (!socketReady) {
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

    Object.values(flows).forEach(({ uid, version }) => {
      socket.emit('watch:flow', uid, version);
      socket.on(`${uid}_${version}`, updateFlowState);
    });
  }, [
    JSON.stringify(Object.keys(blocks).sort()),
    JSON.stringify(Object.keys(flows).sort()),
    socket,
    socketReady,
  ]);

  useEffect(() => {
    if (!fetching && socketReady) {
      setFlowStatuses(
        Object.values(flows).reduce((statuses, flow) => {
          let pending = false;

          if (!flow.state.started) {
            /*
             * Start the Flow if it hasn't been started
             */
            pending = true;

            flowIntent({
              uid: flow.uid,
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
        }, {} as Record<Flow['sid'], FlowStatus>)
      );
    }
  }, [socketReady, fetching]);

  const blockIntention: BlockIntentHandler = useMemo(() => {
    if (fetching) {
      return {
        complete: () => {},
        prev: () => {},
        next: () => {},
        goTo: () => {},
      };
    }

    return {
      complete: (uid) => {
        if (blocks[uid]) {
          if (optimisticUpdates && blocks[uid].type === ModelTypeConst) {
            updateBlockState({
              [uid]: Object.assign(blocks[uid], {
                state: {
                  active: false,
                  completed: true,
                },
              }),
            });
          }

          blockIntent({
            uid,
            version: blocks[uid].version,
            intent: 'complete',
          });
        }
      },
      next: (uid) => {
        if (blocks[uid]) {
          blockIntent({
            uid,
            version: blocks[uid].version,
            intent: 'next',
          });
        }
      },
      prev: (uid) => {
        if (blocks[uid]) {
          blockIntent({
            uid,
            version: blocks[uid].version,
            intent: 'prev',
          });
        }
      },
      goTo: (uid, goToUid) => {
        if (blocks[uid]) {
          blockIntent({
            uid,
            version: blocks[uid].version,
            intent: 'goTo',
            goToUid,
          });
        }
      },
    };
  }, [fetching, blockIntent, blocks]);

  const flowIntention: FlowIntentHandler = useMemo(() => {
    if (fetching) {
      return {
        start: () => {},
        reset: () => {},
        complete: () => {},
        exit: () => {},
      };
    }

    return {
      start: (uid, version) => {
        flowIntent({ uid, version, intent: 'start' });
      },
      reset: (uid, version) => {
        flowIntent({ uid, version, intent: 'reset' });
      },
      complete: (uid, version) => {
        flowIntent({ uid, version, intent: 'complete' });
      },
      exit: (uid, version) => {
        flowIntent({ uid, version, intent: 'exit' });
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
