import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { API_URL, BASE_CONTROLLER_URI } from '@dolarvzla-wallet/api-interface'
import { LoginUserDtoResponse } from '../dto/response/login-user.dto.response'
import { ApiErrorResponse } from '@dolarvzla-wallet/http'
import { LoginUserDtoRequest } from '../dto/request/login-user.dto.request'
import { UserLoginService } from '../service/login/user-login.service'

@Controller()
@ApiTags(BASE_CONTROLLER_URI.USER)
export class UserLoginController {
  constructor (
    private readonly service: UserLoginService
  ) {}

  @Post(API_URL.USER.LOGIN)
  @ApiOkResponse({ type: LoginUserDtoResponse })
  @ApiErrorResponse(
    HttpStatus.UNAUTHORIZED
  )
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User login'
  })
  async login (
  @Body() body: LoginUserDtoRequest
  ) {
    return this.service.login(body)
  }
}
