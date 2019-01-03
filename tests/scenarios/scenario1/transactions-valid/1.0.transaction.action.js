'use strict'

const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const testUtils = require('../../../../lib/utils/test-utils')
const networkUtils = require('../../../networks/e2enet/utils')

/**
 * Send the transactions (1 of each type)
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    const config = networkUtils.e2enet
    client.setConfig(config)

    const transactions = []
    Object.keys(utils.wallets).forEach(txType => {
      const wallets = utils.wallets[txType]
      
      transactions.push(_genTransaction(txType, wallets))
    })

    await testUtils.POST('transactions', { transactions })

    function _genTransaction(type, wallets) {
      let transaction
      switch (type) {
        case 'transfer':
          transaction = transactionBuilder
            .transfer()
            .amount(2 * Math.pow(10, 8))
            .recipientId(wallets[1].address)
          break;
        case 'vote':
          transaction = transactionBuilder
            .vote()
            .votesAsset([`+${networkUtils.delegates[2].publicKey}`])
          break;
        case 'secondSignRegistration':
          transaction = transactionBuilder
            .secondSignature()
            .signatureAsset(wallets[1].passphrase)
          break;
        case 'delegateRegistration':
          transaction = transactionBuilder
            .delegateRegistration()
            .usernameAsset(wallets[0].address.slice(0,10).toLowerCase())
          break;
      }
      
      return transaction
        .fee(utils.fees[type])
        .sign(wallets[0].passphrase)
        .getStruct()
    }
}