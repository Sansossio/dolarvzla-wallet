/* istanbul ignore file */
import { applyDecorators, SetMetadata } from '@nestjs/common'
import { Roles } from './roles.enum'

export const MinRole = (role: Roles = Roles.USER) =>
  applyDecorators(
    SetMetadata('role', role)
  )
