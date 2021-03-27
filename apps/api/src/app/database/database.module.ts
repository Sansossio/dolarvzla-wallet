import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot()
      ],
      inject: [
        ConfigService
      ],
      useFactory: (config: ConfigService) => ({
        type: config.get<any>('database.type'),
        host: config.get<string>('database.host'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.db'),
        logging: config.get<boolean>('database.logging'),
        autoLoadEntities: true,
        synchronize: true
      })
    })
  ]
})
export class DatabaseModule {
  static forFeature (entities?: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities)
  }
}
