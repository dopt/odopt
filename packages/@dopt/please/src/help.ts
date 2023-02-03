import chalk from 'chalk';

export function helpText(examples?: string[]): string {
  let example1 = 'dev:@scope/package-1 start:@scope/package-2';
  let example2 = 'dev:@scope/package-1 start:@scope/package-2,@scope/package-3';
  let example3 =
    'dev:@scope/package-1,@scope/package-3 start:@scope/package-2,@scope/package-3';

  if (examples && examples.length >= 3) {
    [example1, example2, example3] = examples;
  }

  const [arg1, arg2] = example1.split(' ');

  return `
  ${chalk.bold.white('A CLI for developing in monorepos - not building them')}

  ${chalk.bold.white.underline('Usage:\n')}
    ${chalk.bold.gray('$')}${chalk.bold.white(` please ${example1}\n`)}
    ${chalk.bold.gray('$')}${chalk.bold.white(` please ${example2}\n`)}
    ${chalk.bold.gray('$')}${chalk.bold.white(` please ${example3}\n`)}
  ${chalk.bold.white.underline('Advanced Usage:\n')}
    ${chalk.bold.gray('$')}${chalk.bold.white(` please dev:{@scope/*}\n`)}
    ${chalk.bold.gray('$')}${chalk.bold.white(
    ` please dev:{@scope/*} run:package-1,package-2\n`
  )}

  ${chalk.bold.white.underline('Details:\n')}
  ${chalk.bold.white(
    `Let's refer to to the yellow text below

    ${chalk.bold.gray('$')}${chalk.white(` please ${chalk.yellow(arg2)}`)}

  as an "argument" to please.\n`
  )}
  ${chalk.bold.white(
    `Arguments to please take the following form\n
    ${chalk.bold.magenta('LHS')}${chalk.bold.gray(':')}${chalk.bold.magenta(
      'RHS'
    )}
  `
  )}
  ${chalk.bold.white(
    `where the ${chalk.bold.magenta(
      'LHS'
    )} is a package script and the ${chalk.bold.magenta(
      'RHS'
    )} is a comma-separated list  of packages
  in your monorepo to run the LHS package script in. Packages on the RHS can
  contain wildcards, but must be escaped with brackets if so. We use micromatch
  (https://github.com/micromatch/micromatch) for matching. Refer to their documentation
  for questions on matching behavior and available functionality.
  `
  )}
  `;
}
