#!/bin/bash

if [[ $NODE_ENV = "production" || $NODE_ENV = "ci" ]]; then
  make build-java-version
else
  make build-docker-version
fi
rm -rf src/.openapi-generator
