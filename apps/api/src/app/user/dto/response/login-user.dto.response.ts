import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDtoResponse {
  @ApiProperty()
  token: string
}
