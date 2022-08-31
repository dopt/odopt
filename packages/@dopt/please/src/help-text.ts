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
  ${chalk.bold.whiteBright(
    'A CLI for developing in monorepos - not building them'
  )}

  ${chalk.bold.whiteBright('Usage:\n')}
    ${chalk.bold.whiteBright(`> please ${example1}\n`)}
    ${chalk.bold.whiteBright(`> please ${example2}\n`)}
    ${chalk.bold.whiteBright(`> please ${example3}\n`)}

  ${chalk.bold.whiteBright('Details:\n')}
  ${chalk.bold.whiteBright(
    `For the sake of common language, let's refer to ${chalk.bold.green(
      arg1
    )} and
  ${chalk.bold.green(arg2)} from the last Usage example as "arguments"\n`
  )}

  ${chalk.bold.whiteBright(
    `Arguments to please take the following form\n
    ${chalk.bold.magentaBright('LHS')}${chalk.bold.gray(
      ':'
    )}${chalk.bold.magentaBright('RHS')}
  `
  )}
  ${chalk.bold.whiteBright(
    `where the ${chalk.bold.magentaBright(
      'LHS'
    )} is a package script and the ${chalk.bold.magentaBright(
      'RHS'
    )} is a comma-separated list 
  of packages in your monorepo to run the LHS package script in.
  `
  )}
  `;
}
