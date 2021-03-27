import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { DatabaseModule } from '../../app/database/database.module'
import { CurrencyHistoryEntity } from '../entity/currency-history.entity'
import { BtcHistoryCron } from './cron/btc/btc-history.cron'
import { EthHistoryCron } from './cron/eth/eth-history.cron'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule.forFeature([
      CurrencyHistoryEntity
    ]),
    ScheduleModule.forRoot(),
    HttpModule
  ],
  providers: [
    BtcHistoryCron,
    EthHistoryCron
  ]
})
export class CurrencyHistoryModule {}
