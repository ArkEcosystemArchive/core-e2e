'use strict'

const util = require('util')
const exec = util.promisify(require('child_process').exec)

/**
 * Attempt to double spend
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
  const commandLaunch = `docker ps --format "{{.Names}}" | grep node0_ark | xargs -I {} sh -c 'docker exec -d {} bash ark.sh'`
  console.log(`[pool-clear] Restarting node0`)
  const { stdout, stderr } = await exec(commandLaunch)
  console.log(`[pool-clear] Start node0 result : ${JSON.stringify({stdout, stderr})}`)
}