import { Static, Type } from '@sinclair/typebox';
import { ComponentFieldDefinition } from 'fields';
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

export type TourFieldKeys = 'dismiss-action';

/**
 * This captures field definitions that are created when a tour is created.
 * These definitions are *always* expected to be present for a given tour.
 * If these definitions are changed, it is a major API change and will require:
 * a migration, changes to @app/server and @app/client, and updates to published
 * SDKs and UI components.
 */
export const TourFieldDefinitions: ComponentFieldDefinition<TourFieldKeys>[] = [
  {
    displayName: 'Dismiss Action',
    sid: 'dismiss-action',
    description:
      "The tour's dismiss action. If empty, no action will be shown which can dismiss the entire tour",
    type: 'string',
  },
];

export type TourItemFieldKeys =
  | 'title'
  | 'body'
  | 'next-action'
  | 'previous-action'
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
      description: "The tour item's title, defaults to empty string",
      type: 'string',
    },
    {
      displayName: 'Body',
      sid: 'body',
      description: "The tour item's body, defaults to empty string",
      type: 'string',
    },
    {
      displayName: 'Next Action',
      sid: 'next-action',
      description:
        "The tour item's next action. If empty, will default to 'Next'",
      type: 'string',
    },
    {
      displayName: 'Previous Action',
      sid: 'previous-action',
      description:
        "The tour item's previous action. If empty, will default to 'Previous'",
      type: 'string',
    },
    {
      displayName: 'Display Index',
      sid: 'display-index',
      description: "The tour item's display index",
      type: 'number',
    },
  ];
