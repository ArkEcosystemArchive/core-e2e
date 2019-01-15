const { client, crypto } = require('@arkecosystem/crypto')

const e2enet = require('./e2enet.json')

/**
 * Get the e2e genesis delegates information
 * @return {Array} array of objects like { secret, publicKey, address, balance }
 */

client.setConfig(e2enet)

const { secrets } = require('./delegates.json')
const genesisBlock = require('./genesisBlock.json')
const genesisTransactions = genesisBlock.transactions

const delegates = secrets.map(secret => {
  const publicKey = crypto.getKeys(secret).publicKey;
  const address = crypto.getAddress(publicKey);
  
  return {
    secret,
    passphrase: secret, // just an alias for delegate secret
    publicKey,
    address
  };
});


module.exports = {
    genesisWallet: {
        passphrase: 'rebuild pupil visa matter cement area walnut resist type dumb outer issue'
    },
    delegates,
    e2enet
}
