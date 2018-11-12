'use strict'

const testUtils = require('../../../../lib/utils/test-utils')
const utils = require('./utils')

describe('Check forged transactions', () => {
  it('should have our first transaction forged but not our 2nd one', async () => {
    const response = await testUtils.GET('transactions')
    testUtils.expectSuccessful(response)
    const transactions = response.data.data

    const txToRandomRecipient = transactions.filter(transaction => transaction.recipient === utils.randomRecipient.address)
    const txToRandomRecipient2 = transactions.filter(transaction => transaction.recipient === utils.randomRecipient2.address)
    
    expect(txToRandomRecipient.length).toBe(1) // 1st transaction was forged
    expect(txToRandomRecipient2.length).toBe(0) // 2nd transaction was not forged
  })
})
