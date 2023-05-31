import { Static, Type } from '@sinclair/typebox';
import { Empty, Unary } from './base';
import { Model } from './model';

export const ContainerEnd = Type.Object(
  {
    ...Empty.properties,
    type: Type.Literal('containerEnd'),
    containerUid: Type.String(),
  },
  { $id: 'ContainerEnd' }
);
export type ContainerEnd = Static<typeof ContainerEnd>;

export const ContainerStart = Type.Object(
  {
    ...Unary.properties,
    type: Type.Literal('containerStart'),
    containerUid: Type.String(),
  },
  { $id: 'ContainerStart' }
);
export type ContainerStart = Static<typeof ContainerStart>;

export const Container = Type.Object(
  {
    ...Model.properties,
    type: Type.Literal('container'),
    transitioned: Type.Object({
      complete: Type.Boolean(),
      dismiss: Type.Boolean(),
    }),
  },
  { $id: 'Container' }
);
export type Container = Static<typeof Container>;
