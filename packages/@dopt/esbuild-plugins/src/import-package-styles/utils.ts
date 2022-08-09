import fs from 'fs';
import path from 'path';

import { getWorkspacesSync } from '@dopt/wutils';
import { TOPOFTREE } from '@dopt/topoftree';

const workspaces = getWorkspacesSync();

export function getLibraryMap() {
  return workspaces.reduce((memo, { name, location }) => {
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
