import { ApiProperty } from '@nestjs/swagger'
import { UserEntity } from '@dolarvzla-wallet/models'
import { plainToClass } from 'class-transformer'

export class UserMeDtoResponse {
  @ApiProperty()
  email: string

  static fromUserEntity (obj: UserEntity): UserMeDtoResponse {
    return plainToClass(
      UserMeDtoResponse,
      {
        email: obj.email
      }
    )
  }
}
