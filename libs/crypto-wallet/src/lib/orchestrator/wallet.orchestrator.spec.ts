import { WalletOrchestrator } from './wallet.orchestrator'
import { Currency } from '@dolarvzla-wallet/models'

describe('WalletOrchestrator', () => {
  const btcService = {
    type: Currency.BITCOIN
  }

  const orchestrator = new WalletOrchestrator(
    btcService as any
  )

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should be defined', () => {
    expect(orchestrator).toBeDefined()
  })

  it('should throw error when a handler does not exists', () => {
    expect(() => orchestrator.getHandler('doesnotexists' as any)).toThrow()
  })

  it('should return handler', () => {
    expect(orchestrator.getHandler(Currency.BITCOIN)).toEqual(btcService)
  })
})
