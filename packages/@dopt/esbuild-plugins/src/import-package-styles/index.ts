import fs from 'fs';
import { extname } from 'path';

import { Loader, Plugin } from 'esbuild';

import { transform } from './transformer';

export const importPackageStyles = (): Plugin => {
  return {
    name: '@dopt/import-package-styles',
    setup(build) {
      build.onLoad(
        { filter: /^(?:.*)\/[^\.](?:[^\/]+)[t|j]sx?$/ },
        async ({ path, namespace }) => {
          let fileContents = '';
          if (namespace === 'file') {
            fileContents = fs
              .readFileSync(path, {
                encoding: 'utf8',
              })
              .toString();
          }

          return {
            contents: transform(fileContents),
            loader: extname(path).replace('.', '') as Loader,
          };
        }
      );
    },
  };
};
