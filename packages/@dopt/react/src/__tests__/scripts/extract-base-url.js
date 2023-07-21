#!/usr/bin/env node
const fs = require('fs');

const code = fs.readFileSync(`${process.argv.slice(2)[0]}`).toString();

const URL_PREFIX = code.match(/URL_PREFIX\s*=\s*"(.+)"/)[1] || '';
const SOCKET_PREFIX = code.match(/SOCKET_PREFIX\s*=\s*"(.+)"/)[1] || '';

process.stdout.write(`${URL_PREFIX} ${SOCKET_PREFIX}`);
