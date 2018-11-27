'use strict'

/*
Test summary :
We want to test that the pool handles transactions correctly even when they are received in incorrect order.
(transactions from A => B then B => C received by a node as B => C first)

Workflow :
- step 0 : we just pick from genesis wallet what we need for our test, sending it to a new wallet
- step 1 : we disconnect node1 from the network and send it A => B and B => C. we send only B => C to the others.
- step 2 : node1 is still disconnected, we check that it has still the 2 transactions "unconfirmed"
- step 3 : we shut down node1 (killing with sigint for graceful shutdown)
- step 4 : we restart node1
- step 5 : we check if A => B and B => C have been forged
*/

module.exports = {
    events: {
        newBlock: {
            6: [ '0.transfer-new-wallet.action' ],
            8: [ '1.create-transactions.action' ],
            10: [ '2.check-unconfirmed.test' ],
            12: [ '3.stop-node.action' ],
            14: [ '4.restart-node.action'],
            18: [ '5.check-forged.test' ]
        }
    }
}