'use strict'

const testUtils = require('../../../../lib/utils/test-utils')
const utils = require('./utils')

describe('Check confirmed and unconfirmed transactions', () => {
  it('should have no unconfirmed transaction', async () => {
    const response = await testUtils.GET('transactions/unconfirmed', {}, 1)
    testUtils.expectSuccessful(response)
    const transactions = response.data.data
    
    expect(transactions.length).toBe(0) // transaction was removed from pool
  })

  it('should have our 1st and 2nd transaction forged', async () => {
    const response = await testUtils.GET('transactions')
    testUtils.expectSuccessful(response)
    const transactions = response.data.data

    const txToB = transactions.filter(transaction => transaction.recipient === utils.b.address)
    
    expect(txToB.length).toBe(1) // 1st transaction was forged
    expect(transactions.length).toBe(1) // 2nd transaction was not forged
  })
})
