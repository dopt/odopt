import { Static, Type } from '@sinclair/typebox';
import { ComponentFieldDefinition, fieldToString } from 'fields';
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

export type ChecklistFieldKeys = 'title' | 'body';

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
      description: 'Content for the main title heading',
      type: 'string',
      initialValue: fieldToString('Checklist title') as string,
    },
    {
      displayName: 'Body',
      sid: 'body',
      description: 'Content for the main body section',
      type: 'string',
      initialValue: fieldToString('Checklist body') as string,
    },
  ];

export type ChecklistItemFieldKeys =
  | 'title'
  | 'body'
  | 'complete-label'
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
      description: 'Content for the title heading',
      type: 'string',
      initialValue: fieldToString('Checklist item title') as string,
    },
    {
      displayName: 'Body',
      sid: 'body',
      description: 'Content for the body section',
      type: 'string',
      initialValue: fieldToString('Checklist item body') as string,
    },
    {
      displayName: 'Complete Label',
      sid: 'complete-label',
      description: 'Content for the complete button',
      type: 'string',
      initialValue: fieldToString('Complete') as string,
    },
    {
      displayName: 'Display Index',
      sid: 'display-index',
      description: 'Internal checklist item display index',
      type: 'number',
      initialValue: fieldToString(0) as string,
    },
  ];
