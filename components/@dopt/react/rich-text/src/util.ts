import { CustomText, Descendant } from '@dopt/core-rich-text';

export function isTextNode(node: Descendant): node is CustomText {
  return 'text' in node;
}
