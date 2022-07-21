import { useMemo, useState } from 'react';
import { DoptContext } from './context';

import { ProviderConfig, Blocks, Methods } from './types';

import { createIntentApi } from './client';

export function DoptProvider(props: ProviderConfig) {
  const { userId, apiKey, children } = props;

  const [blocks, setBlocks] = useState<Blocks>({});

  const { complete, exit, start, stop, get } = useMemo(
    () => createIntentApi(userId, apiKey),
    [userId, apiKey]
  );

  const updateBlockState = (updated: Blocks) =>
    setBlocks((prevBlocks) => ({
      ...prevBlocks,
      ...updated,
    }));

  const methods: Methods = useMemo(
    () => ({
      get: (identifier) => get(identifier).then(updateBlockState),
      start: (identifier) => start(identifier).then(updateBlockState),
      complete: (identifier) => complete(identifier).then(updateBlockState),
      stop: (identifier) => stop(identifier).then(updateBlockState),
      exit: (identifier) => exit(identifier).then(updateBlockState),
    }),
    [complete, exit, start, stop, get]
  );

  return (
    <DoptContext.Provider
      value={{
        methods,
        blocks,
      }}
    >
      {children}
    </DoptContext.Provider>
  );
}
