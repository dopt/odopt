import { Type } from '@sinclair/typebox';

export const EndProps = Type.Object({
  type: Type.Readonly(Type.Literal('end')),
});
