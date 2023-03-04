import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const LogicTypeConst = 'logic';
export const LogicType = Type.Literal(LogicTypeConst);
export const LogicProps = Type.Object(
  {
    type: Type.Readonly(LogicType),
    expression: Type.Function([], Type.Promise(Type.Boolean())),
  },
  { $id: 'LogicProps' }
);

export const Logic = Type.Intersect([Base, LogicProps], { $id: 'Logic' });
export type Logic = Static<typeof Logic>;
