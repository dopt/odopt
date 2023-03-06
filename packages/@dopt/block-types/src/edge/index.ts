import { DirectedEdge } from './directed';
import { LogicEdge } from './logical';

export * from './directed';
export * from './logical';
export * from './base';

import { Block } from '../block';

export type Edges = (
  | DirectedEdge<Block | undefined, Block | undefined>
  | LogicEdge<Block | undefined, Block | undefined>
)[];
