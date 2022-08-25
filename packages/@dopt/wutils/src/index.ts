import { execSync } from 'child_process';
//@ts-ignore
import { findNearestPackageJsonSync } from 'find-nearest-package-json';

import findWorkspacePackages from '@pnpm/find-workspace-packages';
import findWorkspaceDir from '@pnpm/find-workspace-dir';

import { TOPOFTREE } from '@dopt/topoftree';

async function findWorkspaceRoot() {
  return await findWorkspaceDir(process.cwd());
}

async function getWorkspaces() {
  const workspaceDir = await findWorkspaceRoot();
  if (workspaceDir == undefined) {
    throw new Error('Unable to locate pnpm workspace root');
  }
  const workspacePacakges = await findWorkspacePackages(
    (await findWorkspaceDir(process.cwd())) || ''
  );

  return workspacePacakges.slice(1);
}

async function getWorkspaceNames() {
  const workspaces = await getWorkspaces();
  return workspaces.map(({ manifest }) => manifest.name);
}

async function getWorkspaceLocations() {
  const workspaces = await getWorkspaces();
  return workspaces.map(({ dir }) => dir.replace(`${TOPOFTREE}/`, ''));
}

type PackageDef = {
  name: string;
  version: string;
  location: string;
  path: string;
  private: boolean;
};
function getWorkspacesSync(): Omit<PackageDef, 'path'>[] {
  return JSON.parse(execSync('pnpm ls -r --depth -1 --json').toString())
    .map((pkg: Omit<PackageDef, 'location'>) => {
      const { path, ...rest } = pkg;

      const location = path.replace(`${TOPOFTREE}/`, '');

      return { location, ...rest };
    })
    .slice(1);
}

function getWorkspaceNamesSync() {
  return getWorkspacesSync().map(({ name }) => name);
}

function getWorkspaceLocationsSync() {
  return getWorkspacesSync().map(({ location }) => location);
}

function getAffectedWorkspacesForStagedFiles() {
  return execSync(
    "git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g'"
  )
    .toString()
    .trim()
    .split('\n')
    .filter((f) => f)
    .map((file) => findNearestPackageJsonSync(file).data.name);
}

function getAffectedWorkspacesToStagedFilesMapping() {
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

const GLOBAL_SCOPES = ['all', 'app', 'service', 'package', 'deps'];

export {
  getAffectedWorkspacesForStagedFiles,
  getAffectedWorkspacesToStagedFilesMapping,
  getWorkspaces,
  getWorkspaceNames,
  getWorkspaceLocations,
  getWorkspacesSync,
  getWorkspaceNamesSync,
  getWorkspaceLocationsSync,
  GLOBAL_SCOPES,
};
