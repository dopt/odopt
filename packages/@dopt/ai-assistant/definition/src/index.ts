export * from './api';
export * from './context';
export * from './const';

import * as APISchemas from './api';
import * as ContextSchemas from './context';

export const Schemas = {
  ...APISchemas,
  ...ContextSchemas,
};
