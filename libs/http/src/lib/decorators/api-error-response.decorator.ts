import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { ErrorDto } from '../dto/error/error.dto'

export const ApiErrorResponse = (...statusList: HttpStatus[]) => {
  if (!statusList.find(status => status === HttpStatus.INTERNAL_SERVER_ERROR)) {
    statusList.push(HttpStatus.INTERNAL_SERVER_ERROR)
  }

  return applyDecorators(
    ...statusList.map(status => ApiResponse({ status, type: ErrorDto }))
  )
}
