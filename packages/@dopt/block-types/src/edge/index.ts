import { DirectedEdge } from './directed';
import { BooleanEdge } from './boolean';

export * from './directed';
export * from './boolean';
export * from './base';

import { Block } from '../block';

export type Edges = (
  | DirectedEdge<Block | undefined, Block | undefined>
  | BooleanEdge<Block | undefined, Block | undefined>
)[];
