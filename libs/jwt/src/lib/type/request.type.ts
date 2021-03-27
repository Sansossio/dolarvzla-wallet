import { Request } from 'express'
import { UserEntity } from '@dolarvzla-wallet/models'

export type RequestType = Request & { user: UserEntity }
