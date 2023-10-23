import { Static, Type } from '@sinclair/typebox';
import { ComponentFieldDefinition, fieldToString } from '../fields';
import { Model } from './model';
import { Container } from './container';

export const Hints = Type.Object(
  {
    ...Container.properties,
    type: Type.Literal('hints'),
  },
  { $id: 'Hints' }
);
export type Hints = Static<typeof Hints>;

export const HintsItem = Type.Object(
  {
    ...Model.properties,
    type: Type.Literal('hintsItem'),
    transitioned: Type.Object({
      complete: Type.Boolean(),
      dismiss: Type.Boolean(),
    }),
    containerUid: Type.String(),
  },
  { $id: 'HintsItem' }
);
export type HintsItem = Static<typeof HintsItem>;

export type HintsItemFieldKeys =
  | 'title'
  | 'body'
  | 'complete-label'
  | 'dismiss-label'
  | 'display-index';

export const HintsItemFieldKeys: HintsItemFieldKeys[] = [
  'title',
  'body',
  'complete-label',
  'dismiss-label',
  'display-index',
];

/**
 * This captures field definitions that are created when a hints is created.
 * These definitions are *always* expected to be present for a given hints.
 * If these definitions are changed, it is a major API change and will require:
 * a migration, changes to @app/server and @app/client, and updates to published
 * SDKs and UI components.
 */
export const HintsItemFieldDefinitions: ComponentFieldDefinition<HintsItemFieldKeys>[] =
  [
    {
      displayName: 'Title',
      sid: 'title',
      description: 'Content for the main title heading',
      type: 'string',
      initialValue: fieldToString('HintsItem title') as string,
    },
    {
      displayName: 'Body',
      sid: 'body',
      description: 'Content for the main body section',
      type: 'richText',
      initialValue: fieldToString([
        {
          type: 'paragraph',
          children: [{ text: 'HintsItem body' }],
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
    {
      displayName: 'Display index',
      sid: 'display-index',
      description: 'Internal hintsItem item display index',
      type: 'number',
      initialValue: fieldToString(0) as string,
    },
  ];
