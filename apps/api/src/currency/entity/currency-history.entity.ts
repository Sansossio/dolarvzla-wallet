import { Column, Entity } from 'typeorm'
import { EntityBase } from '../../app/database/entity.base'
import { Currency } from '../enum/currency.enum'

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
