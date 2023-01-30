import { rollup } from '@dopt/rollup';

export default rollup({
  input: './src/index.ts',
  external: ['axios', 'request'],
});
