'use strict'

const axios = require('axios')
const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const testUtils = require('../../../../lib/utils/test-utils')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

/**
 * Attempt to double spend
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    const config = require('../../../networks/e2enet/e2enet.json')
    client.setConfig(config)

    let transaction = transactionBuilder
      .transfer()
      .amount(600 * Math.pow(10, 8))
      .recipientId(utils.randomRecipient.address)
      .vendorField('transaction to add to pool before stopping node')
      .sign(utils.senderWallet.passphrase)
      .getStruct()

    await axios.post('http://127.0.0.1:4300/api/v2/transactions', {
      transactions: [transaction]
    })

    const response = await testUtils.request('GET', 'transactions/unconfirmed')
    const transactions = response.data.data
    console.log(`[pool-clear] unconfirmed: ${JSON.stringify(transactions)}`)

    const commandStopNode = `kill $(ps aux --sort=start_time | grep 'ark start' | grep -v network-start | head -1 |  awk '{print $2}')`
    const { stdout, stderr } = await exec(commandStopNode)
    console.log(`[pool-clear] kill node process : ${JSON.stringify({stdout, stderr})}`)

}