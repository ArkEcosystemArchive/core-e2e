'use strict'

const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const networkUtils = require('../../../networks/e2enet/utils')
const testUtils = require('../../../../lib/utils/test-utils')

/**
 * Attempt to double spend
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    const config = require('../../../networks/e2enet/e2enet.json')
    client.setConfig(config)

    const transactions = [
      transactionBuilder
        .vote()
        .votesAsset([`+${networkUtils.delegates[2].publicKey}`])
        .sign(utils.doubleVoteSender.passphrase)
        .getStruct(),
      transactionBuilder
        .vote()
        .votesAsset([`+${networkUtils.delegates[3].publicKey}`])
        .sign(utils.doubleVoteSender.passphrase)
        .getStruct()
    ]

    await testUtils.POST('transactions', { transactions })
}