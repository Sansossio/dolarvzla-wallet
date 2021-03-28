import { Injectable } from '@nestjs/common'
import { Currency } from '@dolarvzla-wallet/models'
import { BitcoinService } from '../service'
import { BaseService } from '../service/base.service'

@Injectable()
export class WalletOrchestrator {
  constructor (
    private readonly btcService: BitcoinService
  ) {}

  getHandler (type: Currency): BaseService {
    const servicesList: BaseService[] = [
      this.btcService
    ]

    for (const service of servicesList) {
      if (service.type === type) {
        return service
      }
    }

    throw new Error(`Handler not found for type: ${type}`)
  }
}
