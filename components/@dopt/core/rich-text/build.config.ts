import { external } from '@dopt/pkg-build';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';

export default external.browser({
  entries: ['src/index', 'src/styles.css'],
  hooks: {
    'rollup:options': (_ctx, options) => {
      if (Array.isArray(options.plugins)) {
        //@ts-ignore
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
