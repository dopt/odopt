import { tsup } from '@dopt/config';
export default tsup.react({
  entry: ['src/index.ts', 'src/inter.css.ts', 'src/vctrmono.css.ts'],
  inject: [],
});
