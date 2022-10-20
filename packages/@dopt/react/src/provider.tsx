import { useMemo, useState, useEffect } from 'react';
import { DoptContext } from './context';

import { ProviderConfig, Blocks, Intentions } from './types';

import { blocksApi } from './client';

/**
 * A React context provider for accessing block state.
 *
 * @see {@link BaseDoptProvider}
 *
 * @alpha
 */

export function DoptProvider(props: ProviderConfig) {
  const { userId, apiKey, flowVersions, children } = props;
  const [loading, setLoading] = useState<boolean>(true);

  const [blocks, setBlocks] = useState<Blocks>({});
  const [versionByFlowId, setVersionByFlowId] =
    useState<Record<string, number>>();

  const { fetchBlock, fetchBlockIdentifiersForFlowVersion, intent } = useMemo(
    () => blocksApi(apiKey, userId),
    [userId, apiKey]
  );

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
          throw new Error(`
            The following error: "${error}" occurred while fetching blocks for the 
            flow versions specified: \`${JSON.stringify(flowVersions)}\`
          `);
        });
    })();
  }, [JSON.stringify(flowVersions)]);

  /*
   * Update the initial loading state if
   * the blocks have been correctly fetched.
   */
  useEffect(() => {
    if (versionByFlowId) {
      setLoading(false);
    }
  }, [versionByFlowId]);

  const updateBlockState = (updated: Blocks) =>
    setBlocks((prevBlocks) => ({
      ...prevBlocks,
      ...updated,
    }));

  const intentions: Intentions = useMemo(() => {
    /*
     * The loading state is a function of whether versionByFlowId
     * exists, so in theory the `||` isn't necessary.
     */
    if (loading || !versionByFlowId) {
      return {
        get: () => {},
        start: () => {},
        complete: () => {},
        stop: () => {},
        exit: () => {},
      };
    }

    return {
      get: (identifier) =>
        fetchBlock(identifier, versionByFlowId[identifier]).then(
          updateBlockState
        ),
      start: (identifier) =>
        intent
          .start(identifier, versionByFlowId[identifier])
          .then(updateBlockState),
      complete: (identifier) =>
        intent
          .complete(identifier, versionByFlowId[identifier])
          .then(updateBlockState),
      stop: (identifier) =>
        intent
          .stop(identifier, versionByFlowId[identifier])
          .then(updateBlockState),
      exit: (identifier) =>
        intent
          .exit(identifier, versionByFlowId[identifier])
          .then(updateBlockState),
    };
  }, [versionByFlowId, loading, intent]);

  return (
    <DoptContext.Provider
      value={{
        loading,
        blocks,
        intentions,
      }}
    >
      {children}
    </DoptContext.Provider>
  );
}
