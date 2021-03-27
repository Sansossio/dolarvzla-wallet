import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { UserEntity } from '@dolarvzla-wallet/models'
import { InjectRepository } from '@nestjs/typeorm'
import { LoginUserDtoRequest } from '../../dto/request/login-user.dto.request'
import { JwtCryptoService } from '@dolarvzla-wallet/jwt'
import { LoginUserDtoResponse } from '../../dto/response/login-user.dto.response'

@Injectable()
export class UserLoginService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,

    private readonly jwtService: JwtCryptoService
  ) {}

  async login (body: LoginUserDtoRequest): Promise<LoginUserDtoResponse> {
    const findUser = await this.repository.findOne({
      where: {
        email: body.email
      },
      select: [
        'id',
        'password'
      ]
    })

    if (!findUser || findUser.password !== body.password) {
      throw new UnauthorizedException()
    }

    return {
      token: this.jwtService.sign({ sub: findUser.id })
    }
  }
}
