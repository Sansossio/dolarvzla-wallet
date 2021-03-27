import { registerAs } from '@nestjs/config'

export const cryptoConfig = registerAs('crypto', () => ({
  encryptionSecret: process.env.MODEL_ENCRYPTION_SECRET
}))
