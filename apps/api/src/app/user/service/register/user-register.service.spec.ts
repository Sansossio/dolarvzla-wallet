import { ConflictException } from '@nestjs/common'
import { RegisterUserDtoRequest } from '../../dto/request/register-user.dto.request'
import { UserRegisterService } from './user-register.service'

describe('User Register service', () => {
  const mockedBody: RegisterUserDtoRequest = {
    email: 'myemail',
    password: 'mypassword'
  }

  const repository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn()
  }

  const btcService = {
    createRandomWallet: jest.fn()
  }

  const service = new UserRegisterService(
    repository as any,
    btcService as any
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

  it('shouldnt create user when create wallet fails', async () => {
    btcService.createRandomWallet.mockImplementation(async () => Promise.reject(new Error()))

    await expect(service.register(mockedBody)).rejects.toBeInstanceOf(Error)

    expect(btcService.createRandomWallet).toBeCalledTimes(1)
    expect(repository.save).toBeCalledTimes(0)
  })

  it('should create user and wallet', async () => {
    btcService.createRandomWallet.mockImplementation(async () => ({ name: 'test', address: 'address' }))
    await expect(service.register(mockedBody)).resolves.toMatchSnapshot()

    expect(btcService.createRandomWallet).toBeCalledTimes(1)
    expect(repository.save).toBeCalledTimes(1)
  })
})
