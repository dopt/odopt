import { defineBuildConfig, hooks } from '@dopt/pkg-build';

export default defineBuildConfig({
  entries: ['src/index'],
  sourcemap: true,
  rollup: {
    inlineDependencies: true,
    emitCJS: true,
    esbuild: {
      target: ['es2016'],
      minify: true,
    },
  },
  declaration: 'compatible',
  hooks: {
    'rollup:options': (ctx, opts) => {
      hooks.transformModernModuleExtensions(ctx, opts);
    },
  },
});
