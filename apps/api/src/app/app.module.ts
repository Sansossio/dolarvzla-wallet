import { Module } from '@nestjs/common'
import { InternalModule } from '../internal/internal.module'
import { CurrencyModule } from './currency/currency.module'
import { UserModule } from './user/user.module'
import { WalletModule } from './wallet/wallet.module'

@Module({
  imports: [
    InternalModule,
    CurrencyModule,
    UserModule,
    WalletModule
  ]
})
export class AppModule {}
