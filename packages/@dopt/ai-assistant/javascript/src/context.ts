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
  document?: boolean | DocumentContext['value'];
  element?: Element | ElementContext['value'];
  semantic?: boolean | SemanticContext['value'];
  visual?: boolean | VisualContext['value'];
}

export async function formAssistantContext({
  document,
  element,
  semantic,
  visual,
}: AssistantContextProps) {
  const context: AssistantCompletionsRequestBody['context'] = {};

  if (document === true) {
    context.document = await ctx.document.generate();
  } else if (!!document) {
    if (Value.Check(DocumentContext['value'], document)) {
      context.document = {
        type: 'document',
        value: document,
      };
    } else {
      throw new Error(
        `Document context generation expects an object of type \`DocumentContext\``
      );
    }
  }

  if (element instanceof Element) {
    context.element = await ctx.element.generate({ element });
  } else if (element != null) {
    if (Value.Check(ElementContext['value'], element)) {
      context.element = {
        type: 'element',
        value: element,
      };
    } else {
      throw new Error(
        `Element context generation expects an object of type \`ElementContext\``
      );
    }
  }

  if (semantic === true) {
    if (element instanceof Element) {
      context.semantic = await ctx.semantic.generate({ element });
    } else {
      throw new Error(
        `Semantic context generation expects element to be a valid HTML \`Element\` when semantic is \`true\``
      );
    }
  } else if (!!semantic) {
    if (Value.Check(SemanticContext['value'], semantic)) {
      context.semantic = {
        type: 'semantic',
        value: semantic,
      };
    } else {
      throw new Error(
        `Semantic context generation expects an object of type \`SemanticContext\``
      );
    }
  }

  if (visual === true) {
    const visualContext = await ctx.visual.generate({
      element: element instanceof Element ? element : undefined,
    });
    if (visualContext != null) {
      context.visual = visualContext;
    }
  } else if (!!visual) {
    if (typeof visual === 'string') {
      context.visual = {
        type: 'visual',
        value: visual,
      };
    } else {
      throw new Error(`Visual context generation expects a string`);
    }
  }

  return context;
}
