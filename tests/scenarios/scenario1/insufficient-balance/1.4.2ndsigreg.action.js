'use strict'

const axios = require('axios')
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
        .secondSignature()
        .signatureAsset(utils.secondsigRegSender2.passphrase)
        .fee(5 * Math.pow(10, 8))
        .sign(utils.secondsigRegSender.passphrase)
        .getStruct()
    ]

    await testUtils.POST('transactions', { transactions })
}