import { Octokit } from '@octokit/rest';
import path from 'node:path';

import { readFile } from 'fs/promises';

import { resolveWorkspaceDependencies } from '@dopt/resolve-workspace-dependencies';

import { TOPOFTREE } from '@dopt/topoftree';

import { promisify } from 'node:util';
import { exec as execAsync } from 'node:child_process';
const exec = promisify(execAsync);

import { name, version, repository } from '../package.json';

export async function sync() {
  const octokit = new Octokit({
    auth: process.env.PKG_SYNC_PAT,
  });

  if (!repository || !repository.url) {
    throw new Error(
      'Pacakges using the `sync` CLI need to defined the repository property with a `url` field'
    );
  }

  const match = repository.url.match(/https:\/\/github.com\/(.*)\/(.*).git/);

  if (!match) {
    throw new Error(
      'The repository url field should be an https cloneable url i.e. https://github.com/bobs/burgers.git'
    );
  }

  const [, org, repo] = match;

  const owner = org;

  const repos = await octokit.repos.listForOrg({
    org,
  });

  const targetRepo = repos.data.find(
    (repo) => repo.clone_url === repository.url
  );

  if (!targetRepo) {
    await octokit.repos.createInOrg({ org, name: repo, auto_init: true });
  }

  // Get all the files tracked by git
  const filePaths = (await exec('git ls-files .')).stdout
    .split('\n')
    .filter((f) => f);

  // Resolve workspace dependencies to their current version
  await resolveWorkspaceDependencies(name);

  // ::SPECIAL CASE::
  // Copy the monorepos top-level package.json's
  // packageManager field to ensure consistent builds
  // downstream
  try {
    const { packageManager } = JSON.parse(
      await readFile(path.join(TOPOFTREE, 'package.json'), 'utf8')
    );
    await exec(`pnpm pkg set packageManager=${packageManager}`);
  } catch (e) {
    console.warn(
      "Ran into issues while copying the monorepo's packageManager field",
      e
    );
  }

  const fileBlobs = [];
  for (const filePath of filePaths) {
    try {
      const { data: blob } = await octokit.git.createBlob({
        owner,
        repo,
        content: await readFile(path.resolve(filePath), 'utf8'),
        encoding: 'utf8',
      });
      fileBlobs.push(blob);
    } catch (e) {
      console.log(`Error while creating file blob for file ${filePath}`, e);
    }
  }

  // ::SPECIAL CASE::
  // Include the monorepos .nvmrc to ensure consitent
  // builds in the downstream repo's CI
  try {
    filePaths.push('.nvmrc');
    const { data: nvmrc } = await octokit.git.createBlob({
      owner,
      repo,
      content: await readFile(path.join(TOPOFTREE, '.nvmrc'), 'utf8'),
      encoding: 'utf8',
    });
    fileBlobs.push(nvmrc);
  } catch (e) {
    console.warn("Ran into issues while porting the monorepo's .nvmrc file", e);
  }

  const { data: ref } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/main`,
  });

  const { data: commit } = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: ref.object.sha,
  });

  const { data: tree } = await octokit.git.createTree({
    owner,
    repo,
    tree: fileBlobs.map(({ sha }, index) => ({
      path: filePaths[index],
      mode: `100644`,
      type: `blob`,
      sha,
    })),
    base_tree: commit.tree.sha,
  });

  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: `Release ${version}`,
    tree: tree.sha,
    parents: [ref.object.sha],
  });

  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/main`,
    sha: newCommit.sha,
  });

  await octokit.repos.createRelease({
    owner,
    repo,
    tag_name: `v${version}`,
    target_commitish: newCommit.sha,
  });
}
