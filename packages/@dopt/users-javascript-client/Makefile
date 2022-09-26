.DEFAULT_GOAL := help

SHELL := /bin/bash

build: generate/users-javascript-client
	pnpm rollup -c
# pnpm exec tsup client/src/index.js --format esm --dts --clean

# TODO: point to manifest package
generate/users-javascript-client: # Generates users-javascript-client
	rm -r spec; \
	rm -r src; \
	mkdir spec && cp ../../../services/@users/service/spec/external/open-api-spec.json spec/; \
	docker run --rm -v "${PWD}:/local" --user=`id -u`:`id -g` \
	  openapitools/openapi-generator-cli:v6.1.0 generate -i /local/spec/open-api-spec.json -g javascript -o /local/src \
    --ignore-file-override=/local/.openapi-generator-ignore \
		--additional-properties=sourceFolder=/
