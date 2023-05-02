#!/usr/bin/env node

import path from 'node:path';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';

const args = process.argv.slice(2);

async function init() {
  const filePath = path.resolve('./src/main.tsx');
  const file = readFileSync(filePath, { encoding: 'utf8' });
  const [BLOCKS_API_KEY, USER_ID, FLOW_ID] = args;

  let newFile = file;

  if (BLOCKS_API_KEY) {
    newFile = newFile.replace(/\$BLOCKS_API_KEY/g, BLOCKS_API_KEY);
  }

  if (USER_ID) {
    newFile = newFile.replace(/\$USER_ID/g, USER_ID);
  }

  if (FLOW_ID) {
    newFile = newFile.replace(/\$FLOW_ID/g, FLOW_ID);
  }

  writeFileSync(filePath, newFile, { encoding: 'utf8' });

  rmSync('./init.js');
}

init().catch((e) => {
  console.error(e);
});
