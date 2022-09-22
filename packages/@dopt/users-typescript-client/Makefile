.DEFAULT_GOAL := help

SHELL := /bin/bash

build: generate/users-typescript-client
	pnpm exec tsup src/api.ts --format esm --dts --clean

# TODO: point to manifest package
generate/users-typescript-client: # Generates users-typescript-client
	rm -r spec; \
	rm -r src; \
	mkdir spec && cp ../../../services/@users/service/spec/external/open-api-spec.json spec/; \
	docker run --rm -v "${PWD}:/local" --user=`id -u`:`id -g` \
	  openapitools/openapi-generator-cli:v6.1.0 generate -i /local/spec/open-api-spec.json -g typescript-axios -o /local/src 
