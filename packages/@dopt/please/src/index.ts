#! /usr/bin/env node

import {
  getPackages,
  collectMonorepoContextualExamples,
  findWorkspaceRoot,
} from './pnpm';

import { HELP_FLAGS } from './const';

import { getNColors } from './colors';

import { helpText } from './help';

import { help, parse } from './parse';

import { findMatchingPackages } from './match';

import concurrently from 'concurrently';

type Name = `${string}`;
type Command = `pnpm --filter ${Name} run ${string}`;

export async function please(args: string) {
  const packages = await getPackages();
  const workspaceRoot = await findWorkspaceRoot();

  const helpArgs = help(args);

  if (helpArgs.some((arg) => HELP_FLAGS.includes(arg))) {
    console.log(helpText(collectMonorepoContextualExamples(packages)));
    process.exit(0);
  }

  const commands: [Name, Command][] = [];

  const cliArgs = parse(args);

  cliArgs.forEach(([packageScript, targetPackages]) => {
    findMatchingPackages(packages, targetPackages).forEach(
      (matchingPackage) => {
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
      }
    );
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
      prefixColors: getNColors(commands.length),
    }
  );

  result.then(
    () => process.exit(0),
    () => process.exit(1)
  );
}

import { IParseOptions, parse as peggyParse } from './parser';

export type { IParseOptions } from './parser';
export { SyntaxError } from './parser';

export type ParseFunction = (
  input: string,
  options?: IParseOptions
) => [object | null, Error | null];

export interface AstNode {
  type?: AstType;
  value: string | number;
  ast?: boolean;
  children?: AstNode[] | null;
}

export enum AstType {
  ARGUMENT = 'argument',
  ARGUMENT_LIST = 'argumentList',
  SYM = 'symbol',
  PACKAGE_LITERAL = 'packageLiteral',
  PACKAGE_GLOB = 'packageGlob',
  WHITESPACE = 'whitespace',
}

export function _parse(
  input: string,
  options?: IParseOptions
  //@ts-ignore
): [AstNode | null, Error | null] {
  try {
    const ast: AstNode = peggyParse(input, options);
    if (ast) return [ast, null];
  } catch (err) {
    //@ts-ignore
    return [null, err];
  }
}
