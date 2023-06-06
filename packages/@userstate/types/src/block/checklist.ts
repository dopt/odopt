import { Static, Type } from '@sinclair/typebox';
import { ComponentFieldDefinition } from 'fields';
import { Model } from './model';
import { Container } from './container';

export const Checklist = Type.Object(
  {
    ...Container.properties,
    type: Type.Literal('checklist'),
  },
  { $id: 'Checklist' }
);
export type Checklist = Static<typeof Checklist>;

export const ChecklistItem = Type.Object(
  {
    ...Model.properties,
    type: Type.Literal('checklistItem'),
    transitioned: Type.Object({
      complete: Type.Boolean(),
      skip: Type.Boolean(),
    }),
    containerUid: Type.String(),
  },
  { $id: 'ChecklistItem' }
);
export type ChecklistItem = Static<typeof ChecklistItem>;

export type ChecklistFieldKeys = 'title' | 'description' | 'dismiss-action';

/**
 * This captures field definitions that are created when a checklist is created.
 * These definitions are *always* expected to be present for a given checklist.
 * If these definitions are changed, it is a major API change and will require:
 * a migration, changes to @app/server and @app/client, and updates to published
 * SDKs and UI components.
 */
export const ChecklistFieldDefinitions: ComponentFieldDefinition<ChecklistFieldKeys>[] =
  [
    {
      displayName: 'Title',
      sid: 'title',
      description: "The checklist's title, defaults to empty string",
      type: 'string',
    },
    {
      displayName: 'Description',
      sid: 'description',
      description: "The checklist's description, defaults to empty string",
      type: 'string',
    },
    {
      displayName: 'Dismiss Action',
      sid: 'dismiss-action',
      description:
        "The checklist's dismiss action. If empty, no dismiss action will be shown",
      type: 'string',
    },
  ];

export type ChecklistItemFieldKeys =
  | 'title'
  | 'description'
  | 'complete-action'
  | 'skip-action'
  | 'display-index';

/**
 * This captures field definitions that are created when a checklist is created.
 * These definitions are *always* expected to be present for a given checklist.
 * If these definitions are changed, it is a major API change and will require:
 * a migration, changes to @app/server and @app/client, and updates to published
 * SDKs and UI components.
 */
export const ChecklistItemFieldDefinitions: ComponentFieldDefinition<ChecklistItemFieldKeys>[] =
  [
    {
      displayName: 'Title',
      sid: 'title',
      description: "The checklist item's title, defaults to empty string",
      type: 'string',
    },
    {
      displayName: 'Description',
      sid: 'description',
      description: "The checklist item's description, defaults to empty string",
      type: 'string',
    },
    {
      displayName: 'Complete Action',
      sid: 'complete-action',
      description:
        "The checklist item's complete action. If empty, no complete action will be shown",
      type: 'string',
    },
    {
      displayName: 'Skip Action',
      sid: 'skip-action',
      description:
        "The checklist item's skip action. If empty, no skip action will be shown",
      type: 'string',
    },
    {
      displayName: 'Display Index',
      sid: 'display-index',
      description: "The checklist item's display index",
      type: 'number',
      defaultValue: 0,
    },
  ];
