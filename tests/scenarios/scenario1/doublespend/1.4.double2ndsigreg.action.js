'use strict'

const axios = require('axios')
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
        .secondSignature()
        .signatureAsset(utils.double2ndsigRegSender2.passphrase)
        .fee(5 * Math.pow(10, 8))
        .sign(utils.double2ndsigRegSender.passphrase)
        .getStruct(),
      transactionBuilder
        .secondSignature()
        .signatureAsset(utils.double2ndsigRegSender3.passphrase)
        .fee(5 * Math.pow(10, 8))
        .sign(utils.double2ndsigRegSender.passphrase)
        .getStruct()
    ]

    await testUtils.POST('transactions', { transactions })
}