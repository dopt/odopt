import externalizePeerDeps from 'rollup-plugin-peer-deps-external';

import pkg from './package.json' assert { type: 'json' };

const config = [
  {
    input: './src/index.js',
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
    plugins: [externalizePeerDeps()],
    external: ['querystring', 'superagent'],
  },
];

export default config;
