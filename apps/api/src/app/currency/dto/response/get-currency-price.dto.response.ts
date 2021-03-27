import { ApiProperty } from '@nestjs/swagger'
import { Currency } from '@dolarvzla-wallet/models'

export class GetCurrencyPriceDtoResponse {
  @ApiProperty({
    enum: Currency,
    example: Currency.BITCOIN
  })
  currency: Currency

  @ApiProperty()
  price: number

  @ApiProperty()
  lastUpdate: Date
}
