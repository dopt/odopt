import type { Text, Node } from '@dopt/core-rich-text';

export function isTextNode(node: Node): node is Text {
  return 'text' in node;
}
