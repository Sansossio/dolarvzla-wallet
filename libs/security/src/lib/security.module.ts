import { Module } from '@nestjs/common'
import { GuardModule } from './guard/guard.module'

@Module({
  imports: [
    GuardModule
  ],
  exports: [
    GuardModule
  ]
})
export class SecurityModule {}
