import { EdgeTypes } from './base';

export type DirectedEdge<T, Y> = {
  kind: 'edge';
  type: EdgeTypes.edge;
  value: [T, Y];
};
