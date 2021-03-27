import { Module } from '@nestjs/common'
import { DatabaseModule } from '../app/database/database.module'
import { CurrencyHistoryController } from './controller/currency-history.contorller'
import { CurrencyHistoryEntity } from './entity/currency-history.entity'
import { CurrencyHistoryModule } from './history/currency-history.module'
import { CurrencyHistoryService } from './service/currency-history.service'

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
