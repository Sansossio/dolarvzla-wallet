import { Roles } from '../../decorators/min-role/roles.enum'
import { BaseGuard } from './base.guard'

describe('BaseGuard', () => {
  const reflector = {
    get: jest.fn()
  }
  const context = {
    getHandler: jest.fn()
  }
  const guard = new BaseGuard(reflector as any)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return Roles.USER when role is not define', () => {
    expect(guard.getRole(context as any)).toEqual(Roles.USER)
  })

  it('should return reflector.get response when is defined', () => {
    reflector.get.mockImplementation(() => (Roles.NONE))
    expect(guard.getRole(context as any)).toEqual(Roles.NONE)
  })
})
