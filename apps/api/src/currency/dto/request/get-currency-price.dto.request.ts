import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { Currency } from '../../enum/currency.enum'

export class GetCurrencyPriceRequestDto {
  @ApiProperty({
    enum: Currency,
    example: Currency.BITCOIN
  })
  @IsEnum(Currency)
  @IsNotEmpty()
  currency: Currency
}
