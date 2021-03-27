import { Injectable } from '@nestjs/common'
import { Currency } from '../../../enum/currency.enum'
import { CronBase } from '../cron.base'

@Injectable()
export class EthHistoryCron extends CronBase {
  readonly name = Currency.ETHEREUM
}
