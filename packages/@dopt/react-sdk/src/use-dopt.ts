import { useContext, useCallback } from 'react';
import { DoptContext } from './context';

import { Block } from './types';

export interface Methods {
  start: () => void;
  complete: () => void;
  stop: () => void;
  exit: () => void;
}

const useDopt = (identifier: string): [Block, Methods] => {
  const { blocks, methods } = useContext(DoptContext);

  if (!blocks[identifier]) {
    methods.get(identifier);
  }

  const start = useCallback(() => methods.start(identifier), [identifier]);
  const complete = useCallback(
    () => methods.complete(identifier),
    [identifier]
  );
  const stop = useCallback(() => methods.stop(identifier), [identifier]);
  const exit = useCallback(() => methods.exit(identifier), [identifier]);

  return [
    blocks[identifier] || { active: false },
    { start, complete, stop, exit },
  ];
};

export { useDopt };
