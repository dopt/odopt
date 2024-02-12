import type { ElementContext } from '@dopt/ai-assistant-definition';

import { ContextGenerator } from './types';

export default {
  async generate({ element }: { element: HTMLElement }) {
    const { top, left } = element.getBoundingClientRect();

    return {
      type: 'element',
      value: {
        position: {
          top,
          left,
        },
        content: element.innerText,
        tag: element.tagName.toLowerCase(),
      },
    };
  },
} satisfies ContextGenerator<ElementContext>;
