import {
  AssistantCompletionsRequestBody,
  DocumentContext,
  ElementContext,
  SemanticContext,
  VisualContext,
} from '@dopt/ai-assistant-definition';

import { Value } from '@sinclair/typebox/value';

import * as ctx from '@dopt/ai-assistant-context';

export interface AssistantContextProps {
  document?: DocumentContext['value'];
  element?: Element | ElementContext['value'];
  semantic?: SemanticContext['value'];
  visual?: boolean | VisualContext['value'];
}

export async function formAssistantContext({
  document,
  element,
  semantic,
  visual = true,
}: AssistantContextProps) {
  const context: AssistantCompletionsRequestBody['context'] = {
    document:
      document == null
        ? await ctx.document.generate()
        : {
            type: 'document',
            value: document,
          },
  };

  if (element instanceof Element) {
    context.element = await ctx.element.generate({ element });
  } else if (element != null && Value.Check(ElementContext['value'], element)) {
    context.element = {
      type: 'element',
      value: element,
    };
  } else {
    throw new Error(
      `Element context generation expects element to be a valid HTML \`Element\` or an object of type \`ElementContext\` and cannot be ${element}`
    );
  }

  if (semantic != null && Value.Check(SemanticContext['value'], semantic)) {
    context.semantic = {
      type: 'semantic',
      value: semantic,
    };
  } else if (element instanceof Element) {
    context.semantic = await ctx.semantic.generate({ element });
  } else {
    throw new Error(
      `Semantic context generation expects element to be a valid HTML \`Element\` or semantic to be an object of type \`SemanticContext\``
    );
  }

  if (visual === true) {
    if (element instanceof Element) {
      const visualContext = await ctx.visual.generate({ element });
      if (visualContext != null) {
        context.visual = visualContext;
      }
    } else {
      throw new Error(
        `Visual context generation expects element to be a valid HTML \`Element\` when visual is \`true\``
      );
    }
  } else if (Boolean(visual)) {
    if (typeof visual === 'string') {
      context.visual = {
        type: 'visual',
        value: visual,
      };
    } else {
      throw new Error(
        `Visual context generation expects visual to be either a boolean or a string`
      );
    }
  }

  return context;
}
