'use strict'

const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const testUtils = require('../../../../lib/utils/test-utils')
const networkUtils = require('../../../networks/e2enet/utils')

/**
 * Attempt to double spend
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    const config = networkUtils.e2enet
    client.setConfig(config)

    const transactions = [
      transactionBuilder
        .transfer()
        .amount(600 * Math.pow(10, 8))
        .recipientId(utils.doubleTransferRecipient.address)
        .vendorField('first part of double spend')
        .fee(0.1 * Math.pow(10, 8))
        .sign(utils.doubleTransferSender.passphrase)
        .getStruct(),
      transactionBuilder
        .transfer()
        .amount(600 * Math.pow(10, 8))
        .recipientId(utils.doubleTransferRecipient.address)
        .vendorField('second part of double spend')
        .fee(0.1 * Math.pow(10, 8))
        .sign(utils.doubleTransferSender.passphrase)
        .getStruct()
    ]

    await testUtils.POST('transactions', { transactions })
}