import { HttpService, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NewWalletDto } from './dto/new-wallet.dto'

@Injectable()
export abstract class BaseService {
  constructor (
    protected readonly httpService: HttpService,
    protected readonly config: ConfigService
  ) {}

  abstract createRandomWallet (): Promise<NewWalletDto>

  abstract listWallets (): Promise<string[]>

  abstract generateNewAddress (walletName: string): Promise<string>
}
