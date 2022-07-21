import { useContext, useCallback, useEffect } from 'react';
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
  useEffect(() => {
    if (!(identifier in blocks)) {
      methods.get(identifier);
    }
  }, [identifier]);
  const start = useCallback(() => methods.start(identifier), []);
  const complete = useCallback(() => methods.complete(identifier), []);
  const stop = useCallback(() => methods.stop(identifier), []);
  const exit = useCallback(() => methods.exit(identifier), []);

  return [
    blocks[identifier] || { active: false },
    { start, complete, stop, exit },
  ];
};

export { useDopt };
