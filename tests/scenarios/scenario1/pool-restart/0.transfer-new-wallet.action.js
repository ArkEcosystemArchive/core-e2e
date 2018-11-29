'use strict'

const axios = require('axios')
const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const networkUtils = require('../../../networks/e2enet/utils')
const testUtils = require('../../../../lib/utils/test-utils')

/**
 * Creates a transaction to a new wallet
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    const config = require('../../../networks/e2enet/e2enet.json')
    client.setConfig(config)

    let transaction1 = transactionBuilder
      .transfer()
      .amount(1000 * Math.pow(10, 8))
      .recipientId(utils.senderWallet.address)
      .vendorField('send coins to new wallet')
      .fee(0.1 * Math.pow(10, 8))
      .sign(networkUtils.genesisWallet.passphrase)
      .getStruct()

    await testUtils.POST('transactions', {
      transactions: [transaction1]
    })
}