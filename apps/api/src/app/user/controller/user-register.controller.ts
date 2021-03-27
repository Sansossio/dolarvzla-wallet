import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { RegisterUserDtoRequest } from '../dto/request/register-user.dto.request'
import { API_URL, BASE_CONTROLLER_URI } from '@dolarvzla-wallet/api-interface'
import { ApiErrorResponse } from '@dolarvzla-wallet/http'
import { UserRegisterService } from '../service/register/user-register.service'

@Controller()
@ApiTags(BASE_CONTROLLER_URI.USER)
export class UserRegisterController {
  constructor (
    private readonly service: UserRegisterService
  ) {}

  @Post(API_URL.USER.REGISTER)
  @ApiOkResponse({ type: undefined })
  @ApiErrorResponse(
    HttpStatus.CONFLICT
  )
  @ApiOperation({
    summary: 'Register a new user'
  })
  async register (
  @Body() body: RegisterUserDtoRequest
  ) {
    await this.service.register(body)
  }
}
