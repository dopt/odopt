#! /usr/bin/env node

import { please } from '.';

please(`please ${process.argv.slice(2).join(' ')}`);
