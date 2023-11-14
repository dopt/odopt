import { getPackages } from '@dopt/wutils';

const packages = await getPackages();

const DOPT_WORKSPACE_PROTOCOL = 'workspace:*';

const doptPackages = new Map(packages.map((pkg) => [pkg.manifest.name, pkg]));

export async function resolveWorkspaceDependencies(packageName: string) {
  const errors = [];

  if (!doptPackages.has(packageName)) {
    throw new Error(
      `The resolveWorkspaceDependencies function  was called with ${packageName}, which does not exist in the monorepo.`
    );
  }

  const targetPackage = doptPackages.get(packageName);

  if (!targetPackage) {
    throw new Error();
  }

  const {
    dependencies = {},
    devDependencies = {},
    peerDependencies = {},
  } = targetPackage.manifest;

  for (const dep in dependencies) {
    if (
      doptPackages.has(dep) &&
      dependencies[dep] === DOPT_WORKSPACE_PROTOCOL
    ) {
      if (doptPackages.get(dep)?.manifest.private) {
        errors.push(
          `Cannot resolve dependencies ${dep} of ${targetPackage.manifest.name} to registry version given that it is private.`
        );
      }
      dependencies[dep] = doptPackages.get(dep)?.manifest.version as string;
    }
  }

  for (const dep in devDependencies) {
    if (
      doptPackages.has(dep) &&
      devDependencies[dep] === DOPT_WORKSPACE_PROTOCOL
    ) {
      if (doptPackages.get(dep)?.manifest.private) {
        errors.push(
          `Cannot resolve devDependencies ${dep} of ${targetPackage.manifest.name} to registry version given that it is private.`
        );
      }
      devDependencies[dep] = doptPackages.get(dep)?.manifest.version as string;
    }
  }

  for (const dep in peerDependencies) {
    if (
      doptPackages.has(dep) &&
      peerDependencies[dep] === DOPT_WORKSPACE_PROTOCOL
    ) {
      if (doptPackages.get(dep)?.manifest.private) {
        errors.push(
          `Cannot resolve peerDependencies ${dep} of ${targetPackage.manifest.name} to registry version given that it is private.`
        );
      }
      peerDependencies[dep] = doptPackages.get(dep)?.manifest.version as string;
    }
  }

  if (errors.length > 0) {
    errors.forEach((message) => console.error(message));
    process.exit(1);
  }

  try {
    await targetPackage.writeProjectManifest(targetPackage.manifest);
  } catch (e) {
    if (e instanceof Error) {
      errors.push(
        `Error while writing the package manifest w/ resolve dependencies ${e.message}`
      );
    }
  }
}
