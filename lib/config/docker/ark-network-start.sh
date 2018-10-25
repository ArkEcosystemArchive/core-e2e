echo "Starting ark --network-start" >> output.log
ls -l ./ >> output.log
node --version >> output.log
ARK_LOG_FILE=ark.log packages/core/bin/ark start --config packages/core/lib/config/e2enet --network e2enet --network-start >> output.log 2> errors.log
echo "Started ark --network-start" >> output.log