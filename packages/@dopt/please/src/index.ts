#! /usr/bin/env node

import {
  getPackages,
  collectMonorepoContextualExamples,
  findWorkspaceRoot,
} from './pnpm-workspace-utils';

import { HELP_FLAGS } from './const';

import { helpText } from './help-text';

import { parse } from './args-parser';

import { findMatchingPackages } from './find-matching-packages';
import { packageNameToColor } from './pnpm-workspace-utils';

import concurrently from 'concurrently';

type Name = `${string}`;
type Command = `pnpm --filter ${Name} run ${string}`;

export async function please(args: string[]) {
  const packages = await getPackages();
  const workspaceRoot = await findWorkspaceRoot();

  if (args.some((arg) => HELP_FLAGS.includes(arg))) {
    console.log(helpText(collectMonorepoContextualExamples(packages)));
    process.exit(0);
  }
  const commands: [Name, Command][] = [];

  const parsedArgs = parse(args);

  parsedArgs.forEach(([packageScript, targetPackages]) => {
    const matchingPackages = findMatchingPackages(packages, targetPackages);

    matchingPackages.forEach((matchingPackage) => {
      const { scripts = {}, name: packageName } = matchingPackage.manifest;

      if (!scripts[packageScript]) {
        throw new Error(
          `MISSING_PACKAGE_SCRIPT: "${packageName}" has no ${packageScript} script`
        );
      }

      commands.push([
        `${packageName}:${packageScript}`,
        `pnpm --filter ${packageName} run ${packageScript}`,
      ]);
    });
  });

  const { length } = commands
    .map((c) => c[0])
    .reduce((a, b) => (a.length > b.length ? a : b));

  const { result } = concurrently(
    commands.map(([name, command]) => ({
      command,
      name: name.padEnd(length),
    })),
    {
      cwd: workspaceRoot,
      prefix: '{name}',
      prefixColors: commands.map(([name]) =>
        packageNameToColor(name.split(':')[0])
      ),
    }
  );

  result.then(
    () => process.exit(0),
    () => process.exit(1)
  );
}
