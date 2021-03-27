import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Roles } from '../../decorators/min-role/roles.enum'
import { BaseGuard } from '../base/base.guard'

@Injectable()
export class LoggedGuard extends BaseGuard implements CanActivate {
  canActivate (
    context: ExecutionContext
  ): boolean {
    const request = context.switchToHttp().getRequest()
    const role = this.getRole(context)

    if (role === Roles.NONE) {
      return true
    }

    return !!request.tokenData?.sub
  }
}
