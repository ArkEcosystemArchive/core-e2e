echo "Starting ark --network-start" >> output.log
ARK_LOG_FILE=ark.log node ./packages/core/dist/index.js start --config packages/core/src/config/e2enet --network e2enet --network-start >> output.log 2> errors.log
echo "Started ark --network-start" >> output.log