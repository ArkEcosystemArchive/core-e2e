'use strict'

const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const testUtils = require('../../../../lib/utils/test-utils')

/**
 * 2nd signature registration for future transfer with 2nd signature
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    const config = require('../../../networks/e2enet/e2enet.json')
    client.setConfig(config)

    const transactions = [
      transactionBuilder
        .secondSignature()
        .signatureAsset(utils.transfer2ndsigSender2.passphrase)
        .fee(5 * Math.pow(10, 8))
        .sign(utils.transfer2ndsigSender.passphrase)
        .getStruct()
    ]

    await testUtils.POST('transactions', { transactions })
}