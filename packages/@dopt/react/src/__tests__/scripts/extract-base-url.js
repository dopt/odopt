#!/usr/bin/env node

const code = require(`${process.argv.slice(2)[0]}`);

process.stdout.write(code.BASE_URL);
