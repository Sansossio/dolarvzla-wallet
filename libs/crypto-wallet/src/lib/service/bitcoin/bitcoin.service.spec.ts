import { BitcoinService } from './bitcoin.service'
import { AvailableMethodsRpc } from './dto/available-methods.enum'

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

  describe('createRandomWallet', () => {
    it('should match snapshot', async () => {
      mockPost
        .mockImplementationOnce(async () => ({ data: { result: { name: 'wallletName' } } }))
        .mockImplementationOnce(async () => ({ data: { result: 'walletAddress' } }))

      await expect(service.createRandomWallet()).resolves.toMatchSnapshot()
    })
  })

  describe('generateNewAddress', () => {
    it('should match snapshot', async () => {
      const walletName = 'MY_WALLET'
      mockPost.mockImplementation(async () => ({ data: { result: walletName } }))

      await expect(service.generateNewAddress(walletName)).resolves.toMatchSnapshot()
    })

    it('should called with empty params and wallet name', async () => {
      const walletName = 'MY_WALLET'
      const rpcRequest = jest.spyOn(service, 'rpcRequest' as any)

      await service.generateNewAddress(walletName)

      expect(rpcRequest).toBeCalledWith(AvailableMethodsRpc.GETNEWADDRESS, [], `wallet/${walletName}`)
    })
  })
})
