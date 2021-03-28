import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Currency, UserEntity, UserWalletEntity } from '@dolarvzla-wallet/models'
import { RegisterUserDtoRequest } from '../../dto/request/register-user.dto.request'
import { BitcoinService } from '@dolarvzla-wallet/crypto-wallet'

@Injectable()
export class UserRegisterService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,

    private readonly btcService: BitcoinService
  ) {}

  private async generateBtcWallet (): Promise<UserWalletEntity> {
    const { name, address } = await this.btcService.createRandomWallet()

    return {
      type: Currency.BITCOIN,
      walletId: name,
      address
    } as any
  }

  private async generateWallets (): Promise<any> {
    return Promise.all([
      this.generateBtcWallet()
    ])
  }

  async register (body: RegisterUserDtoRequest) {
    const exists = !!await this.repository.findOne({
      where: {
        email: body.email
      },
      select: [
        'id'
      ]
    })
    if (exists) {
      throw new ConflictException('User already exists')
    }
    const newUser = this.repository.create({
      email: body.email,
      password: body.password,
      wallets: await this.generateWallets()
    })

    await this.repository.save(newUser)
  }
}
