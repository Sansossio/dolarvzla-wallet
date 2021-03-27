import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Roles } from '../../decorators/min-role/roles.enum'

@Injectable()
export class BaseGuard {
  constructor (
    protected readonly reflector: Reflector
  ) {}

  getRole (context: ExecutionContext): Roles {
    const role = this.reflector.get('role', context.getHandler())
    return typeof role === 'undefined' ? Roles.USER : role
  }
}
