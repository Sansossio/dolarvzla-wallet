import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request } from 'express'
import { v4 as uuidv4 } from 'uuid'

export const CORRELATION_ID_HEADER_NAME = 'X-Correlation-ID'

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use (req: Request, res: Response, next: Function) {
    const { headers } = req
    if (typeof headers[CORRELATION_ID_HEADER_NAME] !== 'string') {
      headers[CORRELATION_ID_HEADER_NAME] = uuidv4()
    }
    next()
  }
}
