'use strict'

const testUtils = require('../../../../lib/utils/test-utils')
const utils = require('./utils')

describe('Check that only 1 transaction out of the 2 was accepted', () => {
  it('should have 1 transaction accepted', async () => {
    const response = await testUtils.GET('transactions')
    testUtils.expectSuccessful(response)
    
    const expected = {}
    const received = {}
    Object.keys(utils.walletsMix).forEach((firstTxType) => {
      const secondTxsTypes = utils.walletsMix[firstTxType]
      
      Object.keys(secondTxsTypes).forEach(secondTxType => {
        const wallets = secondTxsTypes[secondTxType]
        
        const txSent = response.data.data.filter(tx => tx.sender === wallets[0].address)
        expected[`${firstTxType}-${secondTxType}`] = 1
        received[`${firstTxType}-${secondTxType}`] = wallets[0].address //txSent.length
      })
    })

    expect(received).toEqual(response.data.data)
  })
})
