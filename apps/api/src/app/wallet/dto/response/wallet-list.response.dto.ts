import { ApiProperty } from '@nestjs/swagger'
import { Currency, UserWalletEntity } from '@dolarvzla-wallet/models'
import { plainToClass } from 'class-transformer'

export class WalletListResponseDto {
  @ApiProperty({ enum: Currency })
  type: Currency

  @ApiProperty()
  address: string

  @ApiProperty()
  balance: number

  static fromEntity (obj: UserWalletEntity, balance: number): WalletListResponseDto {
    const response: WalletListResponseDto = {
      type: obj.type,
      address: obj.address,
      balance
    }

    return plainToClass(WalletListResponseDto, response)
  }
}
