import minimist from 'minimist';
import path from 'node:path';
import { existsSync, mkdirSync, cpSync, renameSync } from 'node:fs';
import { execSync, fork } from 'node:child_process';

const DEFAULT_TEMPLATE = 'react';
const PROJECT_PREFIX = 'dopt-example-';

const args = minimist(process.argv.slice(2));
const pkgUserAgent = process.env.npm_config_user_agent;

export async function init() {
  const template = args.template || DEFAULT_TEMPLATE;
  const templatePath = path.resolve(__dirname, `../templates/${template}`);
  const targetPath = args._[0] || `${PROJECT_PREFIX}${template}`;
  const templateArgs = args.templateArgs ? args.templateArgs.split(',') : [];
  const pkgInfo = pkgFromUserAgent(pkgUserAgent);
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';

  if (!existsSync(templatePath)) {
    console.error(`⛔️ "${template}" template does not exist`);
    return;
  }

  console.log(
    `\n🔨 Creating the Dopt ${template} example project in ${targetPath}...`
  );

  if (!existsSync(targetPath)) {
    mkdirSync(targetPath, { recursive: true });
  } else {
    console.error('\n⛔️ Path already exists');
    return;
  }

  cpSync(templatePath, targetPath, { recursive: true });
  renameSync(`${targetPath}/_package.json`, `${targetPath}/package.json`);

  console.log('\n🚧 Installing dependencies...');

  execSync(`${pkgManager} install`, {
    cwd: targetPath,
    stdio: 'inherit',
  });

  if (existsSync(`${templatePath}/init.js`)) {
    console.log(`\n🧹 Tidying things up...`);
    fork('init.js', templateArgs, { cwd: targetPath });
  }

  console.log('\n✅ All done!');
  console.log('\n🚀 Run the following commands to start the project:');
  console.log(`\n   cd ${targetPath}`);
  console.log(`\n   ${pkgManager} run dev`);
}

function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

init().catch((e) => {
  console.error(e);
});
