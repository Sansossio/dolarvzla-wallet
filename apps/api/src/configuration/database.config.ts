import { registerAs } from '@nestjs/config'

export const databaseConfig = registerAs('database', () => ({
  type: process.env.DATABASE_ENGINE,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  db: process.env.DATABASE_DB_NAME,
  logging: process.env.DATABASE_LOGGING === 'true'
}))
