import { Injectable } from '@nestjs/common'
import { Currency } from '@dolarvzla-wallet/models'
import { CronBase } from '../cron.base'

@Injectable()
export class EthHistoryCron extends CronBase {
  readonly currency = Currency.ETHEREUM
}
