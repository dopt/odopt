#!/bin/bash

shx mkdir -p spec
cp $(git rev-parse --show-toplevel)/packages/@dopt/api-manifest/spec/blocks-service/open-api-spec.json spec/open-api-spec.json
