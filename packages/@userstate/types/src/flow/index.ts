import { Static, Type } from '@sinclair/typebox';

import { Block } from '../block';
export const FlowState = Type.Readonly(
  Type.Object(
    {
      stopped: Type.Boolean(),
      started: Type.Boolean(),
      finished: Type.Boolean(),
    },
    { $id: 'FlowState' }
  )
);
export type FlowState = Static<typeof FlowState>;

export const Flow = Type.Object(
  {
    kind: Type.Readonly(Type.Literal('flow')),
    type: Type.Readonly(Type.Literal('flow')),
    uid: Type.Readonly(Type.String()),
    sid: Type.Readonly(Type.String()),
    version: Type.Readonly(Type.Number()),
    state: FlowState,
    blocks: Type.Optional(Type.Array(Type.Ref(Block))),
  },
  { $id: 'Flow' }
);

/**
 * This type defines all the properties of a flow.
 * A flow contains:
 * - `uid` / `sid`: a string, the identifier for the flow
 * - `version`: a number, the version of the flow being fetched (0 refers to the uncommitted version)
 * - `state`: a FlowState object tracking whether the flow has been started, completed, and / or exited
 * - `blocks`: an array, the array of all its child blocks
 */
export type Flow = Static<typeof Flow>;
