'use strict'

const testUtils = require('../../../../lib/utils/test-utils')
const utils = require('./utils')

describe('New wallet which was sent transaction', () => {
  it('should have coins in the wallet', async () => {
    const response = await testUtils.GET('transactions')
    testUtils.expectSuccessful(response)
    
    const transactions = response.data.data.filter(transaction => transaction.recipient === utils.doubleSpendRecipient.address)
    expect(transactions.length).toBe(1) // 1 transaction was sent to this address
  })
})
