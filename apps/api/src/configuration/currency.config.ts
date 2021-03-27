import { registerAs } from '@nestjs/config'
import { Currency } from '@dolarvzla-wallet/models'

export const currencyConfig = registerAs('currency', () => ({
  prices: {
    coinbase: {
      [Currency.BITCOIN]: process.env.CURRENCY_PRICE_COINBASE_BITCOIN,
      [Currency.ETHEREUM]: process.env.CURRENCY_PRICE_COINBASE_ETHEREUM
    }
  }
}))
