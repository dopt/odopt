import { external } from '@dopt/pkg-build';

export default external.react({
  entries: ['src/index', 'src/core'],
  externals: ['react'],
});
