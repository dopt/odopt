import { useContext, useCallback } from 'react';
import { DoptContext } from '@/context';

import { Block } from '@/types';

export interface Methods {
  done: () => void;
  stop: () => void;
  skip: () => void;
}

const useDopt = (identifier: string): [Block, Methods] => {
  const { blocks, methods } = useContext(DoptContext);

  if (!blocks[identifier]) {
    methods.get(identifier);
  }

  const done = useCallback(() => methods.done(identifier), [identifier]);
  const stop = useCallback(() => methods.stop(identifier), [identifier]);
  const skip = useCallback(() => methods.skip(identifier), [identifier]);

  return [blocks[identifier] || false, { done, stop, skip }];
};

export { useDopt };
