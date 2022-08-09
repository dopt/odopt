import util from 'util';
import { exec as e, execSync } from 'child_process';
//@ts-ignore
import { findNearestPackageJsonSync } from 'find-nearest-package-json';
const exec = util.promisify(e);

async function getWorkspaces() {
  const { stdout } = await exec('yarn workspaces list --json');
  const blobs: string[] = stdout.trim().split('\n');
  blobs.shift(); // remove top-level workspace
  return blobs.map((str) => JSON.parse(str).location);
}

async function getWorkspaceNames() {
  const workspaces = await getWorkspaces();
  return workspaces.map(({ name }) => name);
}

async function getWorkspaceLocations() {
  const workspaces = await getWorkspaces();
  return workspaces.map(({ location }) => location);
}

function getWorkspacesSync() {
  const result = execSync('yarn workspaces list --json');
  const blobs: string[] = result.toString().trim().split('\n');
  return blobs.map((str) => JSON.parse(str));
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
