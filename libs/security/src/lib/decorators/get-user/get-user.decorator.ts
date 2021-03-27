import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { getUser } from './get-user'
import { GetUserParameterDto } from './get-user.parameter.dto'

const defaultValue: GetUserParameterDto = {
  nullable: false
}

export const GetUser = createParamDecorator(
  // eslint-disable-next-line
  async (param: GetUserParameterDto = defaultValue, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    return getUser(req, param)
  }
)
