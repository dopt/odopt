import type { ElementContext } from '@dopt/ai-assistant-definition';

import { ContextGenerator } from './types';

export default {
  async generate({ element }: { element: Element }) {
    const { top, left } = element.getBoundingClientRect();

    return {
      type: 'element',
      value: {
        position: {
          top,
          left,
        },
        content: element instanceof HTMLElement ? element.innerText : '',
        tag: element.tagName.toLowerCase(),
      },
    };
  },
} satisfies ContextGenerator<ElementContext>;
