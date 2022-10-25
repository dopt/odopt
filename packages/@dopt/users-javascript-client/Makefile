.DEFAULT_GOAL := help

SHELL := /bin/bash

GENERATOR_VERSION=6.1.0
GENERATOR_JAR=openapi-generator-cli-${GENERATOR_VERSION}.jar

EXTERNAL_SPEC_LOCATION=../api-manifest/spec/users-service/open-api-spec.json

build-java: generate/users-javascript-client-java
	rollup --config rollup.config.ts --configPlugin typescript; rm -rf ./dist/types

build-docker: generate/users-javascript-client-docker
	rollup --config rollup.config.ts --configPlugin typescript; rm -rf ./dist/types

generate/users-javascript-client-java:
	rm -rf spec; \
	rm -rf src; \
	mkdir spec && cp $(EXTERNAL_SPEC_LOCATION) spec/; \
	wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/$(GENERATOR_VERSION)/$(GENERATOR_JAR) -O $(GENERATOR_JAR); \
	exec java -jar $(GENERATOR_JAR) generate -i spec/open-api-spec.json -g typescript-axios -o src \
		--ignore-file-override=/local/.openapi-generator-ignore; \
	rm -r openapi-generator-cli.jar;

generate/users-javascript-client-docker:
	rm -rf spec; \
	rm -rf src; \
	mkdir spec && cp $(EXTERNAL_SPEC_LOCATION) spec/; \
	docker run --rm -v "${PWD}:/local" --user=`id -u`:`id -g` \
		openapitools/openapi-generator-cli:v$(GENERATOR_VERSION) generate -i /local/spec/open-api-spec.json -g typescript-axios -o /local/src \
		--ignore-file-override=/local/.openapi-generator-ignore;
