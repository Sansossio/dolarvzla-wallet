import { Injectable } from '@nestjs/common'
import { Currency } from '@dolarvzla-wallet/models'
import { CronBase } from '../cron.base'

@Injectable()
export class BtcHistoryCron extends CronBase {
  readonly currency = Currency.BITCOIN
}
