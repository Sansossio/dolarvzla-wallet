import { Roles } from '../../decorators/min-role/roles.enum'
import { LoggedGuard } from './logged.guard'

describe('Logged guard', () => {
  const reflector = {
    get: jest.fn()
  }
  const guard = new LoggedGuard(reflector as any)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return true when endpoint role is NONE', () => {
    reflector.get.mockImplementation(() => (Roles.NONE))
    const context = {
      getHandler () {
        return {}
      },
      switchToHttp () {
        return {
          getRequest () {
            return {
              tokenData: null
            }
          }
        }
      }
    }

    expect(guard.canActivate(context as any)).toEqual(true)
  })

  it('should return true when req.user is defined', () => {
    reflector.get.mockImplementation(() => (Roles.USER))
    const context = {
      getHandler () {
        return {}
      },
      switchToHttp () {
        return {
          getRequest () {
            return {
              tokenData: {
                sub: 1
              }
            }
          }
        }
      }
    }

    expect(guard.canActivate(context as any)).toEqual(true)
  })

  it('should return false', () => {
    reflector.get.mockImplementation(() => (Roles.USER))
    const context = {
      getHandler () {
        return {}
      },
      switchToHttp () {
        return {
          getRequest () {
            return {
              tokenData: null
            }
          }
        }
      }
    }

    expect(guard.canActivate(context as any)).toEqual(false)
  })
})
