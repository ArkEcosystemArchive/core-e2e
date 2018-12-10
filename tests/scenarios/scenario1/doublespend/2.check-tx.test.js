'use strict'

const testUtils = require('../../../../lib/utils/test-utils')
const utils = require('./utils')

describe('Check that only 1 transaction out of the 2 was accepted', () => {
  it('should have 1 transaction accepted', async () => {
    const response = await testUtils.GET('transactions')
    testUtils.expectSuccessful(response)
    
    // double spend - transfer
    const transactions = response.data.data.filter(transaction => transaction.recipient === utils.doubleTransferRecipient.address)
    expect(transactions.length).toBe(1) // 1 transaction was sent to this address

    // double spend - transfer with 2nd signature
    const transactions = response.data.data.filter(transaction => transaction.recipient === utils.doubleTransfer2ndsigRecipient.address)
    expect(transactions.length).toBe(1) // 1 transaction was sent to this address

    // double spend - vote
    const transactions = response.data.data.filter(transaction => transaction.sender === utils.doubleVoteSender.address)
    expect(transactions.length).toBe(1) // 1 transaction was sent from this address

    // double spend - delegate registration
    const transactions = response.data.data.filter(transaction => transaction.sender === utils.doubleDelRegSender.address)
    expect(transactions.length).toBe(1) // 1 transaction was sent from this address

    // double spend - 2nd signature registration
    const transactions = response.data.data.filter(transaction => transaction.sender === utils.double2ndsigRegSender.address)
    expect(transactions.length).toBe(1) // 1 transaction was sent from this address
  })
})
