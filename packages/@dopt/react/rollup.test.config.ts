import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import externalizePeerDeps from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

const config = [
  {
    input: './src/index.ts',
    output: [
      {
        file: './tmp/index.esm.js',
        format: 'esm',
      },
      {
        file: './tmp/index.cjs.js',
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
        preventAssignment: true,
      }),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      externalizePeerDeps(),
    ],
  },
  {
    input: './tmp/types/index.d.ts',
    output: [{ file: 'tmp/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];

export default config;
