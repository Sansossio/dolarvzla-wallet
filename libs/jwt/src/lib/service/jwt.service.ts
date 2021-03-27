import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jsonwebtoken'
import { ObjectLiteral } from 'typeorm'
import { clearToken } from './clear-token/clear-token.utils'

@Injectable()
export class JwtService {
  private readonly jwt = jwt
  private readonly secret = this.config.get<string>('jwt-crypto.jwt.secret')
  private readonly options: jwt.SignOptions = {
    expiresIn: this.config.get('jwt-crypto.jwt.expiration')
  }

  constructor (
    protected readonly config: ConfigService
  ) {}

  sign (payload: ObjectLiteral): string {
    return this.jwt.sign(payload, this.secret, this.options)
  }

  decode<T extends ObjectLiteral> (token: string): T {
    return this.jwt.verify(clearToken(token), this.secret) as T
  }

  async verify<T extends ObjectLiteral | string> (token: string, secret: jwt.Secret, options: jwt.VerifyOptions) {
    const newToken = clearToken(token)
    return new Promise<T>((resolve, reject) => {
      this.jwt.verify(newToken, secret, options, (err, data) => {
        if (err) reject(err)
        else resolve(data as T)
      })
    })
  }
}
