import { external, hooks } from '@dopt/pkg-build';

export default external.react({
  entries: ['src/index', 'src/hooks'],
  externals: ['@dopt/react', 'react'],
  hooks: {
    'rollup:options': (ctx, options) => {
      hooks.transformVanillaExtractExtensions(ctx, options);
    },
  },
});
