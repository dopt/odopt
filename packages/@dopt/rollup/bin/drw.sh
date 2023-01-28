#!/bin/bash

pnpm exec rollup -w --config rollup.config.ts --configPlugin typescript --no-watch.clearScreen

exit 0;
