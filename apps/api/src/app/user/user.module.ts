import { Module } from '@nestjs/common'
import { UserEntity, UserWalletEntity } from '@dolarvzla-wallet/models'
import { DatabaseModule } from '../database/database.module'
import { UserRegisterController } from './controller/user-register.controller'
import { CryptoWalletModule } from '@dolarvzla-wallet/crypto-wallet'
import { UserRegisterService } from './service/register/user-register.service'

@Module({
  imports: [
    DatabaseModule.forFeature([
      UserEntity,
      UserWalletEntity
    ]),
    CryptoWalletModule
  ],
  controllers: [
    UserRegisterController
  ],
  providers: [
    UserRegisterService
  ]
})
export class UserModule {}
