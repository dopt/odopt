import { Type } from '@sinclair/typebox';

export const ModelProps = Type.Object({
  type: Type.Readonly(Type.Literal('model')),
});
