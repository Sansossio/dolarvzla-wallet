import { JwtMiddleware } from './jwt.middleware'

describe('Jwt Middleware', () => {
  const next: any = () => true
  const jwtService = {
    decode: jest.fn()
  }

  const service = new JwtMiddleware(
    jwtService as any
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Use', () => {
    it('should add objects to req', async () => {
      jwtService.decode.mockImplementation(() => ({ sub: 'ababe672-36d2-4d45-839a-34babe67289e' }))

      const req: any = {
        headers: {
          authorization: 'token'
        }
      }

      await service.use(req, null, next)

      expect(req).toMatchSnapshot()
    })

    it('should add objects to req when casting userId (sub attribute)', async () => {
      jwtService.decode.mockImplementation(() => ({ sub: '42' }))

      const req: any = {
        headers: {
          authorization: 'token'
        }
      }

      await service.use(req, null, next)

      expect(req).toMatchSnapshot()
    })

    it('should ignore implementation when token is not string', async () => {
      jwtService.decode.mockImplementation(() => (true))

      const req: any = {
        headers: {
          authorization: true
        }
      }

      await service.use(req, null, next)
      expect(req).toMatchSnapshot()
    })

    it('should ignore error when userId (sub attribute) is not valid', async () => {
      jwtService.decode.mockImplementation(() => ({ sub: 'wrong' }))

      const req: any = {
        headers: {
          authorization: 'token'
        }
      }
      await service.use(req, null, next)
      expect(req).toMatchSnapshot()
    })

    it('should ignore error on implementation', async () => {
      jwtService.decode.mockImplementation(() => {
        throw new Error()
      })

      const req: any = {
        headers: {
          authorization: 'token'
        }
      }

      await service.use(req, null, next)
      expect(req).toMatchSnapshot()
    })
  })
})
