import { registerAs } from '@nestjs/config'

export const bitcoinConfig = registerAs('bitcoin', () => ({
  autoGenerateBlocks: {
    enable: process.env.BITCOIN_AUTOGENERATE_BLOCKS === 'true',
    amount: +process.env.BITCOIN_AUTOGENERATE_BLOCKS_AMOUNT
  },
  rpc: {
    domain: process.env.BITCOIN_RPC_DOMAIN,
    port: process.env.BITCOIN_RPC_PORT,
    username: process.env.BITCOIN_RPC_USERNAME,
    password: process.env.BITCOIN_RPC_PASSWORD
  }
}))
