import { registerAs } from '@nestjs/config'

export const bitcoinConfig = registerAs('bitcoin', () => ({
  rpc: {
    domain: process.env.BITCOIN_RPC_DOMAIN,
    port: process.env.BITCOIN_RPC_PORT,
    username: process.env.BITCOIN_RPC_USERNAME,
    password: process.env.BITCOIN_RPC_PASSWORD
  }
}))
