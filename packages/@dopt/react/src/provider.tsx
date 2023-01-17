import { useMemo, useState, useEffect, useCallback } from 'react';

import type { Block, Flow } from '@dopt/block-types';

import { Mercator } from '@dopt/mercator';

import { Logger } from '@dopt/logger';
import {
  Blocks,
  Flows,
  BlockIntention,
  blocksApi,
  setupSocket,
  FlowIntention,
} from '@dopt/javascript-common';

import { DoptContext } from './context';
import { ProviderConfig } from './types';
import { PKG_NAME, PKG_VERSION, URL_PREFIX } from './utils';

/**
 * A React context provider for accessing block state.
 */
export function ProdDoptProvider(props: ProviderConfig) {
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

  const [loading, setLoading] = useState<boolean>(true);
  const [blocks, setBlocks] = useState<Blocks>({});
  const [flows, setFlows] = useState<Flows>(new Mercator());
  const [flowBlocks, setFlowBlocks] = useState<
    Mercator<[Flow['sid'], Flow['version']], Block['uid'][]>
  >(new Mercator());
  const [socketReady, setSocketReady] = useState<boolean>(false);

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
          optimisticUpdates,
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
    return setupSocket(apiKey, userId, log, URL_PREFIX);
  }, [apiKey, userId, groupId]);

  useEffect(() => {
    // Avoid any fetching until the user is defined
    if (!userId) {
      return;
    }

    (async function () {
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
          flows.forEach((flow) => {
            if (!flow.state.started) {
              flowIntent({
                uid: flow.uid,
                version: flow.version,
                intent: 'start',
              });
            }
            /*
             * Update the Flows in React state
             */
            setFlows((prev) => {
              return new Mercator(
                Array.from(prev.set([flow.sid, flow.version], flow).entries())
              );
            });

            /*
             * Extract the Flow's associated Blocks
             */
            const blocks = flow.blocks?.reduce<Record<Block['uid'], Block>>(
              (memo, block) => {
                memo[block.uid] = block;
                return memo;
              },
              {}
            );

            /*
             * Create a mapping from a flow to its blocks
             */
            setFlowBlocks((prev) => {
              return new Mercator(
                Array.from(
                  prev.set(
                    [flow.sid, flow.version],
                    flow.blocks?.map(({ uid }) => uid) || []
                  )
                )
              );
            });

            /*
             * Update the Block in React state
             */
            setBlocks((prevBlocks) => ({
              ...prevBlocks,
              ...blocks,
            }));
          });

          log.info('Flows & Blocks fetched successfully');

          /*
           * If we've made it here we can safely progress i.e. the
           * SDK has initialized correctly.
           */
          setLoading(false);
        })
        .catch((error) => {
          log.error(`
            An error occurred while fetching blocks for the  
            flow versions specified: \`${JSON.stringify(flowVersions)}\`
          `);
        });
    })();
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
    setFlows((preFlows) => {
      return new Mercator(
        Array.from(preFlows.set([flow.sid, flow.version], flow).entries())
      );
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

    if (
      !(Object.keys(blocks).length > 0) ||
      !(Array.from(flows.keys()).length > 0)
    ) {
      return;
    }

    socket.on('blocks', blocksSocketCallback);
    socket.on('flow', flowSocketCallback);

    // Log a warning if we end up in the situation above
    if (socket.listeners('blocks').length > 1) {
      log.warn('Socket listeners to `blocks` are growing unexpectly.');
    }

    if (socket.listeners('flow').length > 1) {
      log.warn('Socket listeners to `flow` are growing unexpectly.');
    }

    for (let uid in blocks) {
      const version = blocks[uid].version;

      socket.emit('watch:block', uid, version);

      socket.on(`${uid}_${version}`, (block) => {
        updateBlockState(block);
      });

      if (socket.listeners(`${uid}_${version}`).length > 1) {
        log.error(
          `Socket listeners to \`${uid}_${version}\` are growing unexpectly.`
        );
      }
    }

    flows.forEach(({ uid, version }) => {
      socket.emit('watch:flow', uid, version);
      socket.on(`${uid}_${version}`, updateFlowState);
    });
  }, [
    JSON.stringify(Object.keys(blocks).sort()),
    JSON.stringify(Array.from(flows.keys())),
    socket,
    socketReady,
  ]);

  const blockIntention: BlockIntention = useMemo(() => {
    if (loading) {
      return {
        complete: async () => {},
        prev: async () => {},
        next: async () => {},
        goTo: async () => {},
      };
    }

    return {
      complete: (uid) => {
        optimisticUpdates &&
          updateBlockState({
            [uid]: Object.assign(blocks[uid], {
              state: {
                active: false,
                completed: true,
              },
            }),
          });
        return blockIntent({
          uid,
          version: blocks[uid].version,
          intent: 'complete',
        });
      },
      next: (uid) =>
        blockIntent({ uid, version: blocks[uid].version, intent: 'next' }),
      prev: (uid) =>
        blockIntent({ uid, version: blocks[uid].version, intent: 'prev' }),
      goTo: (uid) =>
        blockIntent({ uid, version: blocks[uid].version, intent: 'goTo' }),
    };
  }, [loading, blockIntent, blocks]);

  const flowIntention: FlowIntention = useMemo(() => {
    if (loading) {
      return {
        start: async () => {},
        reset: async () => {},
        complete: async () => {},
        exit: async () => {},
      };
    }

    return {
      start: (uid, version) => flowIntent({ uid, version, intent: 'start' }),
      reset: (uid, version) => flowIntent({ uid, version, intent: 'reset' }),
      complete: (uid, version) =>
        flowIntent({ uid, version, intent: 'complete' }),
      exit: (uid, version) => flowIntent({ uid, version, intent: 'exit' }),
    };
  }, [loading, flows]);

  return (
    <DoptContext.Provider
      value={{
        loading,
        flowBlocks,
        flows,
        flowIntention,
        blocks,
        blockIntention,
        log,
      }}
    >
      {children}
    </DoptContext.Provider>
  );
}
