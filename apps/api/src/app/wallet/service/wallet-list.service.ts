import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { UserWalletEntity } from '@dolarvzla-wallet/models'
import { InjectRepository } from '@nestjs/typeorm'
import { WalletListResponseDto } from '../dto/response/wallet-list.response.dto'
import { WalletOrchestrator } from '@dolarvzla-wallet/crypto-wallet'

@Injectable()
export class WalletListService {
  constructor (
    @InjectRepository(UserWalletEntity)
    private readonly repository: Repository<UserWalletEntity>,

    private readonly walletOrquestador: WalletOrchestrator
  ) {}

  async list (userId: number): Promise<WalletListResponseDto[]> {
    const listOfWallets = await this.repository.find({
      where: {
        user: { id: userId }
      },
      select: [
        'type',
        'walletId',
        'address'
      ]
    })

    return Promise.all(
      listOfWallets.map(async (wallet): Promise<WalletListResponseDto> => {
        const { balance } = await this.walletOrquestador
          .getHandler(wallet.type)
          .getBalance(wallet.walletId)

        return WalletListResponseDto.fromEntity(wallet, balance)
      })
    )
  }
}
