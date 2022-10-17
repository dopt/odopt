import { findWorkspacePackages, Project } from '@pnpm/find-workspace-packages';
import { findWorkspaceDir } from '@pnpm/find-workspace-dir';

import { TARGET_EXAMPLE_PACKAGE_SCRIPTS } from './const';

export async function findWorkspaceRoot() {
  return await findWorkspaceDir(process.cwd());
}

export async function getPackages() {
  const workspaceDir = await findWorkspaceRoot();
  if (workspaceDir == undefined) {
    throw new Error('Unable to locate pnpm workspace root');
  }
  const workspacePacakges = await findWorkspacePackages(
    (await findWorkspaceDir(process.cwd())) || ''
  );

  return workspacePacakges.slice(1);
}

export function getNRandomPackages(packages: Project[], n: number): Project[] {
  return [...packages].sort(() => 0.5 - Math.random()).slice(0, n);
}

export function filterPackagsByPackageScript(
  packages: Project[],
  packageScript: string
) {
  return packages.filter((pkg) => {
    const scripts = pkg.manifest.scripts || {};

    if (scripts[packageScript]) {
      return true;
    }
    return false;
  });
}

export function groupByPackageScripts(packages: Project[]) {
  return packages.reduce<Record<string, number>>((rollup, pkg) => {
    const scripts = pkg.manifest.scripts || {};

    Object.keys(scripts).forEach((script) => {
      if (!rollup[script]) {
        rollup[script] = 1;
      } else {
        rollup[script] = rollup[script] + 1;
      }
    });

    return rollup;
  }, {});
}

export function collectMonorepoContextualExamples(packages: Project[]) {
  const packagesGroupedByScriptName = groupByPackageScripts(packages);

  const scriptNames = Object.entries(packagesGroupedByScriptName).sort(
    (a, b) => b[1] - a[1]
  );

  const examplePackages = TARGET_EXAMPLE_PACKAGE_SCRIPTS.reduce<
    Record<string, Project[]>
  >((examples, targetPackageScript) => {
    const hasTargeScript = scriptNames.find(
      ([name]) => name === targetPackageScript
    );
    const hasGreaterThanTwo =
      packagesGroupedByScriptName[targetPackageScript] >= 2;

    if (!hasTargeScript || !hasGreaterThanTwo) {
      return examples;
    }

    examples[targetPackageScript] = getNRandomPackages(
      filterPackagsByPackageScript(packages, targetPackageScript),
      2
    );

    return examples;
  }, {});

  if (Object.keys(examplePackages).length >= 2) {
    const examples = Object.keys(examplePackages).slice(0, 2);

    return [
      `${examples[0]}:${examplePackages[examples[0]][0].manifest.name} ${
        examples[1]
      }:${examplePackages[examples[1]][0].manifest.name}`,
      `${examples[0]}:${examplePackages[examples[0]][0].manifest.name} ${
        examples[1]
      }:${examplePackages[examples[1]]
        .map((pkg) => pkg.manifest.name)
        .join(',')}`,
      `${examples[0]}:${examplePackages[examples[0]]
        .map((pkg) => pkg.manifest.name)
        .join(',')} ${examples[1]}:${examplePackages[examples[1]]
        .map((pkg) => pkg.manifest.name)
        .join(',')}`,
    ];
  }

  return [];
}
