import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm'
import { Currency } from '../currency'
import { EntityBase } from '../entity.base'
import { UserEntity } from './user.entity'
import { cryptoConfig } from '../configuration/crypto.config'
import { AesCrypto } from '@dolarvzla-wallet/crypto'

@Entity('user_wallet')
export class UserWalletEntity extends EntityBase {
  @Column({
    type: 'varchar',
    length: 4
  })
  type: Currency

  @Column()
  walletId: string

  @Column()
  address: string

  @ManyToOne('UserEntity', 'id', { nullable: false })
  user: Promise<UserEntity>

  @BeforeInsert()
  @BeforeUpdate()
  encryptData () {
    this.walletId = AesCrypto.encrypt(this.walletId, cryptoConfig().encryptionSecret)
    this.address = AesCrypto.encrypt(this.address, cryptoConfig().encryptionSecret)
  }

  @AfterLoad()
  decrypt () {
    this.walletId = AesCrypto.decrypt(this.walletId, cryptoConfig().encryptionSecret)
    this.address = AesCrypto.decrypt(this.address, cryptoConfig().encryptionSecret)
  }
}
