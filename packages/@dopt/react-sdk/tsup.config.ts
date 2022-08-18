import * as tsup from '@dopt/tsup';
export default tsup.react({
  entry: ['src/index.ts'],
  target: 'es5',
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
  dts: true,
});
