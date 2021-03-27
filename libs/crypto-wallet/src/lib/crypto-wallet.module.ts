import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from '../configuration'
import { BitcoinService } from './service/bitcoin/bitcoin.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './libs/crypto-wallet/.env',
      load: configuration
    }),
    HttpModule
  ],
  providers: [
    BitcoinService
  ],
  exports: [
    BitcoinService
  ]
})
export class CryptoWalletModule {}
