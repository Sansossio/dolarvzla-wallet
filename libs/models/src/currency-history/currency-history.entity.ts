import { Column, Entity } from 'typeorm'
import { Currency } from '../currency/currency.enum'
import { EntityBase } from '../entity.base'

@Entity({ name: 'currency_history' })
export class CurrencyHistoryEntity extends EntityBase {
  @Column({
    type: 'varchar',
    length: 4
  })
  name: Currency

  @Column({
    type: 'float'
  })
  price: number
}
