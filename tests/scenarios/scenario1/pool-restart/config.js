'use strict'

module.exports = {
    events: {
        newBlock: {
            20: [ '0.transfer-new-wallet.action' ],
            22: [ '1.create-tx-remove-node.action' ],
            24: [ '2.0.restart-node.action', '2.1.check-tx-1.test' ],
            26: [ '3.check-node-pool.test' ]
        }
    }
}