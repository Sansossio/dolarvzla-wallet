import { Injectable } from '@nestjs/common'
import { BitcoinService } from './bitcoin.service'
import * as ms from 'ms'
import { Interval } from '@nestjs/schedule'
import { ConfigService } from '@nestjs/config'
import { AvailableMethodsRpc } from './dto/available-methods.enum'

const INTERVAL_GENERATE_BLOCKS = ms('30s')

@Injectable()
export class BitcoinSchedule {
  constructor (
    private readonly service: BitcoinService,
    private readonly config: ConfigService
  ) {}

  @Interval(INTERVAL_GENERATE_BLOCKS)
  async cronAutoGenerateBlocks () {
    const config = this.config.get('bitcoin.autoGenerateBlocks')
    if (!config.enable) {
      return
    }
    const listWallets = await this.service.listWallets()
    await Promise.all(
      listWallets.map(async (wallet) => {
        const address = await this.service.generateNewAddress(wallet)
        await (this.service as any).rpcRequest(AvailableMethodsRpc.GENERATETOADDRESS, [config.amount, address])
      })
    )
  }
}
