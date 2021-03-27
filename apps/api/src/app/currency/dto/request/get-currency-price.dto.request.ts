import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { Currency } from '@dolarvzla-wallet/models'

export class GetCurrencyPriceRequestDto {
  @ApiProperty({
    enum: Currency,
    example: Currency.BITCOIN
  })
  @IsEnum(Currency)
  @IsNotEmpty()
  currency: Currency
}
