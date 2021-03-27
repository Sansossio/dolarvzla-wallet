import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request } from 'express'
import { UserEntity } from '@dolarvzla-wallet/models'
import { JwtCryptoService } from '@dolarvzla-wallet/jwt'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor (
    private readonly service: JwtCryptoService
  ) {}

  async use (req: Request & { user: UserEntity }, _: Response, next: Function) {
    const token: string = req.headers.authorization

    if (typeof token === 'string') {
      try {
        const data: { sub: string } = this.service.decode(token)
        req.tokenData = req.tokenData || {}

        req.tokenData.sub = data.sub
      } catch (e) {
        // Ignore error
        console.log()
      }
    }

    next()
  }
}
