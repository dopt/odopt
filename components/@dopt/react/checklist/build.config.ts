import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index'],
  externals: ['@dopt/react', 'react'],
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
