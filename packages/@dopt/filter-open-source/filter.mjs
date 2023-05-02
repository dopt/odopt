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

console.log('\nThe following packages were tagged as "openSource":\n');
console.log(openPackages.map(({ name }) => `  ${name}`).join('\n'));

console.log('\nCalculating dependent packages w/ the following command:\n');
console.log(
  `pnpm ls -r --depth -1 ${openPackages
    .map(({ name }) => ` --filter ${name}... `)
    .join('')} --json`
);

const dependentPackages = JSON.parse(
  execSync(
    `pnpm ls -r --depth -1 ${openPackages
      .map(({ name }) => ` --filter ${name}... `)
      .join('')} --json`
  ).toString()
).reduce((acc, pkg) => {
  acc.add(pkg.name);
  return acc;
}, new Set());

console.log('\nFiltering to commits against the following packages:\n');
dependentPackages.forEach((pkg) => console.log(pkg));

console.log('\nThe following command will be run to filter commits:\n');
console.log(
  `  git filter-repo \\\n${packages
    .filter(({ name }) => dependentPackages.has(name))
    .map(({ location }) => `    --path ${location}`)
    .join(' \\\n')}`
);

execSync(
  `git filter-repo --force ${packages
    .filter(({ name }) => dependentPackages.has(name))
    .map(({ location }) => `--path ${location}`)
    .join(' ')}`
).toString();
