import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
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
      replace({
        'process.env.URL_PREFIX': JSON.stringify(
          process.env.NODE_ENV === 'production'
            ? 'https://blocks.dopt.com'
            : 'http://localhost:7070'
        ),
        'process.env.PKG_VERSION': JSON.stringify(pkg.version),
        'process.env.PKG_NAME': JSON.stringify(pkg.name),
        preventAssignment: true,
      }),
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
