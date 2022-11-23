import { DirectedEdge } from './directed';
import { UndirectedEdge } from './undirected';

export * from './directed';
export * from './undirected';

import { BlockType as Block } from '../block';

export type Edges = (
  | DirectedEdge<Block | undefined, Block | undefined>
  | UndirectedEdge<Block | undefined, Block | undefined>
)[];
