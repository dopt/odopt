import { useMemo, useState, useEffect, useCallback } from 'react';

import { Logger } from '@dopt/logger';
import {
  blocksApi,
  Blocks,
  Intentions,
  setupSocket,
} from '@dopt/javascript-common';

import { DoptContext } from './context';
import { ProviderConfig } from './types';
import { PKG_NAME, PKG_VERSION, URL_PREFIX } from './utils';

/**
 * A React context provider for accessing block state.
 *
 * @see {@link BaseDoptProvider}
 *
 * @alpha
 */

export function DoptProvider(props: ProviderConfig) {
  const { userId, apiKey, flowVersions, children, logLevel } = props;

  const log = new Logger({ logLevel, prefix: ` ${PKG_NAME} ` });

  const [loading, setLoading] = useState<boolean>(true);
  const [blocks, setBlocks] = useState<Blocks>({});
  const [blockVersions, setBlockVersions] = useState<Record<string, number>>();

  const [socketReady, setSocketReady] = useState<boolean>(false);

  useEffect(() => {
    if (userId === undefined) {
      log.info(
        'The `userId` prop is undefined. The SDK will partially initialize, returning defaults for any requested blocks until the `userId` prop becomes defined.'
      );
    }
  }, [userId]);

  useEffect(() => {
    log.debug('<DoptProvider /> mounted');
    return () => log.debug('<DoptProvider /> unmounted');
  }, []);

  /*
   * Create the Blocks API Client
   */
  const { fetchBlock, fetchBlockIdentifiersForFlowVersion, intent } = useMemo(
    () =>
      blocksApi(apiKey, userId, log, {
        urlPrefix: URL_PREFIX,
        packageVersion: PKG_VERSION,
        packageName: PKG_NAME,
      }),
    [userId, apiKey]
  );

  /*
   * Instantiate the socket, used to connect to the Blocks Service
   *
   */
  const socket = useMemo(() => {
    return setupSocket(apiKey, userId, log, URL_PREFIX);
  }, [apiKey, userId]);

  /*
   * Fetch the block identifiers for flows passed in
   * via the `flowVersions` prop. This allows us to
   * construct URLs correcltly by connecting the blocks
   * to a specific flow version.
   */
  useEffect(() => {
    (async function () {
      const flowIdVersionTuples = Object.entries(flowVersions);
      Promise.all(
        flowIdVersionTuples.map(([flowId, flowVersion]) =>
          fetchBlockIdentifiersForFlowVersion(flowId, flowVersion)
        )
      )
        .then((responses) => {
          setBlockVersions({
            ...Object.fromEntries(
              responses
                .map((response, i) =>
                  response.map(({ uuid }) => [uuid, flowIdVersionTuples[i][1]])
                )
                .flat()
            ),
          });
        })
        .catch((error) => {
          log.error(`
            An error occurred while fetching blocks for the  
            flow versions specified: \`${JSON.stringify(flowVersions)}\`
          `);
        });
    })();
  }, [JSON.stringify(flowVersions)]);

  /*
   * Fetch the Blocks Versions for the specified flows.
   */
  useEffect(() => {
    async function fetchAllBlock(
      blockVersions: Record<string, number>
    ): Promise<void> {
      for (const identifier in blockVersions) {
        await fetchBlock(identifier, blockVersions[identifier]).then((block) =>
          updateBlockState({ [identifier]: block })
        );
      }
      setLoading(false);
    }
    if (blockVersions) {
      fetchAllBlock(blockVersions);
    }
  }, [userId, blockVersions, fetchBlock]);

  const updateBlockState = useCallback(
    (updated: Blocks) =>
      setBlocks((prevBlocks) => ({
        ...prevBlocks,
        ...updated,
      })),
    []
  );

  const socketCallback = useCallback(
    (updatedBlocks: any) => {
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

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on('ready', () => {
      setSocketReady(true);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket || !socketReady || !blockVersions) {
      return;
    }

    /*
     * If we execute the binding below more than once
     * we are in trouble (e.g. leaking memory, unexpected behavior)
     */
    socket?.on('blocks', socketCallback);

    // Log a warning if we end up in the situation above
    if (socket?.listeners('blocks').length > 1) {
      log.warn('Socket listeners to `blocks` are growing unexpectly.');
    }

    for (let bid in blockVersions) {
      socket?.emit('watch', bid, blockVersions[bid]);

      socket?.on(`${bid}_${blockVersions[bid]}`, (block) => {
        updateBlockState(block);
      });

      if (socket?.listeners(`${bid}_${blockVersions[bid]}`).length > 1) {
        log.error(
          `Socket listeners to \`${bid}_${blockVersions[bid]}\` are growing unexpectly.`
        );
      }
    }
  }, [JSON.stringify(blockVersions), socket, socketReady]);

  const intentions: Intentions = useMemo(() => {
    /*
     * The loading state is a function of whether blockVersions
     * exists, so in theory the `||` isn't necessary.
     */
    if (loading || !blockVersions) {
      return {
        start: () => {},
        complete: () => {},
        stop: () => {},
        exit: () => {},
      };
    }
    return {
      start: (identifier) =>
        intent.start(identifier, blockVersions[identifier]),
      complete: (identifier) =>
        intent.complete(identifier, blockVersions[identifier]),
      stop: (identifier) => intent.stop(identifier, blockVersions[identifier]),
      exit: (identifier) => intent.exit(identifier, blockVersions[identifier]),
    };
  }, [blockVersions, loading, intent]);

  return (
    <DoptContext.Provider
      value={{
        loading,
        blocks,
        intentions,
        log,
      }}
    >
      {children}
    </DoptContext.Provider>
  );
}
