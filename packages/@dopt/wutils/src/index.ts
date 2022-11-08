import { execSync } from 'child_process';
//@ts-ignore
import { findNearestPackageJsonSync } from 'find-nearest-package-json';

import { findWorkspacePackages } from '@pnpm/find-workspace-packages';
import { findWorkspaceDir } from '@pnpm/find-workspace-dir';

import { TOPOFTREE } from '@dopt/topoftree';

async function findWorkspaceRoot() {
  return await findWorkspaceDir(process.cwd());
}

async function getPackages() {
  const workspaceDir = await findWorkspaceRoot();
  if (workspaceDir == undefined) {
    throw new Error('Unable to locate pnpm workspace root');
  }
  const workspacePacakges = await findWorkspacePackages(
    (await findWorkspaceDir(process.cwd())) || ''
  );

  return workspacePacakges.slice(1);
}

async function getPackageNames() {
  const packages = await getPackages();
  return packages.map(({ manifest }) => manifest.name);
}

async function getPackageLocations() {
  const packages = await getPackages();
  return packages.map(({ dir }) => dir.replace(`${TOPOFTREE}/`, ''));
}

type PackageDef = {
  name: string;
  version: string;
  location: string;
  path: string;
  private: boolean;
};
function getPackagesSync(): Omit<PackageDef, 'path'>[] {
  return JSON.parse(execSync('pnpm ls -r --depth -1 --json').toString())
    .map((pkg: Omit<PackageDef, 'location'>) => {
      const { path, ...rest } = pkg;

      const location = path.replace(`${TOPOFTREE}/`, '');

      return { location, ...rest };
    })
    .slice(1);
}

function getPackageNamesSync() {
  return getPackagesSync().map(({ name }) => name);
}

function getPackageLocationsSync() {
  return getPackagesSync().map(({ location }) => location);
}

function getAffectedPackagesForStagedFiles() {
  return execSync(
    "git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g'"
  )
    .toString()
    .trim()
    .split('\n')
    .filter((f) => f)
    .map(
      (file) => findNearestPackageJsonSync(`${TOPOFTREE}/${file}`).data.name
    );
}

function getAffectedPackagesToStagedFilesMapping() {
  return execSync(
    "git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g'"
  )
    .toString()
    .trim()
    .split('\n')
    .filter((f) => f)
    .reduce((memo, file) => {
      const nearestPackageName: string =
        findNearestPackageJsonSync(file).data.name;
      if (!memo[nearestPackageName]) {
        memo[nearestPackageName] = [];
      }
      memo[nearestPackageName].push(file);
      return memo;
    }, {} as Record<string, string[]>);
}

const GLOBAL_SCOPES = ['all', 'app', 'service', 'package', 'deps', 'dopt'];

export {
  findWorkspaceRoot,
  getAffectedPackagesForStagedFiles,
  getAffectedPackagesToStagedFilesMapping,
  getPackages,
  getPackageNames,
  getPackageLocations,
  getPackagesSync,
  getPackageNamesSync,
  getPackageLocationsSync,
  GLOBAL_SCOPES,
};
