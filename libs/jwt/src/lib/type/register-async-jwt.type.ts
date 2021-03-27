import { ConfigService } from '@nestjs/config'
import { RegisterJwt } from './register-jwt.type'

export interface RegisterAsyncJwt {
  /**
   * useFactory
   * @description Callback that returns RegisterJwt instance
   */
  useFactory: (configService: ConfigService) => RegisterJwt | Promise<RegisterJwt>
}
