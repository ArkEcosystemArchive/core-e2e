'use strict'

const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const testUtils = require('../../../../lib/utils/test-utils')

/**
 * Attempt to spend with insufficient balance
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    const config = require('../../../networks/e2enet/crypto/e2enet/network.json')
    client.setConfig(config)

    const transactions = [
      transactionBuilder
        .delegateRegistration()
        .usernameAsset("dummydelegate1")
        .fee(25 * Math.pow(10, 8))
        .sign(utils.delRegSender.passphrase)
        .getStruct()
    ]

    await testUtils.POST('transactions', { transactions })
}