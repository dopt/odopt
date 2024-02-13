import type { DocumentContext } from '@dopt/ai-assistant-definition';

import { ContextGenerator } from './types';

export default {
  async generate() {
    if (!window || !document) {
      throw new Error('Cannot generate page context in a headless environment');
    }

    return {
      type: 'document',
      value: {
        url: document.URL,
        title: document.title,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };
  },
} satisfies ContextGenerator<DocumentContext>;
