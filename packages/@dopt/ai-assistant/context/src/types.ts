import { Context } from '@dopt/ai-assistant-definition';

export interface ContextGenerator<T extends Context | null> {
  generate: (...args: any) => Promise<T>;
}
