'use strict'

const testUtils = require('../../../../lib/utils/test-utils')
const utils = require('./utils')

describe('Check unconfirmed transactions', () => {
  it('should have the 2 transactions unconfirmed', async () => {
    const response = await testUtils.GET('transactions/unconfirmed', {}, 1)
    testUtils.expectSuccessful(response)
    const transactions = response.data.data

    const txToB = transactions.filter(transaction => transaction.recipient === utils.b.address)
    
    expect(transactions.length).toBe(1)
    expect(txToB.length).toBe(1)
  })
})
