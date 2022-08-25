import fs from 'fs';
import path from 'path';

import { getPackagesSync } from '@dopt/wutils';
import { TOPOFTREE } from '@dopt/topoftree';

export function getLibraryMap() {
  return getPackagesSync().reduce((memo, { name, location }) => {
    const packageRoot = `${TOPOFTREE}/${location}`;

    const { exports = {} } = JSON.parse(
      fs.readFileSync(path.join(packageRoot, 'package.json'), {
        encoding: 'utf8',
      })
    );

    if (
      exports['./styles'] &&
      fs.existsSync(path.join(packageRoot, exports['./styles']))
    ) {
      memo[name] = `${name}/styles`;
    }
    return memo;
  }, {} as Record<string, string>);
}

export function getImports({
  importExpression,
  stylePath,
}: {
  importExpression: string;
  stylePath: string;
}) {
  return [`import "${stylePath}";`, importExpression].join('\n');
}
