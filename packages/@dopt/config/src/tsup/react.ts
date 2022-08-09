import { env, inProd } from '@dopt/env';

import { defineConfig, Options } from 'tsup';

import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

const react = ({ entry, watch = false, ...rest }: Options) => {
  //@ts-ignore
  return defineConfig(() => ({
    entry,
    watch,
    outDir: 'dist',
    format: ['esm', 'cjs'],
    inject: ['./.react-jsx-inject.ts'],
    target: env({ dev: 'ESNext', prod: 'ES2020' }),
    sourcemap: 'inline',
    minify: inProd(),
    esbuildPlugins: [
      vanillaExtractPlugin({
        identifiers: env({ dev: 'debug', prod: 'short' }),
      }),
    ],
    clean: true,
    onSuccess: `
        echo "\u001b[34;1mCLI\u001b[0m 🐢 Building d.ts and d.ts.map";
        tsc --emitDeclarationOnly --declaration;
        echo "\u001b[34;1mCLI\u001b[0m 🐢 Build success (albeit slowly)";
        ls ./dist/ | grep 'd\.ts' | xargs -I{} echo "\u001b[34;1mDTS\u001b[0m \u001b[37;1mdist/{}\u001b[0m";
      `,
    ...rest,
  }));
};
export { react };
