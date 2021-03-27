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

// kHP0qezsj+1pAEd6CVBpSvKbfGC1z1/BPyuG9fnUDmDHIc5ABkFkmzit9nGsVpY3tbc8vou93YNRdNzsF3DnsYoDziH3JSbDJMoN1PZU5pURiqIIw3lu2Y0tCfDAyMdvWeZDGMvKadSDr1oH++RtXe7lYJjvzZbrNX20Y6YdB1mvUqiJBY6uojc4CIFacr8IVqccSvlUo44Bh8st2c7Dlv772JT/bRFxZmwXqIL/hsU5pu8JAvjxhzYXA/91aj1qYvWS0UJNJfYHOodIqNBFOTcQlEWrZxNyydIVeVtRdSafpft/vbPprqDELQ==
