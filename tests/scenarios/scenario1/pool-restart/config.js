'use strict'

module.exports = {
    events: {
        newBlock: {
            1175: [ '0.transfer-new-wallet.action' ],
            1177: [ '1.create-tx-remove-node.action' ],
            1179: [ '2.0.restart-node.action', '2.1.check-tx-1.test' ],
            1181: [ '3.check-node-pool.test' ]
        }
    }
}