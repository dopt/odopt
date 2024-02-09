import {
  AssistantCompletionsRequestBody,
  DocumentContext,
  ElementContext,
  RuntimeContext,
  SemanticContext,
  VisualContext,
} from '@dopt/ai-assistant-definition';

import * as ctx from '@dopt/ai-assistant-context';

export interface AssistantContextProps {
  document?: boolean | DocumentContext['value'];
  element?: HTMLElement | ElementContext['value'];
  runtime?: RuntimeContext['value'] | RuntimeContext['value'][];
  semantic?: boolean | SemanticContext['value'];
  visual?: boolean | VisualContext['value'];
}

export async function formAssistantContext({
  document = true,
  element,
  semantic = true,
  visual = true,
  runtime,
}: AssistantContextProps) {
  const context: AssistantCompletionsRequestBody['context'] = {};

  if (typeof document === 'boolean') {
    if (document) {
      context.document = await ctx.document.generate();
    }
  } else {
    context.document = {
      type: 'document',
      value: document,
    };
  }

  if (element instanceof HTMLElement) {
    context.element = await ctx.element.generate({ element });
  } else if (element !== undefined) {
    context.element = {
      type: 'element',
      value: element,
    };
  }

  if (typeof semantic === 'boolean') {
    if (element instanceof HTMLElement) {
      if (semantic) {
        context.semantic = await ctx.semantic.generate({ element });
      }
    } else {
      throw new Error(
        `Semantic context generation expects a valid HTML element. The provided element ${element} is not valid.`
      );
    }
  } else {
    context.semantic = {
      type: 'semantic',
      value: semantic,
    };
  }

  if (typeof visual === 'boolean') {
    if (element instanceof HTMLElement) {
      if (visual) {
        context.visual = await ctx.visual.generate({ element });
      }
    } else {
      throw new Error(
        `Visual context generation expects a valid HTML element. The provided element ${element} is not valid.`
      );
    }
  } else {
    context.visual = {
      type: 'visual',
      value: visual,
    };
  }

  if (runtime) {
    context.runtime = (Array.isArray(runtime) ? runtime : [runtime]).map(
      (value) => {
        return {
          type: 'runtime',
          value,
        };
      }
    );
  }

  return context;
}
