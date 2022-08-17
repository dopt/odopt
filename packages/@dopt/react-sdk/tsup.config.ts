import * as tsup from '@dopt/tsup';
export default tsup.react({
  entry: ['src/index.ts'],
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
  dts: true,
});
