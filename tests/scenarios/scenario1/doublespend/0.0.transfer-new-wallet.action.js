'use strict'

const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const networkUtils = require('../../../networks/e2enet/utils')
const testUtils = require('../../../../lib/utils/test-utils')

/**
 * Creates a transaction to a new wallet
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    const config = networkUtils.e2enet
    client.setConfig(config)

    const transactions = [
      transactionBuilder
        .transfer()
        .amount(1000 * Math.pow(10, 8))
        .recipientId(utils.doubleTransferSender.address)
        .vendorField('send coins for double spend - transfer')
        .fee(0.1 * Math.pow(10, 8))
        .sign(networkUtils.genesisWallet.passphrase)
        .getStruct(),
      transactionBuilder
        .transfer()
        .amount(1000 * Math.pow(10, 8))
        .recipientId(utils.doubleTransfer2ndsigSender.address)
        .vendorField('send coins for double spend - transfer with 2nd sig')
        .fee(0.1 * Math.pow(10, 8))
        .sign(networkUtils.genesisWallet.passphrase)
        .getStruct(),
      transactionBuilder
        .transfer()
        .amount(1.5 * Math.pow(10, 8))
        .recipientId(utils.doubleVoteSender.address)
        .vendorField('send coins for double spend - vote')
        .fee(0.1 * Math.pow(10, 8))
        .sign(networkUtils.genesisWallet.passphrase)
        .getStruct(),
      transactionBuilder
        .transfer()
        .amount(35 * Math.pow(10, 8))
        .recipientId(utils.doubleDelRegSender.address)
        .vendorField('send coins for double spend - delegate registration')
        .fee(0.1 * Math.pow(10, 8))
        .sign(networkUtils.genesisWallet.passphrase)
        .getStruct(),
      transactionBuilder
        .transfer()
        .amount(7 * Math.pow(10, 8))
        .recipientId(utils.double2ndsigRegSender.address)
        .vendorField('send coins for double spend - 2nd signature registration')
        .fee(0.1 * Math.pow(10, 8))
        .sign(networkUtils.genesisWallet.passphrase)
        .getStruct(),
    ]

    await testUtils.POST('transactions', { transactions })
}