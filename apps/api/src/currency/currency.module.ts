import { Module } from '@nestjs/common'
import { CurrencyHistoryModule } from './history/currency-history.module'

@Module({
  imports: [
    CurrencyHistoryModule
  ]
})
export class CurrencyModule {}
