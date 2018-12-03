'use strict'

module.exports = {
    events: {
        newBlock: {
            5: [ '0.transfer-new-wallet.action' ],
            16: [ '1.doublespend.action' ],
            19: [ '2.check-tx.test' ]
        }
    }
}