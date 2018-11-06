'use strict'

const testUtils = require('../../../../lib/utils/test-utils')
const utils = require('./utils')

describe('New wallet which was sent transaction', () => {
  it('should have coins in the wallet', async () => {
    const response = await testUtils.request('GET', 'transactions/unconfirmed')
    testUtils.expectSuccessful(response)
    const transactions = response.data.data
    
    expect(transactions.length).toBe(0) // transaction was removed from pool
  })
})
