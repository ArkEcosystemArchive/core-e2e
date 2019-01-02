'use strict'

const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const networkUtils = require('../../../networks/e2enet/utils')
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
        .vote()
        .votesAsset([`+${networkUtils.delegates[2].publicKey}`])
        .fee(1 * Math.pow(10, 8))
        .sign(utils.voteSender.passphrase)
        .getStruct()
    ]

    await testUtils.POST('transactions', { transactions })
}