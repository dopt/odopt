import type { Text, Node } from './types';
import { videoVendorUrls } from './const';

export function isTextNode(node: Node): node is Text {
  return 'text' in node;
}

export function isVideoVendorUrl(url: string) {
  return videoVendorUrls.some((vendorUrl) => url.startsWith(vendorUrl));
}
