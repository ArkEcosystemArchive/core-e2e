const { client, crypto } = require('@arkecosystem/crypto')
const bip39 = require('bip39')


const genWallets = () => {
  const config = require('../../../networks/e2enet/e2enet.json')
  client.setConfig(config)

  const wallets = []
  for (let i = 0; i < 5; i++) {
    const passphrase = bip39.generateMnemonic()
    const keys = crypto.getKeys(passphrase)
    const address = crypto.getAddress(keys.publicKey, config.pubKeyHash)
    wallets.push({ passphrase, address })
  }
  
  return wallets
}

const walletsMix = {
  vote: {
    delegateRegistration: genWallets(),
    transfer: genWallets(),
    secondSignRegistration: genWallets()
  },
  delegateRegistration: {
    vote: genWallets(),
    transfer: genWallets(),
    secondSignRegistration: genWallets()
  },
  transfer: {
    vote: genWallets(),
    delegateRegistration: genWallets(),
    secondSignRegistration: genWallets()
  },
  secondSignRegistration: {
    vote: genWallets(),
    delegateRegistration: genWallets(),
    transfer: genWallets()
  }
}

const arktoshi = 10 ** 8
const transferAmount = 10 * arktoshi
const amountNeeded = {
  transfer: transferAmount + 0.1 * arktoshi,
  vote: 1 * arktoshi,
  secondSignRegistration: 5 * arktoshi,
  delegateRegistration: 25 * arktoshi
}

const fees = {
  transfer: 0.1 * arktoshi,
  vote: 1 * arktoshi,
  secondSignRegistration: 5 * arktoshi,
  delegateRegistration: 25 * arktoshi
}

module.exports = {
  walletsMix,
  amountNeeded,
  transferAmount,
  fees
}