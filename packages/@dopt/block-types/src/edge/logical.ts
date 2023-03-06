import { EdgeTypes } from './base';

export type LogicEdge<T, Y> = {
  kind: 'edge';
  type: EdgeTypes.logical;
  for: boolean;
  value: [T, Y];
};
