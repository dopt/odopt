import fs from 'fs';
import path from 'path';

import { execSync } from 'child_process';
import { TOPOFTREE } from '@dopt/topoftree';

import { getPackageLocationsSync, getPackagesSync } from '@dopt/wutils';

const packages = getPackagesSync();

const openPackages = getPackageLocationsSync()
  .map((workspacePath) =>
    JSON.parse(
      fs.readFileSync(
        path.resolve(TOPOFTREE, `${workspacePath}/package.json`),
        {
          encoding: 'utf8',
        }
      )
    )
  )
  .filter((pkg) => pkg.openSource);

const openPackageNames = new Set(openPackages.map(({ name }) => name));

console.log('\nFollowing packages were tagged as "openSource", filtering to commits against them:\n');
openPackageNames.forEach((pkg) => console.log(pkg));

console.log('\nFollowing command will be run to filter commits:\n');
console.log(
  `  git filter-repo \\\n${packages
    .filter(({ name }) => openPackageNames.has(name))
    .map(({ location }) => `    --path ${location}`)
    .join(' \\\n')}`
);

execSync(
  `git filter-repo --force ${packages
    .filter(({ name }) => openPackageNames.has(name))
    .map(({ location }) => `--path ${location}`)
    .join(' ')}`
).toString();
