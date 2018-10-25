'use strict'

module.exports = {
    events: {
        newBlock: {
            8: [ '0.transfer-new-wallet.action' ],
            11: [ '1.doublespend.action' ],
            14: [ '2.check-tx.test' ]
        }
    }
}