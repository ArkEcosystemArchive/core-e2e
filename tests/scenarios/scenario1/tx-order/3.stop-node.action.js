'use strict'

const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const testUtils = require('../../../../lib/utils/test-utils')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

/**
 * Create a transaction to be added to the pool and shut down the node
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
  const commandStopNode = `docker ps --format "{{.Names}}" | grep node1_ark | xargs -I {} sh -c 'docker exec -d {} bash killpid.sh'` // sending SIGINT for graceful shutdown
  const { stdout, stderr } = await exec(commandStopNode)
  console.log(`[pool-clear] killed node1 process`)

  // also send the B => C transaction to the other nodes
  const config = require('../../../networks/e2enet/e2enet.json')
  client.setConfig(config)
  // B => C
  let transaction2 = transactionBuilder
  .transfer()
  .amount(250 * Math.pow(10, 8))
  .recipientId(utils.c.address)
  .vendorField('transfer B => C')
  .fee(0.1 * Math.pow(10, 8))
  .sign(utils.b.passphrase)
  .getStruct()

await testUtils.POST('transactions', { transactions: [transaction2] }) // just transaction2 to other nodes
}
