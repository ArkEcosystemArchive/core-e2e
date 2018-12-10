'use strict'

module.exports = {
    network: 'e2enet',
    enabledTests: [
        'chained-tx',
        'doublespend',
        'insufficient-balance',
        'pool-restart'
    ]
}