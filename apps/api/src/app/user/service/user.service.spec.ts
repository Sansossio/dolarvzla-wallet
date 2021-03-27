import { ConflictException } from '@nestjs/common'
import { RegisterUserDtoRequest } from '../dto/request/register-user.dto.request'
import { UserService } from './user.service'

describe('User service', () => {
  const mockedBody: RegisterUserDtoRequest = {
    email: 'myemail',
    password: 'mypassword'
  }

  const repository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn()
  }
  const service = new UserService(
    repository as any
  )

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should throw conflict error when the user already exists', async () => {
    repository.findOne.mockImplementation(async () => ({ id: 1 }))

    await expect(service.register(mockedBody)).rejects.toBeInstanceOf(ConflictException)
  })

  it('should return undefined', async () => {
    await expect(service.register(mockedBody)).resolves.toMatchSnapshot()
  })
})
