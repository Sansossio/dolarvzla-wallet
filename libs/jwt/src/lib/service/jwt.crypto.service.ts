import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { ObjectLiteral } from 'typeorm'
import { AesCrypto } from '../../../../crypto/src'
import { clearToken } from './clear-token/clear-token.utils'
import { JwtService } from './jwt.service'

@Injectable()
export class JwtCryptoService extends JwtService {
  private readonly aesCryptoSecret = this.config.get<string>('jwt-crypto.crypto.secret')

  sign (payload: ObjectLiteral): string {
    const token = super.sign(payload)
    return AesCrypto.encrypt(token, this.aesCryptoSecret)
  }

  decode<T extends ObjectLiteral> (token: string): T {
    token = AesCrypto.decrypt(clearToken(token), this.aesCryptoSecret)
    return super.decode(token)
  }

  async verify<T extends ObjectLiteral | string> (token: string, secret: jwt.Secret, options: jwt.VerifyOptions) {
    return super.verify<T>(
      AesCrypto.decrypt(clearToken(token), this.aesCryptoSecret),
      secret,
      options
    )
  }
}
