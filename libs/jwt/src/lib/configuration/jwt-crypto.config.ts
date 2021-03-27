import { registerAs } from '@nestjs/config'

export const jwtCryptoConfig = registerAs('jwt-crypto', () => ({
  crypto: {
    secret: process.env.JWT_ENCRYPTION_SECRET
  },
  jwt: {
    secret: process.env.SECURITY_JWT_SECRET,
    expiration: process.env.SECURITY_JWT_EXPIRATION
  }
}))
