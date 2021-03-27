import { Injectable } from '@nestjs/common'
import { Currency } from '../../../enum/currency.enum'
import { CronBase } from '../cron.base'

@Injectable()
export class BtcHistoryCron extends CronBase {
  readonly name = Currency.BITCOIN
}
