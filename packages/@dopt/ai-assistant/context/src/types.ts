import { Context } from '@dopt/ai-assistant-definition';

export interface ContextGenerator<T extends Context> {
  generate: (...args: any) => Promise<T>;
}
