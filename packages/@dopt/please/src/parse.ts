export function parse(args: string[]): [string, string[]][] {
  return args.map((arg) => {
    const [command, packages] = arg.split(':');
    return [command, [...packages.split(',')]];
  });
}
