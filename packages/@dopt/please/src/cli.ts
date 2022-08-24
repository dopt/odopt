#! /usr/bin/env node

import { please, CommaSeparatedCliAargs, CliArg } from '.';

const args = process.argv.slice(2) as CommaSeparatedCliAargs<CliArg>[];

please([...args]);
