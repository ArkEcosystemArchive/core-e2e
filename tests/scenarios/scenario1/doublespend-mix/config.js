'use strict'

module.exports = {
    events: {
        newBlock: {
            5: [ '0.0.transfer-new-wallet.action' ],
            9: [ '0.1.init-2ndsig.action' ],
            11: [ '1.0.doublespend.action',
                  '1.1.doublespend2ndsig.action'
                ],
            14: [ '2.check-tx.test' ]
        }
    }
}