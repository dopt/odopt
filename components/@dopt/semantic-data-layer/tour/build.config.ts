import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index'],
  clean: false,
  rollup: {
    emitCJS: true,
    esbuild: {
      target: 'ESNext',
      jsx: 'automatic',
      minify: true,
    },
  },
  declaration: true,
});
