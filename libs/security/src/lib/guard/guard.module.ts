import { Module } from '@nestjs/common'
import { LoggedGuard } from './logged/logged.guard'

@Module({
  providers: [
    LoggedGuard
  ],
  exports: [
    LoggedGuard
  ]
})
export class GuardModule {}
