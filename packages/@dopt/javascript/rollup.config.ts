import replace from '@rollup/plugin-replace';

import { rollup } from '@dopt/rollup';

//@ts-ignore
import pkg from './package.json' assert { type: 'json' };

export default rollup({
  input: './src/index.ts',
  plugins: [
    replace({
      'process.env.URL_PREFIX': JSON.stringify(
        process.env.NODE_ENV === 'production'
          ? 'https://blocks.dopt.com'
          : 'http://localhost:7071'
      ),
      'process.env.PKG_VERSION': JSON.stringify(pkg.version),
      'process.env.PKG_NAME': JSON.stringify(pkg.name),
      preventAssignment: true,
    }),
  ],
});
