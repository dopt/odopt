const colors = [
  'green.bold',
  'yellow.bold',
  'blue.bold',
  'magenta.bold',
  'cyan.bold',
  'white.bold',
];

export function getNColors(n: number) {
  if (n < colors.length) {
    return colors.slice(0, n);
  }
  return Array.from({ length: colors.length }, () => colors)
    .flat()
    .slice(0, n);
}
