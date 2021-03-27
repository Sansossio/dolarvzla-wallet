import { JwtService } from './jwt.service'

describe('Jwt service', () => {
  const jwtModule = {
    sign: jest.fn(),
    decode: jest.fn(),
    verify: jest.fn()
  }
  const configService = {
    get: jest.fn()
  }
  const service = new JwtService(configService as any)

  beforeEach(() => {
    jest.clearAllMocks()
    ;(service as any).jwt = jwtModule
  })

  it('should call jwtModule.sign', () => {
    service.sign({})
    expect(jwtModule.sign).toBeCalledTimes(1)
  })

  it('should call jwtModule.verify', () => {
    service.decode('')
    expect(jwtModule.verify).toBeCalledTimes(1)
  })

  it('should call return the jwtModule.verify response', async () => {
    const response = { val: 1 }
    jwtModule.verify.mockImplementation((token, secret, options, callback) => {
      callback(null, response)
    })
    await expect(service.verify('', '', {})).resolves.toEqual(response)
  })

  it('should throw an error jwtModule.verify', async () => {
    jwtModule.verify.mockImplementation((token, secret, options, callback) => {
      callback(new Error())
    })
    await expect(service.verify('', '', {})).rejects.toThrowError()
  })
})
