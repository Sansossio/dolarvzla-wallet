import { registerAs } from '@nestjs/config'
import { Currency } from '../currency/enum/currency.enum'

export const currencyConfig = registerAs('currency', () => ({
  prices: {
    coinbase: {
      [Currency.BITCOIN]: process.env.CURRENCY_PRICE_COINBASE_BITCOIN,
      [Currency.ETHEREUM]: process.env.CURRENCY_PRICE_COINBASE_ETHEREUM
    }
  }
}))
