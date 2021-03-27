import { Module } from '@nestjs/common'
import { UserEntity, UserWalletEntity } from '@dolarvzla-wallet/models'
import { DatabaseModule } from '../database/database.module'
import { UserRegisterController } from './controller/user-register.controller'
import { CryptoWalletModule } from '@dolarvzla-wallet/crypto-wallet'
import { UserRegisterService } from './service/register/user-register.service'
import { JwtModule } from '@dolarvzla-wallet/jwt'
import { UserLoginController } from './controller/user-login.controller'
import { UserLoginService } from './service/login/user-login.service'
import { UserMeController } from './controller/user-me.controller'

@Module({
  imports: [
    DatabaseModule.forFeature([
      UserEntity,
      UserWalletEntity
    ]),
    CryptoWalletModule,
    JwtModule
  ],
  controllers: [
    UserRegisterController,
    UserLoginController,
    UserMeController
  ],
  providers: [
    UserRegisterService,
    UserLoginService
  ]
})
export class UserModule {}
