import { createContext } from 'react';
import { Blocks, Intentions } from './types';

/**
 * The context accessible either through the {@link useDopt} hook
 * or the {@link withDopt} HOC
 */
type DoptContext = {
  loading: boolean;
  blocks: Blocks;
  intentions: Intentions;
};

const DoptContext = createContext<DoptContext>({} as DoptContext);

export { DoptContext };
