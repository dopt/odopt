import { useContext, useCallback } from 'react';
import { DoptContext } from '@/context';

import { Block } from '@/types';

export interface Methods {
  finish: () => void;
  exit: () => void;
  start: () => void;
}

const useDopt = (identifier: string): [Block, Methods] => {
  const { blocks, methods } = useContext(DoptContext);

  if (!blocks[identifier]) {
    methods.get(identifier);
  }

  const finish = useCallback(() => methods.finish(identifier), [identifier]);
  const exit = useCallback(() => methods.exit(identifier), [identifier]);
  const start = useCallback(() => methods.start(identifier), [identifier]);

  return [blocks[identifier] || false, { finish, exit, start }];
};

export { useDopt };
