import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './configuration'
import { JwtCryptoService } from './service/jwt.crypto.service'
import { JwtService } from './service/jwt.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './libs/jwt/.env',
      load: configuration
    })
  ],
  providers: [
    JwtService,
    JwtCryptoService
  ],
  exports: [
    JwtCryptoService
  ]
})
export class JwtModule {}
