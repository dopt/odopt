import { Static, Type } from '@sinclair/typebox';
import { ComponentFieldDefinition } from 'fields';
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
  | 'complete-action'
  | 'dismiss-action';

export const ModalFieldDefinitions: ComponentFieldDefinition<ModalFieldKeys>[] =
  [
    {
      displayName: 'Title',
      sid: 'title',
      description: "The modal's title, defaults to empty string",
      type: 'string',
    },
    {
      displayName: 'Body',
      sid: 'body',
      description: "The modal's body, defaults to empty string",
      type: 'string',
    },
    {
      displayName: 'Complete Action',
      sid: 'complete-action',
      description: "The modal's complete action, defaults to empty string",
      type: 'string',
    },
    {
      displayName: 'Dismiss Action',
      sid: 'dismiss-action',
      description:
        "The modal's dismiss action. If empty, no dismiss action will be shown",
      type: 'string',
    },
  ];
