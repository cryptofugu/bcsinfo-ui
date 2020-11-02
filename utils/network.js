export default {
  mainnet: {
    pubkey: 0x19,
    pubkeyhash: 0x19,
    scripthash: 0x32,
    witness_v0_keyhash: 'bc',
    witness_v0_scripthash: 'bc'
  },
  testnet: {
    pubkey: 0x78,
    pubkeyhash: 0x78,
    scripthash: 0x6e,
    witness_v0_keyhash: 'tq',
    witness_v0_scripthash: 'tq'
  }
}[process.env.network || 'mainnet']
