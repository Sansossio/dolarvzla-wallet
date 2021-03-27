import { Controller, Get, HttpStatus, Query } from '@nestjs/common'
import { API_URL, BASE_CONTROLLER_URI } from '@dolarvzla-wallet/api-interface'
import { GetCurrencyPriceRequestDto } from '../dto/request/get-currency-price.dto.request'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { GetCurrencyPriceDtoResponse } from '../dto/response/get-currency-price.dto.response'
import { CurrencyHistoryService } from '../service/currency-history.service'
import { ApiErrorResponse } from '@dolarvzla-wallet/http'

@Controller()
@ApiTags(BASE_CONTROLLER_URI.CURRENCY)
export class CurrencyHistoryController {
  constructor (
    private readonly service: CurrencyHistoryService
  ) {}

  @Get(API_URL.CURRENCY.GET_PRICE)
  @ApiOkResponse({ type: GetCurrencyPriceDtoResponse })
  @ApiErrorResponse(
    HttpStatus.NOT_FOUND
  )
  async getPrice (
  @Query() query: GetCurrencyPriceRequestDto
  ) {
    return this.service.getCurrencyPrice(query)
  }
}
