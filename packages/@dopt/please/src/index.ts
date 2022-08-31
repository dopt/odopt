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

import { concurrently } from 'concurrently';

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

  const { result, commands: spawned } = concurrently(
    commands.map(([name, command]) => ({ command, name })),
    {
      cwd: workspaceRoot,
    }
  );

  spawned.map(({ stdout, stderr }) => {
    stdout.subscribe((data) => process.stdout.write(data.toString()));
    stderr.subscribe((data) => process.stderr.write(data.toString()));
  });

  result.then(
    () => process.exit(0),
    () => process.exit(1)
  );
}
