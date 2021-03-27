import { HttpService, Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CurrencyHistoryEntity } from '../../entity/currency-history.entity'
import { Currency } from '../../enum/currency.enum'
import ms from 'ms'
import { ConfigService } from '@nestjs/config'

const INTERVAL = ms('30s')

@Injectable()
export abstract class CronBase {
  abstract readonly name: Currency

  constructor (
    @InjectRepository(CurrencyHistoryEntity)
    private readonly repository: Repository<CurrencyHistoryEntity>,

    protected readonly httpService: HttpService,
    private readonly config: ConfigService
  ) {}

  private getCoinbaseApiUrl () {
    return this.config.get<string>(`currency.prices.coinbase.${this.name}`)
  }

  private async getPrice (): Promise<number> {
    const {
      data: {
        data: {
          amount
        }
      }
    } = await this.httpService.get(this.getCoinbaseApiUrl()).toPromise()

    return +amount
  }

  @Interval(INTERVAL)
  async update () {
    await this.repository.save({ name: this.name, price: await this.getPrice() })
  }
}
