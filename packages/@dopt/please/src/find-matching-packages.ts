import { Project } from '@pnpm/find-workspace-packages';
import micromatch from 'micromatch';
export function findMatchingPackages(
  packages: Project[],
  targetPackages: string[]
) {
  const packageNames = packages.map(({ manifest }) => manifest.name || '');

  let matches: string[] = [];

  targetPackages.forEach((targetPackage) => {
    if (targetPackage.startsWith('{') && targetPackage.endsWith('}')) {
      matches = [
        ...matches,
        ...micromatch(packageNames, [targetPackage.slice(1, -1)]),
      ];
    } else {
      const match = packageNames.find((name) => name === targetPackage);

      if (!match) {
        throw new Error(
          `UNKNOWN_PACKAGE: cannot locate package "${targetPackage}" in monorepo.`
        );
      }

      matches.push(match);
    }
  });
  //@ts-ignore
  const uniqueMatches = [...new Set(matches)];

  return packages.filter(
    (pkg) => uniqueMatches.indexOf(pkg.manifest.name) > -1
  );
}
