import { ForbiddenException } from '@nestjs/common'
import { getConnection } from 'typeorm'
import { UserEntity } from '@dolarvzla-wallet/models'
import { GetUserParameterDto } from './get-user.parameter.dto'
import { getUserId } from './get-user-id'

export async function getUser (req, param: GetUserParameterDto): Promise<UserEntity | null> {
  try {
    const repository = getConnection().getRepository(UserEntity)

    if (req.user) {
      return req.user
    }

    req.user = await repository.findOne(getUserId(req))

    return req.user
  } catch (e) {
    if (param?.nullable) {
      return null
    }

    throw new ForbiddenException()
  }
}
