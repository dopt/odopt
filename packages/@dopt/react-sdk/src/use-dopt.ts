import { useContext, useCallback } from 'react';
import { DoptContext } from '@/context';

import { Block } from '@/types';

export interface Methods {
  start: () => void;
  finish: () => void;
  stop: () => void;
  exit: () => void;
}

const useDopt = (identifier: string): [Block, Methods] => {
  const { blocks, methods } = useContext(DoptContext);

  if (!blocks[identifier]) {
    methods.get(identifier);
  }

  const start = useCallback(() => methods.start(identifier), [identifier]);
  const finish = useCallback(() => methods.finish(identifier), [identifier]);
  const stop = useCallback(() => methods.stop(identifier), [identifier]);
  const exit = useCallback(() => methods.exit(identifier), [identifier]);

  return [
    blocks[identifier] || { active: false },
    { start, finish, stop, exit },
  ];
};

export { useDopt };
