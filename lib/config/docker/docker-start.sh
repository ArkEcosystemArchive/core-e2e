for rawdir in */;
  do
  nodeDir="$(echo $rawdir | sed -e 's;/;;g')";
  echo "[docker-compose build] Building ${nodeDir} ...";
  cd ${nodeDir}/docker/testnet
  docker-compose build
  cd ../../..
done
for rawdir in */;
  do
  nodeDir="$(echo $rawdir | sed -e 's;/;;g')";
  echo "[docker-compose stack] Deploying ${nodeDir} ...";
  cd ${nodeDir}/docker/testnet
  docker stack deploy -c docker-compose-stack.yml ${nodeDir}
  cd ../../..
done