import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import configuration from '../configuration'
import { WalletOrchestrator } from './orchestrator/wallet.orchestrator'
import { BitcoinSchedule } from './service/bitcoin/bitcoin.schedule'
import { BitcoinService } from './service/bitcoin/bitcoin.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './libs/crypto-wallet/.env',
      load: configuration
    }),
    ScheduleModule.forRoot(),
    HttpModule
  ],
  providers: [
    WalletOrchestrator,
    BitcoinService,

    // Schedules
    BitcoinSchedule
  ],
  exports: [
    WalletOrchestrator,
    BitcoinService
  ]
})
export class CryptoWalletModule {}
