import { BitcoinService } from './bitcoin.service'

describe('BitcoinService', () => {
  const mockPost = jest.fn()
  const httpService = {
    post: () => ({ toPromise: mockPost })
  }
  const configService = {
    get: jest.fn()
  }

  const service = new BitcoinService(
    httpService as any,
    configService as any
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should match snapshot', async () => {
    mockPost
      .mockImplementationOnce(async () => ({ data: { result: { name: 'wallletName' } } }))
      .mockImplementationOnce(async () => ({ data: { result: 'walletAddress' } }))

    await expect(service.createRandomWallet()).resolves.toMatchSnapshot()
  })
})
