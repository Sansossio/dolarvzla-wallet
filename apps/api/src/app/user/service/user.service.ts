import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@dolarvzla-wallet/models'
import { RegisterUserDtoRequest } from '../dto/request/register-user.dto.request'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

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
      password: body.password
    })

    await this.repository.save(newUser)
  }
}
