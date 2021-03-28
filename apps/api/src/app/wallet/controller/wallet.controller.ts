import { GetUserId, SecureController } from '@dolarvzla-wallet/security'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { API_URL, BASE_CONTROLLER_URI } from '@dolarvzla-wallet/api-interface'
import { Get, HttpStatus } from '@nestjs/common'
import { ApiErrorResponse } from '@dolarvzla-wallet/http'
import { WalletListResponseDto } from '../dto/response/wallet-list.response.dto'
import { WalletListService } from '../service/wallet-list.service'

@SecureController()
@ApiTags(BASE_CONTROLLER_URI.WALLET)
export class WalletController {
  constructor (
    private readonly walletListService: WalletListService
  ) {}

  @Get(API_URL.WALLET.LIST)
  @ApiOperation({
    summary: 'Get wallets list'
  })
  @ApiOkResponse({ type: [WalletListResponseDto] })
  @ApiErrorResponse(
    HttpStatus.FORBIDDEN
  )
  async getList (@GetUserId() userId: number) {
    return this.walletListService.list(userId)
  }
}
