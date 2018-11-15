'use strict'

module.exports = {
    events: {
        newBlock: {
            20: [ '0.transfer-new-wallet.action' ],
            24: [ '1.create-transactions.action' ],
            25: [ '2.check-unconfirmed.test' ],
            26: [ '3.stop-node.action' ],
            28: [ '4.0.restart-node.action', '4.1.check-tx-1.test' ],
            38: [ '5.check-node-pool.test' ]
        }
    }
}