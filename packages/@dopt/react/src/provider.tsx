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
import { SurfaceProvider } from './surface-provider';

type Socket = ReturnType<typeof setupSocket>;

/**
 * The time in milliseconds that the page should wait
 * after its visibility changes before disconnecting
 * the socket.
 *
 * The value is fixed at 600,000 millseconds (10 minutes).
 */
const SOCKET_DISCONNECT_TIMEOUT = 600000;

/**
 * A boolean which checks whether the package
 * is being loaded in a browser environment.
 */
const IS_BROWSER =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

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
    surfaces = [],
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

  const [socketWaiting, setSocketWaiting] = useState<boolean>(false);
  const socket = useRef<Socket | null>(null);

  const [resolvedFlowVersions, setResolvedFlowVersions] = useState<Record<
    APIFlow['sid'],
    APIFlow['version']
  > | null>(null);
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

  const fetchFlows = useCallback(
    (flowVersions: ProviderConfig['flowVersions']) => {
      return Promise.all(
        Object.entries(flowVersions).map(([sid, version]) =>
          getFlow({ sid, version })
        )
      );
    },
    [getFlow]
  );

  useEffect(() => {
    // Avoid any fetching until the user is defined
    if (!userId) {
      return;
    }

    /**
     * Begin the fetching process.
     */
    setResolvedFlowVersions(null);

    /*
     * Fetch all Flows based on the Record<Flow['sid'], Flow['version']>
     * entries passed in as props (via `flowVersions`)
     */
    fetchFlows(stableFlowVersions)
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
        setFlowBlocks(_flowBlocks);

        setBlocks(_blocks);
        setBlockFields(_blockFields);
        setBlockSidMap(_blockUidBySid);

        setFlowStatuses(_flowStatuses);
        setResolvedFlowVersions(_resolvedFlowVersions);

        logger.current.info('Flows and blocks fetched successfully');
      })
      .catch((_) => {
        logger.current.error(`
            An error occurred while fetching blocks for the
            flow versions specified: \`${JSON.stringify(stableFlowVersions)}\`
          `);
      });
  }, [userId, stableFlowVersions, fetchFlows]);

  useEffect(() => {
    socket.current = setupSocket({
      apiKey,
      userId,
      groupId,
      log: logger.current,
      urlPrefix: SOCKET_PREFIX,
    });

    if (!socket.current) {
      return () => {
        /* no-op */
      };
    }

    socket.current.on('blocks', (updatedBlocks: Blocks) => {
      logger.current.debug(
        `The following blocks were updated and pushed from the server.\n${Object.values(
          updatedBlocks
        )
          .map((block) => JSON.stringify(block, null, 2))
          .join('\n')}`
      );

      setBlocks((previousBlocks) => ({
        ...previousBlocks,
        ...updatedBlocks,
      }));
    });

    socket.current.on('flow', (updatedFlow: APIFlow) => {
      logger.current.debug(
        `The following flow was updated and pushed from the server.\n${JSON.stringify(
          updatedFlow,
          null,
          2
        )}`
      );

      setFlows((previousFlows) => {
        return {
          ...previousFlows,
          [updatedFlow.sid]: updatedFlow,
        };
      });
    });

    socket.current.on('ready', () => {
      logger.current.debug(
        `Socket is ready for user "${userId}" and group "${groupId}"`
      );

      setSocketWaiting(true);
    });

    return () => {
      logger.current.debug(
        `Closing socket for user "${userId}" and group "${groupId}"`
      );
      socket.current?.close();
      socket.current = null;
    };
  }, [apiKey, userId, groupId]);

  useEffect(() => {
    if (!IS_BROWSER || !socket.current || !resolvedFlowVersions) {
      return () => {
        /* no-op */
      };
    }

    /**
     * Closed-over variables which track
     * whether other disconnect or reconnect attempts
     * are in-progress.
     */
    let disconnectTimeoutId: any = null;
    let socketReconnecting = false;

    const onVisibilityChange = () => {
      clearTimeout(disconnectTimeoutId);
      disconnectTimeoutId = null;

      if (document.visibilityState === 'visible') {
        if (socket.current?.disconnected && !socketReconnecting) {
          socketReconnecting = true;

          fetchFlows(resolvedFlowVersions)
            .then((flows) => {
              const _flows: Flows = {};
              const _flowBlocks: typeof flowBlocks = new Map();

              const _blocks: Blocks = {};

              flows.forEach((flow) => {
                _flows[flow.sid] = flow;
                _flowBlocks.set(
                  flow.sid,
                  flow.blocks?.map(({ uid }) => uid) || []
                );

                flow.blocks?.forEach((block) => {
                  _blocks[block.uid] = block;
                });
              });

              /**
               * Note, we don't set other states like blockUidBySid or blockFields.
               * Block `sid` values and fields are editable, so we don't want to
               * overwrite those and break callers.
               *
               * We don't set flowStatuses because all flows have already been
               * initialized, we're just re-examining whether any changes have
               * occurred.
               *
               * flows, flowBlocks, and blocks are all UID based with frozen
               * topologies, so these updates on reconnection are much safer.
               */
              setFlows(_flows);
              setFlowBlocks(_flowBlocks);
              setBlocks(_blocks);

              logger.current.info(
                'Flows and blocks updated successfully when page foregrounded'
              );

              /**
               * We connect after all flows are fetched to avoid
               * race conditions from the side effects of `getFlow`.
               */
              socket.current?.connect();
            })
            .catch((_) => {
              logger.current.error(`
                  An error occurred while fetching blocks for the
                  flow versions specified: \`${JSON.stringify(
                    resolvedFlowVersions
                  )}\`
                `);
            })
            .finally(() => {
              socketReconnecting = false;
            });
        }
      } else {
        disconnectTimeoutId = setTimeout(() => {
          disconnectTimeoutId = null;

          if (socket.current?.connected) {
            socket.current?.disconnect();
            socketReconnecting = false;
            logger.current.info(
              'Socket disconnected because page backgrounded'
            );
          }
        }, SOCKET_DISCONNECT_TIMEOUT);
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearTimeout(disconnectTimeoutId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [resolvedFlowVersions, fetchFlows]);

  useEffect(() => {
    if (!resolvedFlowVersions || !socketWaiting) {
      return;
    }

    Object.entries(resolvedFlowVersions).forEach(([sid, version]) => {
      if (version !== -1) {
        socket.current?.emit('watch:flow', sid, version);
      }
    });

    setSocketWaiting(false);
  }, [socketWaiting, resolvedFlowVersions]);

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
  }, [fetching, blockIntent, blocks, optimisticUpdates]);

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
      {surfaces.length > 0 ? (
        <SurfaceProvider
          apiKey={apiKey}
          groupId={groupId}
          logger={logger}
          socket={socket}
          surfaces={surfaces}
          userId={userId}
        >
          {children}
        </SurfaceProvider>
      ) : (
        children
      )}
    </DoptContext.Provider>
  );
}
