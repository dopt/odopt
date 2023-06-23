import { Static, Type } from '@sinclair/typebox';
import { ComponentFieldDefinition, fieldToString } from 'fields';
import { Model } from './model';

export const Modal = Type.Object(
  {
    ...Model.properties,
    type: Type.Literal('modal'),
    transitioned: Type.Object({
      complete: Type.Boolean(),
      dismiss: Type.Boolean(),
    }),
  },
  { $id: 'Modal' }
);
export type Modal = Static<typeof Modal>;

/**
 * This captures field definitions that are created when a modal is created.
 * These definitions are *always* expected to be present for a given modal.
 * If these definitions are changed, it is a major API change and will require:
 * a migration, changes to @app/server and @app/client, and updates to published
 * SDKs and UI components.
 */
export type ModalFieldKeys =
  | 'title'
  | 'body'
  | 'complete-label'
  | 'dismiss-label';

export const ModalFieldDefinitions: ComponentFieldDefinition<ModalFieldKeys>[] =
  [
    {
      displayName: 'Title',
      sid: 'title',
      description: 'Content for the title heading',
      type: 'string',
      initialValue: fieldToString('Modal title') as string,
    },
    {
      displayName: 'Body',
      sid: 'body',
      description: 'Content for the body section',
      type: 'string',
      initialValue: fieldToString('Modal body') as string,
    },
    {
      displayName: 'Complete Label',
      sid: 'complete-label',
      description: 'Content for the complete button',
      type: 'string',
      initialValue: fieldToString('Complete') as string,
    },
    {
      displayName: 'Dismiss Label',
      sid: 'dismiss-label',
      description: 'Content for the dismiss button',
      type: 'string',
      initialValue: fieldToString('Dismiss') as string,
    },
  ];
