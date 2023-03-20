import { EdgeTypes } from './base';

export type BooleanEdge<T, Y> = {
  kind: 'edge';
  type: EdgeTypes.boolean;
  for: boolean;
  value: [T, Y];
};
