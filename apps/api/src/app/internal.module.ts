import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from '../configuration'
import { DatabaseModule } from './database/database.module'
import { HttpModule } from '@dolarvzla-wallet/http'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/api/.env',
      load: configuration
    }),
    DatabaseModule,
    HttpModule
  ]
})
export class InternalModule {}
