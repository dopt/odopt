import { external, hooks } from '@dopt/pkg-build';

export default external.react({
  entries: ['src/index'],
  rollup: {
    emitCJS: false,
  },
  hooks: {
    'rollup:options': (ctx, options) => {
      hooks.transformVanillaExtractExtensions(ctx, options);
    },
  },
});
