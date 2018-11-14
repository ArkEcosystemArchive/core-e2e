'use strict'

const axios = require('axios')
const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const testUtils = require('../../../../lib/utils/test-utils')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

describe('Create transactions to be added to the pool, check unconfirmed transactions and shut down the node', () => {
  it('should have 2 unconfirmed transactions in the pool before shut down', async () => {
    const config = require('../../../networks/e2enet/e2enet.json')
    client.setConfig(config)

    // first transaction which will be broadcasted to other nodes for forging
    let transaction = transactionBuilder
      .transfer()
      .amount(300 * Math.pow(10, 8))
      .recipientId(utils.randomRecipient.address)
      .vendorField('transaction to add to pool before disconnecting node')
      .sign(utils.senderWallet.passphrase)
      .getStruct()

    await testUtils.POST('transactions', { transactions: [transaction] }, 1)

    const commandDisconnectNode = `docker network disconnect nodes $(docker ps --format "{{.Names}}" | grep node1_ark)`
    const { stdout: stdoutDisconnect, stderr: stderrDisconnect } = await exec(commandDisconnectNode)
    console.log(`[pool-clear] disconnect node : ${JSON.stringify({stdoutDisconnect, stderrDisconnect})}`)

    // second transaction which will not be broadcasted and should be kept in the node pool
    let transaction2 = transactionBuilder
      .transfer()
      .amount(300 * Math.pow(10, 8))
      .recipientId(utils.randomRecipient2.address)
      .vendorField('transaction to add to pool before stopping node')
      .sign(utils.senderWallet.passphrase)
      .getStruct()

    await testUtils.POST('transactions', { transactions: [transaction2] }, 1)

    const response = await testUtils.GET('transactions/unconfirmed', {}, 1)
    const transactions = response.data.data
    expect(transactions.length).toBe(2)
    expect(transactions.find(tx => tx.id === transaction.id)).toBeDefined()
    expect(transactions.find(tx => tx.id === transaction2.id)).toBeDefined()

    const commandStopNode = `docker ps --format "{{.Names}}" | grep node1_ark | xargs -I {} sh -c 'docker exec -d {} bash killpid.sh'` // sending SIGINT for graceful shutdown
    const { stdout, stderr } = await exec(commandStopNode)
    console.log(`[pool-clear] killed node1 process`)
  })

})