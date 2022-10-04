#!/bin/bash

if [[ $NODE_ENV = "production" || $NODE_ENV = "ci" ]]; then
  make build-java
else
  make build-docker
fi
rm -rf src/.openapi-generator
