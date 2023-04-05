.DEFAULT_GOAL := help

SHELL := /bin/bash

GENERATOR_VERSION=6.1.0
GENERATOR_JAR=openapi-generator-cli-${GENERATOR_VERSION}.jar

EXTERNAL_SPEC_LOCATION=../blocks-api-manifest/spec/open-api-spec.json
SERVICE_SPEC_LOCATION=../../../services/@blocks/api/spec/external/open-api-spec.json

build-java: generate/blocks-javascript-client-java
	pnpm exec drb;

build-docker: generate/blocks-javascript-client-docker
	pnpm exec drb;

build-java-version: generate/blocks-javascript-client-java-version
	pnpm exec drb;

build-docker-version: generate/blocks-javascript-client-docker-version
	pnpm exec drb;

generate/blocks-javascript-client-java:
	rm -rf spec; \
	rm -rf src; \
	mkdir spec && cp $(EXTERNAL_SPEC_LOCATION) spec/; \
	wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/$(GENERATOR_VERSION)/$(GENERATOR_JAR) -O $(GENERATOR_JAR); \
	exec java -jar $(GENERATOR_JAR) generate -i spec/open-api-spec.json -g typescript-axios -o src \
		--ignore-file-override=/local/.openapi-generator-ignore; \
	find . -name 'openapi-generator-cli*.jar' -delete

generate/blocks-javascript-client-docker:
	rm -rf spec; \
	rm -rf src; \
	mkdir spec && cp $(EXTERNAL_SPEC_LOCATION) spec/; \
	docker run --rm -v "${PWD}:/local" --user=`id -u`:`id -g` \
		openapitools/openapi-generator-cli:v$(GENERATOR_VERSION) generate -i /local/spec/open-api-spec.json -g typescript-axios -o /local/src \
		--ignore-file-override=/local/.openapi-generator-ignore;

generate/blocks-javascript-client-java-version:
	rm -rf spec; \
	rm -rf src; \
	mkdir spec && cp $(SERVICE_SPEC_LOCATION) spec/; \
	wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/$(GENERATOR_VERSION)/$(GENERATOR_JAR) -O $(GENERATOR_JAR); \
	exec java -jar $(GENERATOR_JAR) generate -i spec/open-api-spec.json -g typescript-axios -o src \
		--ignore-file-override=/local/.openapi-generator-ignore; \
	find . -name 'openapi-generator-cli*.jar' -delete

generate/blocks-javascript-client-docker-version:
	rm -rf spec; \
	rm -rf src; \
	mkdir spec && cp $(SERVICE_SPEC_LOCATION) spec/; \
	docker run --rm -v "${PWD}:/local" --user=`id -u`:`id -g` \
		openapitools/openapi-generator-cli:v$(GENERATOR_VERSION) generate -i /local/spec/open-api-spec.json -g typescript-axios -o /local/src \
		--ignore-file-override=/local/.openapi-generator-ignore;
