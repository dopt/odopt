import { external } from '@dopt/pkg-build';

export default external.browser({
  entries: ['src/index', 'src/core'],
});
