'use strict'

const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const testUtils = require('../../../../lib/utils/test-utils')
const networkUtils = require('../../../networks/e2enet/utils')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

/**
 * Re-send B => C transaction
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    // B => C transaction
    const config = networkUtils.e2enet
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

    await testUtils.POST('transactions', { transactions: [transaction2] }, 1) // to node 1
}