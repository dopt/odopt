import { Logger } from '@dopt/logger';
import { createContext } from 'react';
import { Blocks, Intentions } from './types';

/**
 * The context accessible either through the {@link useBlock} hook
 * or the {@link withBlock} HOC
 */
type DoptContext = {
  loading: boolean;
  blocks: Blocks;
  intentions: Intentions;
  log: Logger;
};

const DoptContext = createContext<DoptContext>({} as DoptContext);

export { DoptContext };
