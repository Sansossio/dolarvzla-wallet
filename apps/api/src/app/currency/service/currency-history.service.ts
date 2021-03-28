import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CurrencyHistoryEntity } from '@dolarvzla-wallet/models'
import { GetCurrencyPriceRequestDto } from '../dto/request/get-currency-price.dto.request'
import { GetCurrencyPriceDtoResponse } from '../dto/response/get-currency-price.dto.response'

@Injectable()
export class CurrencyHistoryService {
  constructor (
    @InjectRepository(CurrencyHistoryEntity)
    private readonly repository: Repository<CurrencyHistoryEntity>
  ) {}

  async getCurrencyPrice (query: GetCurrencyPriceRequestDto): Promise<GetCurrencyPriceDtoResponse> {
    const data = await this.repository.findOne({
      where: {
        currency: query.currency
      },
      order: {
        createAt: 'DESC'
      },
      select: [
        'price',
        'createAt'
      ]
    })

    if (!data) {
      throw new NotFoundException()
    }

    return {
      currency: query.currency,
      price: data.price,
      lastUpdate: data.createAt
    }
  }
}
