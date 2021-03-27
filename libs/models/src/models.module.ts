import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './libs/models/.env'
    })
  ]
})
export class ModelsModule {}
