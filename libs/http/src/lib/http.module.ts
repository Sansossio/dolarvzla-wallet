import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { CorrelationIdMiddleware } from './middleware/correlation-id/correlation-id.middleware'

@Module({
  providers: [
    CorrelationIdMiddleware
  ],
  exports: [
    CorrelationIdMiddleware
  ]
})
export class HttpModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware)
      .forRoutes('*')
  }
}
