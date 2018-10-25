'use strict'

const axios = require('axios')
const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')

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

    await axios.post('http://127.0.0.1:4300/api/v2/transactions', {
      transactions: [transaction1, transaction2]
    })
}