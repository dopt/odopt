import { useMemo, useState, useEffect } from 'react';
import { DoptContext } from './context';
import { Logger } from '@dopt/logger';
import { ProviderConfig, Blocks, Intentions } from './types';
import { PKG_NAME } from './utils';
import { blocksApi } from './client';
import { setupSocket } from './socket';

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
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [versionByFlowId, setVersionByFlowId] =
    useState<Record<string, number>>();

  useEffect(() => {
    if (userId === undefined) {
      log.info(
        'The `userId` prop is undefined. The SDK will partially initialize, returning defaults for any requested blocks until the `userId` prop becomes defined.'
      );
    }
  }, [userId]);

  const { fetchBlock, fetchBlockIdentifiersForFlowVersion, intent } = useMemo(
    () => blocksApi(apiKey, userId, log),
    [userId, apiKey]
  );
  const socket = useMemo(() => {
    return setupSocket(apiKey, userId, log, setIsConnected);
  }, [apiKey, userId]);

  useEffect(() => {
    async function fetchAllBlock(
      versionByFlowId: Record<string, number>
    ): Promise<void> {
      for (const identifier in versionByFlowId) {
        await fetchBlock(identifier, versionByFlowId[identifier]).then(
          updateBlockState
        );
      }
      setLoading(false);
    }
    if (versionByFlowId) {
      fetchAllBlock(versionByFlowId);
    }
  }, [userId, versionByFlowId, fetchBlock]);

  useEffect(() => {
    log.debug('<DoptProvider /> mounted');
    return () => log.debug('<DoptProvider /> unmounted');
  }, []);

  useEffect(() => {
    (async function () {
      const flowIdVersionTuples = Object.entries(flowVersions);
      Promise.all(
        flowIdVersionTuples.map(([flowId, flowVersion]) =>
          fetchBlockIdentifiersForFlowVersion(flowId, flowVersion)
        )
      )
        .then((responses) => {
          setVersionByFlowId({
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

  const updateBlockState = (updated: Blocks) =>
    setBlocks((prevBlocks) => ({
      ...prevBlocks,
      ...updated,
    }));

  useEffect(() => {
    if (isConnected) {
      socket?.on('blocks', (updatedBlocks) => {
        log.debug(
          `The following blocks were updated and pushed from the server.\n${Object.values(
            updatedBlocks
          )
            .map((block) => JSON.stringify(block, null, 2))
            .join('\n')}`
        );
        updateBlockState(updatedBlocks);
      });
      for (let bid in versionByFlowId) {
        socket?.emit('watch', bid, versionByFlowId[bid]);
        socket?.on(`${bid}_${versionByFlowId[bid]}`, (block) => {
          updateBlockState(block);
        });
      }
    }
  }, [JSON.stringify(versionByFlowId), isConnected]);

  const intentions: Intentions = useMemo(() => {
    /*
     * The loading state is a function of whether versionByFlowId
     * exists, so in theory the `||` isn't necessary.
     */
    if (loading || !versionByFlowId) {
      return {
        start: () => {},
        complete: () => {},
        stop: () => {},
        exit: () => {},
      };
    }
    return {
      start: (identifier) =>
        intent.start(identifier, versionByFlowId[identifier]),
      complete: (identifier) =>
        intent.complete(identifier, versionByFlowId[identifier]),
      stop: (identifier) =>
        intent.stop(identifier, versionByFlowId[identifier]),
      exit: (identifier) =>
        intent.exit(identifier, versionByFlowId[identifier]),
    };
  }, [versionByFlowId, loading, intent]);

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
