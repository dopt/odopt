#!/bin/bash

eval $(jq -r 'keys[] as $k | "shx mkdir -p spec/\($k);wget \(.[$k]) -O spec/\($k)/open-api-spec.json;"' manifest.json)
