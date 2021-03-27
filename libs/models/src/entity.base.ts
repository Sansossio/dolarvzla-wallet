import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class EntityBase {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    type: 'timestamptz'
  })
  createAt: Date

  @UpdateDateColumn({
    type: 'timestamptz'
  })
  updateAt: Date
}
