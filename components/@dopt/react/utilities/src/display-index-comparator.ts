import type { Block } from '@dopt/react';

export function displayIndexComparator(b1: Block, b2: Block) {
  return (
    (b1.field<number>('display-index') || 0) -
    (b2.field<number>('display-index') || 0)
  );
}
