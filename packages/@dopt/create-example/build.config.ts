import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  rollup: {
    inlineDependencies: true,
    emitCJS: true,
    esbuild: {
      target: 'ESNext',
      minify: true,
    },
  },
  declaration: true,
});
