import * as parser from './parser';

export function parse(input: string): [string, string[]][] {
  let parsed;

  try {
    parsed = parser.parse(input);
  } catch (e) {
    console.log('No valid (read parseable) arguments to please found');
    process.exit(1);
  }

  const commands = parsed.children[0].children;
  //@ts-ignore
  return commands.reduce((result, command) => {
    return [
      ...result,
      [command.value, command.children.children.map((c: any) => c.value)],
    ];
  }, []);
}

const FLAG_PARSER = /(?:\s+)(-(-)?\w+)(?:\s*)/;
export function help(args: string) {
  let input = args;

  const help: string[] = [];

  while (input) {
    const matched = input.match(FLAG_PARSER) || [];

    const [match, flag] = matched;

    if (!match) {
      break;
    }

    help.push(flag);

    //@ts-ignore
    input = input.slice(matched.index + match.length - 1);
  }

  return help;
}
