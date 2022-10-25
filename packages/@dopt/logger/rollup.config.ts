import typescript from '@rollup/plugin-typescript';
import externalizePeerDeps from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

import pkg from './package.json' assert { type: 'json' };

const config = [
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.exports['.'].import,
        format: 'esm',
      },
      {
        file: pkg.exports['.'].require,
        format: 'cjs',
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
      }),
      externalizePeerDeps(),
    ],
  },
  {
    input: './dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];

export default config;
