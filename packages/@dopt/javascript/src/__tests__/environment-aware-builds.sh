#!/bin/bash

set -e
mkdir -p ./tmp

TEST_FAILURES=0

echo -e "\nTest Case #1: Build SDK w/ NODE_ENV=production"
echo -e "------------------------------------------------"
NODE_ENV=production pnpm exec rollup --config rollup.test.config.ts --configPlugin typescript
rm -rf ./tmp/types
OUTPUT=$(node ./src/__tests__/scripts/extract-base-url.js ./tmp/index.cjs.js)

if [ $OUTPUT != "https://blocks.dopt.com" ]; then
  echo -e "Expected https://blocks.dopt.com, got $OUTPUT"
  TEST_FAILURES=$((TEST_FAILURES + 1))
else
  echo -e "Passed #1"
fi
echo -e "------------------------------------------------"

rm -rf ./tmp
mkdir -p ./tmp

echo -e "\nTest Case #2: BUILD SDK w/ NODE_ENV=development"
echo -e "-------------------------------------------------"
NODE_ENV=development pnpm exec rollup --config rollup.test.config.ts --configPlugin typescript
rm -rf ./tmp/types
OUTPUT=$(node ./src/__tests__/scripts/extract-base-url.js ./tmp/index.cjs.js)

if [ $OUTPUT != "http://localhost:7071" ]; then
  echo -e "Expected http://localhost:7071, got $OUTPUT"
  TEST_FAILURES=$((TEST_FAILURES + 1))
else
  echo -e "Passed #2"
fi
echo -e "-------------------------------------------------"

rm -rf ./tmp

echo -e "\nTest Results:"

echo "$TEST_FAILURES of 2 tests failed"
echo "$((2 - $TEST_FAILURES)) of 2 tests passed"

if [ $TEST_FAILURES -gt 0 ]; then
  exit 1
fi
exit 0
