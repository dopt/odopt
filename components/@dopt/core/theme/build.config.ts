import { external, hooks } from '@dopt/pkg-build';

export default external.browser({
  entries: ['src/index', 'src/styles.css'],
  hooks: {
    'rollup:options': (ctx, options) => {
      hooks.transformVanillaExtractExtensions(ctx, options);
    },
  },
});
