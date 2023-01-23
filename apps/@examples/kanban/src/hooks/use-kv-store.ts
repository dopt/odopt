import useLocalStorageState from 'use-local-storage-state';

type Key = string;
type Options = Parameters<typeof useLocalStorageState>[1];

export function useKeyValueStore<T>(key: Key, options?: Options) {
  return useLocalStorageState<T>(key, options);
}
