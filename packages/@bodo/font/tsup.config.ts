import { tsup } from '@dopt/config';
export default tsup.react({
  entry: [
    'src/index.ts',
    'src/inter.css.ts',
    'src/degular.css.ts',
    'src/degular-display.css.ts',
    'src/vctr-mono.css.ts',
  ],
  inject: [],
});
