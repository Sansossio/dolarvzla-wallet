import { Module } from '@nestjs/common'
import { UserWalletEntity } from '@dolarvzla-wallet/models'
import { DatabaseModule } from '../database/database.module'
import { WalletController } from './controller/wallet.controller'
import { CryptoWalletModule } from '@dolarvzla-wallet/crypto-wallet'
import { WalletListService } from './service/wallet-list.service'

@Module({
  imports: [
    DatabaseModule.forFeature([
      UserWalletEntity
    ]),
    CryptoWalletModule
  ],
  controllers: [
    WalletController
  ],
  providers: [
    WalletListService
  ]
})
export class WalletModule {}
