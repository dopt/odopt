#!/bin/bash

pushd /tmp;

# source
git clone git@github.com:dopt/dopt.git;

# target
git clone git@github.com:dopt/odopt.git;

pushd dopt;

git filter-repo \
  --path tsconfig.base.json \
  --path packages/@dopt/react-sdk \
  --path packages/@dopt/config \
  --path packages/@dopt/check-formatting;

popd;

pushd odopt;

git remote add dopt  ../dopt;

git pull dopt main --allow-unrelated-histories;

git push origin main;

popd;

rm -rf ./odopt;
rm -rf ./dopt;

popd;
