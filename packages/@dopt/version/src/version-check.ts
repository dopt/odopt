import { execSync } from 'child_process';
import { ProjectManifest } from '@pnpm/types';

import { TOPOFTREE } from '@dopt/topoftree';
import {
  getAffectedPackagesForStagedFiles,
  getPackages,
  findWorkspaceRoot,
} from '@dopt/wutils';

function packageVersionUpdated(packageName: string) {
  const versionRegex = new RegExp(
    /\"version\": \"(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?\"/
  );
  return (
    execSync(
      `git diff origin/main --cached --unified=0 ${TOPOFTREE}/packages/${packageName}/package.json | sed 's| | |g'`
    )
      .toString()
      .trim()
      .split('\n')
      .filter((line) => line.match(versionRegex)).length >= 1
  );
}

export async function lint() {
  const doptPackages = await getPackages();

  const packageDictionary = doptPackages.reduce((acc, { manifest }) => {
    if (manifest.name) {
      acc[manifest.name] = manifest;
    }
    return acc;
  }, {} as Record<string, ProjectManifest>);

  const publicPackages = doptPackages.filter(
    ({ manifest }) => !manifest.private
  );

  const serviceManifestRegex = new RegExp(/^@dopt\/(.*)-api-manifest$/);
  const publicServicePackages = publicPackages
    .filter(({ manifest }) => manifest.name?.match(serviceManifestRegex))
    .reduce((acc, { manifest }) => {
      if (manifest.name) {
        const rxExec = serviceManifestRegex.exec(manifest.name);
        if (rxExec && rxExec[1]) {
          const serviceName = rxExec[1];
          const serviceClientRegex = new RegExp(
            `^@dopt\/${serviceName}-(.*)-client$`
          );
          const serviceClients = publicPackages
            .filter(({ manifest }) => manifest.name?.match(serviceClientRegex))
            .map(({ manifest }) => (manifest.name ? manifest.name : ''));
          acc[`@${serviceName}/service`] = serviceClients;
        }
      }
      return acc;
    }, {} as Record<string, string[]>);

  const root = await findWorkspaceRoot();
  const dependentPackages = JSON.parse(
    execSync(
      `pnpm exec turbo run build ${publicPackages
        .map(({ manifest }) => `--filter=${manifest.name}`)
        .join(' ')} --dry=json`,
      { cwd: root }
    ).toString()
  ).tasks.map((t: Record<string, string>) => t.package);

  const privateDependentPackages: string[] = [];
  for (const dependentPackage of dependentPackages) {
    if (packageDictionary[dependentPackage].private) {
      privateDependentPackages.push(dependentPackage);
    }
  }

  const warnings: string[] = [];

  if (privateDependentPackages.length > 0) {
    warnings.push(
      `\nThe following packages should be set to { "private": false }\n${privateDependentPackages
        .map((pkg: string) => `\t${pkg}`)
        .join('\n')}`
    );
  }

  const stagedPackages = getAffectedPackagesForStagedFiles()
    .filter((v, i, a) => a.indexOf(v) === i)
    .filter((pkg: string) => pkg !== 'dopt');

  const missingVersionBumpPackages = stagedPackages
    .filter((pkg: string) => !packageDictionary[pkg].private)
    .filter((name: string) => !packageVersionUpdated(name));
  if (missingVersionBumpPackages.length > 0) {
    warnings.push(
      `\nThe following packages need a version bump\n${missingVersionBumpPackages
        .map((pkg: string) => `\t${pkg}`)
        .join('\n')}`
    );
  }

  const stagedServices = stagedPackages.filter(
    (pkg: string) => publicServicePackages[pkg]
  );
  if (stagedServices.length > 0) {
    warnings.push(
      `\nThe following services and dependent clients need to be rebuilt and version bumped\n${stagedServices.map(
        (pkg: string) => {
          const deps = publicServicePackages[pkg];
          return `\t${pkg}${deps.map((dep: string) => `\n\t\t${dep}`)}`;
        }
      )}`
    );
  }

  if (warnings.length > 0) {
    console.warn(
      '\x1b[33m%s\x1b[0m',
      'WARNING: pnpm --filter=@dopt/version versioncheck\n',
      warnings.join('')
    );
  }
}

lint();
