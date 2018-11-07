for rawdir in */;
  do
  nodeDir="$(echo $rawdir | sed -e 's;/;;g')";
  p2pPort="$(expr $(echo "$(echo "${nodeDir}" | sed 's/[^0-9]*//g') + 4000"))"
  apiPort="$(expr $(echo "$(echo "${nodeDir}" | sed 's/[^0-9]*//g') + 4300"))"
  echo "[Docker configuration] Tuning docker-compose files for ${nodeDir}";
  sed -i "s;{{nodeAlias}};${nodeDir};g" ${nodeDir}/docker/testnet/docker-compose-stack.yml;
  sed -i "s;{{nodeBackend}};${nodeDir}backend;g" ${nodeDir}/docker/testnet/docker-compose-stack.yml;
  sed -i "s;{{hostP2pPort}};${p2pPort};g" ${nodeDir}/docker/testnet/docker-compose-stack.yml;
  sed -i "s;{{hostApiPort}};${apiPort};g" ${nodeDir}/docker/testnet/docker-compose-stack.yml;
  sed -i "s;{{nodeAlias}};${nodeDir};g" ${nodeDir}/docker/testnet/docker-compose.yml;
  sed -i "s;{{nodeBackend}};${nodeDir}backend;g" ${nodeDir}/docker/testnet/docker-compose.yml;
  sed -i "s;{{hostP2pPort}};${p2pPort};g" ${nodeDir}/docker/testnet/docker-compose.yml;
  sed -i "s;{{hostApiPort}};${apiPort};g" ${nodeDir}/docker/testnet/docker-compose.yml;
  networkExists="$(docker network ls | grep ${nodeDir}backend | wc -l)"
  if [ $networkExists = 1 ]
  then
    echo "[Network configuration] Network ${nodeDir}backend already exists !"
  else
    echo "[Network configuration] Creating network ${nodeDir}backend"
    docker network create -d overlay ${nodeDir}backend --scope=swarm
  fi
done
networkExists="$(docker network ls | grep nodes | wc -l)"
if [ $networkExists = 1 ]
then
  echo "[Network configuration] Network nodes already exists !"
else
  echo "[Network configuration] Creating network nodes"
  docker network create -d overlay nodes --scope=swarm
fi