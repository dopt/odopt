import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index', 'src/core'],
  externals: [],
  clean: false,
  rollup: {
    inlineDependencies: true,
    emitCJS: true,
    esbuild: {
      target: 'ESNext',
      jsx: 'automatic',
      minify: true,
    },
  },
  declaration: true,
});
