#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import files from './manifest.json' assert { type: 'json' };
import fetch from 'node-fetch';
Object.keys(files).forEach((key) => {
  const dir = './spec/' + key;
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  const fileUrl = `${files[key]}?cache-buster=${new Date().valueOf()}`;
  console.log('Fetching from', fileUrl);
  fetch(fileUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => {
      writeFileSync(
        dir + '/open-api-spec.json',
        JSON.stringify(response, null, 2)
      );
    });
});
