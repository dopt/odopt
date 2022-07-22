import { createContext } from 'react';
import { Blocks, Methods } from './types';

/**
 * The context accessible through either the {@link useDopt}Hook
 * or the {@link withDopt}HOC
 */
type DoptContext = {
  blocks: Blocks;
  methods: Methods;
};

const DoptContext = createContext<DoptContext>({} as DoptContext);

export { DoptContext };
