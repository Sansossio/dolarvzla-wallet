import { BitcoinSchedule } from './bitcoin.schedule'
import { AvailableMethodsRpc } from './dto/available-methods.enum'

describe('BitcoinSchedule', () => {
  const service = {
    listWallets: jest.fn(),
    generateNewAddress: jest.fn(),
    rpcRequest: jest.fn()
  }
  const config = {
    get: jest.fn()
  }

  const schedule = new BitcoinSchedule(
    service as any,
    config as any
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(schedule).toBeDefined()
  })

  it('shouldnt call service when is disabled by configuration', async () => {
    config.get.mockImplementation(() => ({ enable: false }))

    await expect(schedule.cronAutoGenerateBlocks()).resolves.toBeUndefined()

    expect(service.listWallets).toBeCalledTimes(0)
    expect(service.generateNewAddress).toBeCalledTimes(0)
    expect(service.rpcRequest).toBeCalledTimes(0)
  })

  it('should call generateNewAddress and rpcRequest N times (N = total wallets)', async () => {
    config.get.mockImplementation(() => ({ enable: true }))
    const wallets = [
      'wallet1',
      'wallet2',
      'wallet3'
    ]
    service.listWallets.mockImplementation(async () => Promise.resolve(wallets))

    await expect(schedule.cronAutoGenerateBlocks()).resolves.toBeUndefined()

    expect(service.listWallets).toBeCalledTimes(1)
    expect(service.generateNewAddress).toBeCalledTimes(wallets.length)
    expect(service.rpcRequest).toBeCalledTimes(wallets.length)
  })

  describe('RpcRequest', () => {
    it('should be called with address and amount', async () => {
      const address = 'address'
      const amount = 10
      const wallets = [
        'wallet1'
      ]

      config.get.mockImplementation(() => ({ enable: true, amount }))
      service.listWallets.mockImplementation(async () => Promise.resolve(wallets))
      service.generateNewAddress.mockImplementation(async () => Promise.resolve(address))

      await expect(schedule.cronAutoGenerateBlocks()).resolves.toBeUndefined()

      expect(service.rpcRequest).toBeCalledWith(AvailableMethodsRpc.GENERATETOADDRESS, [amount, address])
    })
  })
})
