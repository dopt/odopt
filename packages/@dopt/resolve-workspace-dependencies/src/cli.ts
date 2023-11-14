#! /usr/bin/env node

import { defineCommand, runMain } from 'citty';

import { resolveWorkspaceDependencies } from '.';

import { name, version, description } from '../package.json';

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  args: {
    package: {
      alias: 'p',
      type: 'string',
      description: 'Target package for workspace dependency resolution',
      required: true,
    },
  },
  async run({ args }) {
    try {
      await resolveWorkspaceDependencies(args.package);
    } catch (error) {
      console.error(`Error resolving dependecies for package ${args.package}`);
    }
  },
});

runMain(main);
