'use strict'

const testUtils = require('../../../../lib/utils/test-utils')
const utils = require('./utils')

describe('Check that only 1 transaction out of the 2 was accepted', () => {
  it('should have 1 transaction accepted', async () => {
    const response = await testUtils.GET('transactions')
    testUtils.expectSuccessful(response)
    
    Object.keys(utils.walletsMix).forEach((firstTxType) => {
      const secondTxsTypes = utils.walletsMix[firstTxType]
      
      Object.keys(secondTxsTypes).forEach(secondTxType => {
        console.log(`test ${firstTxType} - ${secondTxType}`)
        const wallets = secondTxsTypes[secondTxType]
        
        const txSent = response.data.data.filter(tx => tx.sender === wallets[0].address)
        expect(txSent.length).toBe(1) // only 1 transaction was sent from this address
      })
    })

  })
})
