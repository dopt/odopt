import type { RuntimeContext } from '@dopt/ai-assistant-definition';

import { ContextGenerator } from './types';

export default {
  async generate({
    context,
    sid,
  }: {
    context: RuntimeContext['value']['context'];
    sid: RuntimeContext['value']['sid'];
  }) {
    return {
      type: 'runtime',
      value: {
        context,
        sid,
      },
    };
  },
} satisfies ContextGenerator<RuntimeContext>;
