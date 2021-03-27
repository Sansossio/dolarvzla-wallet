import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm'
import { EntityBase } from '../entity.base'
import { AesCrypto } from '@dolarvzla-wallet/crypto'
import { cryptoConfig } from '../configuration/crypto.config'
import { UserWalletEntity } from './user-wallet.entity'

@Entity('user')
export class UserEntity extends EntityBase {
  @Column({
    unique: true
  })
  email: string

  @Column()
  password: string

  @OneToMany('UserWalletEntity', 'user', { cascade: true })
  wallets: Promise<UserWalletEntity[]>

  @BeforeInsert()
  @BeforeUpdate()
  encryptData () {
    this.password = AesCrypto.encrypt(this.password, cryptoConfig().encryptionSecret)
  }

  @AfterLoad()
  decrypt () {
    this.password = AesCrypto.decrypt(this.password, cryptoConfig().encryptionSecret)
  }
}
