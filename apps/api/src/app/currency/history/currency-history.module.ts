import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { CurrencyHistoryEntity } from '@dolarvzla-wallet/models'
import { BtcHistoryCron } from './cron/btc/btc-history.cron'
import { EthHistoryCron } from './cron/eth/eth-history.cron'
import { DatabaseModule } from '../../database/database.module'

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
