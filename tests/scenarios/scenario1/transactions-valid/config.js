'use strict'

module.exports = {
    events: {
        newBlock: {
            5: [ '0.0.transfer-new-wallet.action' ],
            9: [ '0.1.init-2ndsig.action' ],
            13: [ '1.0.transaction.action',
                  '1.1.transaction2ndsig.action'
                ],
            16: [ '2.check-tx.test' ]
        }
    }
}