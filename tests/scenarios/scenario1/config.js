'use strict'

module.exports = {
    network: 'e2enet',
    enabledTests: [
        'chained-tx',
        'doublespend',
        'doublespend-mix',
        'insufficient-balance',
        //'pool-restart',
        'transactions-valid'
    ]
}