import { external } from '@dopt/pkg-build';

//@ts-ignore
import pkg from './package.json';

export default external.isomorphic({
  rollup: {
    replace: {
      values: {
        'process.env.URL_PREFIX': JSON.stringify(
          process.env.NODE_ENV === 'production'
            ? 'https://blocks.dopt.com'
            : 'http://localhost:7071'
        ),
        'process.env.SOCKET_PREFIX': JSON.stringify(
          process.env.NODE_ENV === 'production'
            ? 'https://blocks.dopt.com'
            : 'http://localhost:7072'
        ),
        'process.env.PKG_VERSION': JSON.stringify(pkg.version),
        'process.env.PKG_NAME': JSON.stringify(pkg.name),
      },
      preventAssignment: true,
    },
  },
});
