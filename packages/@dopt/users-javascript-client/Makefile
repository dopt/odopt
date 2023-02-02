.DEFAULT_GOAL := help

SHELL := /bin/bash

GENERATOR_VERSION=6.1.0
GENERATOR_JAR=openapi-generator-cli-${GENERATOR_VERSION}.jar

EXTERNAL_SPEC_LOCATION=../users-api-manifest/spec/open-api-spec.json
SERVICE_SPEC_LOCATION=../../../services/@users/service/spec/external/open-api-spec.json

build-java: generate/users-javascript-client-java
	pnpm exec drb;

build-docker: generate/users-javascript-client-docker
	pnpm exec drb;

build-java-version: generate/users-javascript-client-java-version
	pnpm exec drb;

build-docker-version: generate/users-javascript-client-docker-version
	pnpm exec drb;

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

generate/users-javascript-client-java-version:
	rm -rf spec; \
	rm -rf src; \
	mkdir spec && cp $(SERVICE_SPEC_LOCATION) spec/; \
	wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/$(GENERATOR_VERSION)/$(GENERATOR_JAR) -O $(GENERATOR_JAR); \
	exec java -jar $(GENERATOR_JAR) generate -i spec/open-api-spec.json -g typescript-axios -o src \
		--ignore-file-override=/local/.openapi-generator-ignore; \
	rm -r openapi-generator-cli.jar;

generate/users-javascript-client-docker-version:
	rm -rf spec; \
	rm -rf src; \
	mkdir spec && cp $(SERVICE_SPEC_LOCATION) spec/; \
	docker run --rm -v "${PWD}:/local" --user=`id -u`:`id -g` \
		openapitools/openapi-generator-cli:v$(GENERATOR_VERSION) generate -i /local/spec/open-api-spec.json -g typescript-axios -o /local/src \
		--ignore-file-override=/local/.openapi-generator-ignore;
