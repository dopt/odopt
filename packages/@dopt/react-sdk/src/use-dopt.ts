import { useContext, useCallback } from 'react';
import { DoptContext } from '@/context';

import { Block } from '@/types';

export interface Methods {
  done: () => void;
  exit: () => void;
}

const useDopt = (identifier: string): [Block, Methods] => {
  const { blocks, methods } = useContext(DoptContext);

  if (!blocks[identifier]) {
    methods.get(identifier);
  }

  const done = useCallback(() => methods.done(identifier), [identifier]);
  const exit = useCallback(() => methods.exit(identifier), [identifier]);

  return [blocks[identifier] || false, { done, exit }];
};

export { useDopt };
