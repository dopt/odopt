import * as tsup from '@dopt/tsup';
export default tsup.react({
  entry: ['src/index.ts'],
  addImportPackageStylesPlugin: false,
  inject: [],
});
