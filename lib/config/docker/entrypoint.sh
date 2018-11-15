#!/usr/bin/env bash

cd /ark-core
rm -rf node_modules package-lock.json > /dev/null 2>&1
rm -rf packages/core/node_modules packages/core/package-lock.json 2>&1
npm --quiet install lerna -g && npm --quiet install -g nodemon
touch lerna.before
lerna bootstrap >> output.log 2> errors.log

touch lerna.ok

bash