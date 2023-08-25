import { BuildConfig, defineBuildConfig } from 'unbuild';

export function node(options: BuildConfig) {
  return defineBuildConfig({
    entries: ['src/index'],
    clean: false,
    rollup: {
      inlineDependencies: true,
      emitCJS: true,
      esbuild: {
        target: 'ESNext',
        minify: true,
      },
    },
    declaration: true,
    ...options,
  });
}
