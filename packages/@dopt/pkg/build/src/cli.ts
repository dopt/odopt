#! /usr/bin/env node

import { defineCommand, runMain } from 'citty';

import consola from 'consola';
import { name, version, description } from '../package.json';

import { build } from 'unbuild';

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  args: {
    watch: {
      type: 'positional',
      description: 'Whether to recompile the source on change',
      required: false,
    },
  },
  async run(/*{ args }*/) {
    const rootDir = process.cwd();
    await build(rootDir, false, {}).catch((error) => {
      consola.error(`Error building ${rootDir}: ${error}`);
      throw error;
    });
  },
});

runMain(main);
