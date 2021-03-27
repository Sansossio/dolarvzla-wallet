import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from '../configuration'
import { CurrencyModule } from '../currency/currency.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/api/.env',
      load: configuration
    }),
    DatabaseModule,
    CurrencyModule
  ]
})
export class AppModule {}
