import { Static, Type } from '@sinclair/typebox';
import { ComponentFieldDefinition, fieldToString } from '../fields';
import { Model } from './model';
import { Container } from './container';

export const Tour = Type.Object(
  {
    ...Container.properties,
    type: Type.Literal('tour'),
  },
  { $id: 'Tour' }
);
export type Tour = Static<typeof Tour>;

export const TourItem = Type.Object(
  {
    ...Model.properties,
    type: Type.Literal('tourItem'),
    transitioned: Type.Object({
      next: Type.Boolean(),
      previous: Type.Boolean(),
    }),
    containerUid: Type.String(),
  },
  { $id: 'TourItem' }
);
export type TourItem = Static<typeof TourItem>;

export type TourItemFieldKeys =
  | 'title'
  | 'body'
  | 'next-label'
  | 'back-label'
  | 'display-index';

/**
 * This captures field definitions that are created when a tour is created.
 * These definitions are *always* expected to be present for a given tour.
 * If these definitions are changed, it is a major API change and will require:
 * a migration, changes to @app/server and @app/client, and updates to published
 * SDKs and UI components.
 */
export const TourItemFieldDefinitions: ComponentFieldDefinition<TourItemFieldKeys>[] =
  [
    {
      displayName: 'Title',
      sid: 'title',
      description: 'Content for the title heading',
      type: 'string',
      initialValue: fieldToString('Tour item title') as string,
    },
    {
      displayName: 'Body',
      sid: 'body',
      description: 'Content for the body section',
      type: 'richText',
      initialValue: fieldToString([
        {
          type: 'paragraph',
          children: [{ text: 'Tour item body' }],
        },
      ]) as string,
    },
    {
      displayName: 'Next label',
      sid: 'next-label',
      description: 'Content for the next button',
      type: 'string',
      initialValue: fieldToString('Next') as string,
    },
    {
      displayName: 'Back label',
      sid: 'back-label',
      description: 'Content for the back button',
      type: 'string',
      initialValue: fieldToString('Back') as string,
    },
    {
      displayName: 'Display index',
      sid: 'display-index',
      description: 'Internal tour item display index',
      type: 'number',
      initialValue: fieldToString(0) as string,
    },
  ];
