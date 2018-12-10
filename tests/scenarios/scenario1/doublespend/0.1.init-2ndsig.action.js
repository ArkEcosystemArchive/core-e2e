'use strict'

const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const testUtils = require('../../../../lib/utils/test-utils')

/**
 * 2nd signature registration for double spend with 2nd signature
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    const config = require('../../../networks/e2enet/e2enet.json')
    client.setConfig(config)

    const transactions = transactionBuilder
      .secondSignature()
      .signatureAsset(utils.doubleTransfer2ndsigSender2.passphrase)
      .sign(utils.doubleTransfer2ndsigSender.passphrase)
      .getStruct()

    await testUtils.POST('transactions', { transactions })
}