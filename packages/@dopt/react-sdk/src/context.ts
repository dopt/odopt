import React from 'react';
import { Blocks, Methods } from '@/types';

type DoptContext = {
  blocks: Blocks;
  methods: Methods;
};

const DoptContext = React.createContext<DoptContext>({} as DoptContext);

export { DoptContext };
