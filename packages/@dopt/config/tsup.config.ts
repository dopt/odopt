const isProd = () => process.env.NODE_ENV === 'production';
const inProd = isProd;

interface Config<T, Y> {
  prod: T;
  dev: Y;
}
function env<T, Y>({ prod, dev }: Config<T, Y>): T | Y {
  return isProd() ? prod : dev;
}

import { defineConfig, Options } from 'tsup';

const node = ({ entry, watch = false, ...rest }: Options) => {
  return defineConfig(() => ({
    entry,
    watch,
    outDir: 'dist',
    format: ['esm', 'cjs'],
    tsconfig: './tsconfig.json',
    target: env({ dev: 'ESNext', prod: 'ESNext' }),
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

export default node({ entry: ['src/index.ts'] });
