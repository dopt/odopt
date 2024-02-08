import type { DocumentContext } from '@dopt/ai-assistant-definition';

import { ContextGenerator } from './types';

export default {
  async generate() {
    if (!window || !document) {
      throw new Error('Cannot generate page context in a headless environment');
    }

    const url = new URL(document.URL);

    return {
      type: 'document',
      value: {
        hostname: url.hostname,
        path: url.pathname,
        title: document.title,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };
  },
} satisfies ContextGenerator<DocumentContext>;
