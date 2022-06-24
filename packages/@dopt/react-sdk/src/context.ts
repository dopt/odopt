import { createContext } from 'react';
import { Blocks, Methods } from '@/types';

type DoptContext = {
  blocks: Blocks;
  methods: Methods;
};

const DoptContext = createContext<DoptContext>({} as DoptContext);

export { DoptContext };
