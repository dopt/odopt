#! /usr/bin/env node

import fs from 'fs';
import path from 'path';

import { execSync } from 'child_process';
import { getPackagesSync } from '@dopt/wutils';

import { concurrently } from 'concurrently';

const TOPOFTREE = execSync('git rev-parse --show-toplevel').toString().trim();
const packages = getPackagesSync();

type SupportedPackageScripts = 'dev' | 'run' | 'debug';
type Name = `@${string}/${string}`;
type Command = `pnpm --filter ${Name} run ${SupportedPackageScripts}`;

export type CliArg = `${SupportedPackageScripts}:${Name}`;
export type CommaSeparatedCliAargs<S extends CliArg> = `${S}${'' | `,${S}`}`;

export async function please(args: CommaSeparatedCliAargs<CliArg>[]) {
  /*
   * The list of commands we will run concurrently
   */
  const commands: [Name, Command][] = [];

  args.forEach((arg) => {
    const [packageScript, packageList] = arg.split(':');
    const packageArgs = packageList.split(',') as Name[];

    packageArgs.forEach((pkg) => {
      const match = packages.find(({ name }) => name === pkg);

      if (!match) {
        throw new Error(
          `UNKNOWN_PACKAGE: cannot locate package "${pkg}" in monorepo.`
        );
      }

      const packageRoot = `${TOPOFTREE}/${match.location}`;

      const { scripts = {} } = JSON.parse(
        fs.readFileSync(path.join(packageRoot, 'package.json'), {
          encoding: 'utf8',
        })
      );

      switch (packageScript) {
        case 'run':
          if (!scripts.run) {
            throw new Error(
              `MISSING_PACKAGE_SCRIPT: "${pkg}" has no script "run".`
            );
          }
          break;
        case 'dev':
          if (!scripts.dev) {
            throw new Error(
              `MISSING_PACKAGE_SCRIPT: "${pkg}" has no script "dev".`
            );
          }
          break;
        case 'debug':
          if (!scripts.debug) {
            throw new Error(
              `MISSING_PACKAGE_SCRIPT: "${pkg}" has no script "debug".`
            );
          }
          break;
      }
    });

    switch (packageScript) {
      case 'run':
        packageArgs.forEach((pkg) => {
          commands.push([
            `${pkg}:${packageScript}`,
            `pnpm --filter ${pkg} run run`,
          ]);
        });
        break;
      case 'dev':
        packageArgs.forEach((pkg) => {
          commands.push([
            `${pkg}:${packageScript}`,
            `pnpm --filter ${pkg} run dev`,
          ]);
        });
        break;
      case 'debug':
        packageArgs.forEach((pkg) => {
          commands.push([
            `${pkg}:${packageScript}`,
            `pnpm --filter ${pkg} run debug`,
          ]);
        });
        break;
    }
  });

  const { result, commands: spawned } = concurrently(
    commands.map(([name, command]) => ({ command, name })),
    {
      cwd: TOPOFTREE,
    }
  );

  //@ts-ignore
  spawned.map(({ stdout, stderr }) => {
    //@ts-ignore
    stdout.subscribe((data) => process.stdout.write(data.toString()));
    //@ts-ignore
    stderr.subscribe((data) => process.stderr.write(data.toString()));
  });

  result.then(
    () => process.exit(0),
    () => process.exit(1)
  );
}
