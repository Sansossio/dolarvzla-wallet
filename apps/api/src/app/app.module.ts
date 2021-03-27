import { Module } from '@nestjs/common'
import { CurrencyModule } from './currency/currency.module'
import { InternalModule } from './internal.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    InternalModule,
    CurrencyModule,
    UserModule
  ]
})
export class AppModule {}
