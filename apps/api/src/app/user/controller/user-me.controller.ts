import { GetUser, SecureController } from '@dolarvzla-wallet/security'
import { Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { API_URL, BASE_CONTROLLER_URI } from '@dolarvzla-wallet/api-interface'
import { ApiErrorResponse } from '@dolarvzla-wallet/http'
import { UserMeDtoResponse } from '../dto/response/user-me.dto.response'
import { UserEntity } from '@dolarvzla-wallet/models'

@SecureController()
@ApiTags(BASE_CONTROLLER_URI.USER)
export class UserMeController {
  @Get(API_URL.USER.ME)
  @ApiOkResponse({ type: UserMeDtoResponse })
  @ApiErrorResponse(
    HttpStatus.UNAUTHORIZED
  )
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get current user'
  })
  async getMe (
  @GetUser() user: UserEntity
  ) {
    return UserMeDtoResponse.fromUserEntity(user)
  }
}
