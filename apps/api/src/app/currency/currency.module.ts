import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CurrencyHistoryController } from './controller/currency-history.contorller'
import { CurrencyHistoryModule } from './history/currency-history.module'
import { CurrencyHistoryService } from './service/currency-history.service'
import { CurrencyHistoryEntity } from '@dolarvzla-wallet/models'

@Module({
  imports: [
    DatabaseModule.forFeature([
      CurrencyHistoryEntity
    ]),
    CurrencyHistoryModule
  ],
  controllers: [
    CurrencyHistoryController
  ],
  providers: [
    CurrencyHistoryService
  ]
})
export class CurrencyModule {}
