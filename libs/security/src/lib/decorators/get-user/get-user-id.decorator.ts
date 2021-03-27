import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { getUserId } from './get-user-id'

export const GetUserId = createParamDecorator(
  // eslint-disable-next-line
  async (param: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    return getUserId(req)
  }
)
