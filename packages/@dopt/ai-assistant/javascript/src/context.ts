import {
  AssistantCompletionsRequestBody,
  DocumentContext,
  ElementContext,
  SemanticContext,
  VisualContext,
} from '@dopt/ai-assistant-definition';

import * as ctx from '@dopt/ai-assistant-context';

export interface AssistantContextProps {
  document?: DocumentContext['value'];
  element?: HTMLElement | ElementContext['value'];
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

  if (element instanceof HTMLElement) {
    context.element = await ctx.element.generate({ element });
  } else if (element != null) {
    context.element = {
      type: 'element',
      value: element,
    };
  } else {
    throw new Error(
      `Element context generation expects a valid HTML element or  cannot be ${element}`
    );
  }

  if (semantic != null) {
    context.semantic = {
      type: 'semantic',
      value: semantic,
    };
  } else if (element instanceof HTMLElement) {
    context.semantic = await ctx.semantic.generate({ element });
  } else {
    throw new Error(
      `Semantic context generation expects a valid HTML element. When semantic is \`${semantic}\`, element must be an \`HTMLElement\`.`
    );
  }

  if (visual === true) {
    if (element instanceof HTMLElement) {
      context.visual = await ctx.visual.generate({ element });
    } else {
      throw new Error(
        `Visual context generation expects a valid HTML element. When visual is \`true\`, element must be an \`HTMLElement\`.`
      );
    }
  } else if (!!visual) {
    context.visual = {
      type: 'visual',
      value: visual,
    };
  }

  return context;
}
