import { Static, Type } from '@sinclair/typebox';
import { ComponentFieldDefinition, fieldToString } from 'fields';
import { Model } from './model';

export const Card = Type.Object(
  {
    ...Model.properties,
    type: Type.Literal('card'),
    transitioned: Type.Object({
      complete: Type.Boolean(),
      dismiss: Type.Boolean(),
    }),
  },
  { $id: 'Card' }
);
export type Card = Static<typeof Card>;

/**
 * This captures field definitions that are created when a card is created.
 * These definitions are *always* expected to be present for a given card.
 * If these definitions are changed, it is a major API change and will require:
 * a migration, changes to @app/server and @app/client, and updates to published
 * SDKs and UI components.
 */
export type CardFieldKeys =
  | 'title'
  | 'body'
  | 'complete-label'
  | 'dismiss-label';

export const CardFieldDefinitions: ComponentFieldDefinition<CardFieldKeys>[] = [
  {
    displayName: 'Title',
    sid: 'title',
    description: 'Content for the title heading',
    type: 'string',
    initialValue: fieldToString('Card title') as string,
  },
  {
    displayName: 'Body',
    sid: 'body',
    description: 'Content for the body section',
    type: 'richText',
    initialValue: fieldToString([
      {
        type: 'paragraph',
        children: [{ text: 'Card body' }],
      },
    ]) as string,
  },
  {
    displayName: 'Complete label',
    sid: 'complete-label',
    description: 'Content for the complete button',
    type: 'string',
    initialValue: fieldToString('Complete') as string,
  },
  {
    displayName: 'Dismiss label',
    sid: 'dismiss-label',
    description: 'Content for the dismiss button',
    type: 'string',
    initialValue: fieldToString('Dismiss') as string,
  },
];
