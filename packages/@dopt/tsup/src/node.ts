import { env, inProd } from '@dopt/env';

import { defineConfig, Options } from 'tsup';

const node = ({ entry, watch = false, ...rest }: Options) => {
  return defineConfig(() => ({
    entry,
    watch,
    outDir: 'dist',
    format: ['esm', 'cjs'],
    tsconfig: './tsconfig.json',
    target: env({ dev: 'esnext', prod: 'esnext' }),
    sourcemap: inProd(),
    minify: inProd(),
    clean: true,
    onSuccess: `
        echo "\u001b[34;1mCLI\u001b[0m 🐢 Building d.ts and d.ts.map";
        tsc --emitDeclarationOnly --declaration --declarationMap;
        echo "\u001b[34;1mCLI\u001b[0m 🐢 Build success (albeit slowly)";
        ls ./dist/ | grep 'd\.ts' | xargs -I{} echo "\u001b[34;1mDTS\u001b[0m \u001b[37;1mdist/{}\u001b[0m";
      `,
    ...rest,
  }));
};
export { node };
