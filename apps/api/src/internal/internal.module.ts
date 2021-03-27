import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from '../configuration'
import { HttpModule } from '@dolarvzla-wallet/http'
import { DatabaseModule } from '../app/database/database.module'
import { JwtModule } from '@dolarvzla-wallet/jwt'
import { JwtMiddleware } from './middleware/jwt.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/api/.env',
      load: configuration
    }),
    JwtModule,
    DatabaseModule,
    HttpModule
  ]
})
export class InternalModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('*')
  }
}
