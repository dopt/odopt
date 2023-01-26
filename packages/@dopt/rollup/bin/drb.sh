#!/bin/bash


pnpm exec rollup --config rollup.config.ts --configPlugin typescript; rm -rf ./dist/types;


exit 0;
