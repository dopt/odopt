import { defineBuildConfig } from 'unbuild';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';

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
  hooks: {
    'rollup:options'(_ctx, options) {
      if (Array.isArray(options.plugins)) {
        options.plugins = [...options.plugins, vanillaExtractPlugin()];
      }

      if (Array.isArray(options.output)) {
        for (const outputOptions of options.output) {
          outputOptions.assetFileNames = ({ name }) => {
            const fileName = name
              ?.replace(/^src.*\//, '')
              .replace(/\.css\.ts\.vanilla.css$/, '.css');
            return fileName || '';
          };
        }
      }
    },
  },
});
