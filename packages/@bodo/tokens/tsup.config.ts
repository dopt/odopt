import { defineConfig } from 'tsup';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import { dependencies, peerDependencies } from './package.json';

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  inject: ['./.react-jsx-inject.ts'],
  sourcemap: true,
  bundle: true,
  minify: !options.watch,
  dts: true,
  esbuildPlugins: [vanillaExtractPlugin()],
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
  clean: !options.watch,
}));
