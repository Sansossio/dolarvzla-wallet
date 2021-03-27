import { Module } from '@nestjs/common'
import { CurrencyModule } from './currency/currency.module'
import { InternalModule } from './internal.module'

@Module({
  imports: [
    InternalModule,
    CurrencyModule
  ]
})
export class AppModule {}
