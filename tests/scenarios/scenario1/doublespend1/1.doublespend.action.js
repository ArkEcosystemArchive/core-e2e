'use strict'

const axios = require('axios')
const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const testUtils = require('../../../../lib/utils/test-utils')

/**
 * Attempt to double spend
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    const config = require('../../../networks/e2enet/e2enet.json')
    client.setConfig(config)

    let transaction1 = transactionBuilder
      .transfer()
      .amount(600 * Math.pow(10, 8))
      .recipientId(utils.doubleSpendRecipient.address)
      .vendorField('first part of double spend')
      .sign(utils.doubleSpendSender.passphrase)
      .getStruct()

    let transaction2 = transactionBuilder
      .transfer()
      .amount(600 * Math.pow(10, 8))
      .recipientId(utils.doubleSpendRecipient.address)
      .vendorField('second part of double spend')
      .sign(utils.doubleSpendSender.passphrase)
      .getStruct()

    await testUtils.POST('transactions', {
      transactions: [transaction1, transaction2]
    })
}