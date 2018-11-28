'use strict'

const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const testUtils = require('../../../../lib/utils/test-utils')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

/**
 * Disconnect node1 + Create A => B and B => C transactions
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    // disconnect node1
    const commandDisconnectNode = `docker network disconnect nodes $(docker ps --format "{{.Names}}" | grep node1_ark)`
    const { stdout: stdoutDisconnect, stderr: stderrDisconnect } = await exec(commandDisconnectNode)
    console.log(`[pool-clear] disconnect node : ${JSON.stringify({stdoutDisconnect, stderrDisconnect})}`)

    // A => B and B => C transactions
    const config = require('../../../networks/e2enet/e2enet.json')
    client.setConfig(config)

    // A => B
    let transaction1 = transactionBuilder
      .transfer()
      .amount(300 * Math.pow(10, 8))
      .recipientId(utils.b.address)
      .vendorField('transfer A => B')
      .fee(0.1 * Math.pow(10, 8))
      .sign(utils.a.passphrase)
      .getStruct()

    // B => C
    let transaction2 = transactionBuilder
      .transfer()
      .amount(250 * Math.pow(10, 8))
      .recipientId(utils.c.address)
      .vendorField('transfer B => C')
      .fee(0.1 * Math.pow(10, 8))
      .sign(utils.b.passphrase)
      .getStruct()

    await testUtils.POST('transactions', { transactions: [transaction1, transaction2] }, 1) // to node 1
    await testUtils.POST('transactions', { transactions: [transaction2] }) // just transaction2 to other nodes
}