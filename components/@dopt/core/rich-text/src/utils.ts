import type { Text, Node } from './types';

export function isTextNode(node: Node): node is Text {
  return 'text' in node;
}
