import { Module } from '@nestjs/common'
import { UserEntity } from '@dolarvzla-wallet/models'
import { DatabaseModule } from '../database/database.module'
import { UserRegisterController } from './controller/user-register.controller'
import { UserService } from './service/user.service'

@Module({
  imports: [
    DatabaseModule.forFeature([
      UserEntity
    ])
  ],
  controllers: [
    UserRegisterController
  ],
  providers: [
    UserService
  ]
})
export class UserModule {}
