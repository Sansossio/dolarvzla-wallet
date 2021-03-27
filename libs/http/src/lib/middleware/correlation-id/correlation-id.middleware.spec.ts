import { CorrelationIdMiddleware, CORRELATION_ID_HEADER_NAME } from './correlation-id.middleware'

describe('Correlation ID Middleware', () => {
  const next = jest.fn()
  const response = {} as any
  const service = new CorrelationIdMiddleware()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should set a correlation id value when this is not defined', () => {
    const request = {
      headers: {}
    }
    service.use(request as any, response, next)
    expect(typeof request.headers[CORRELATION_ID_HEADER_NAME]).toEqual('string')
    expect(next).toBeCalledTimes(1)
  })

  it('should set a correlation id value when this is not a string', () => {
    const request = {
      headers: {
        [CORRELATION_ID_HEADER_NAME]: 1
      }
    }
    service.use(request as any, response, next)
    expect(typeof request.headers[CORRELATION_ID_HEADER_NAME]).toEqual('string')
    expect(next).toBeCalledTimes(1)
  })

  it('shouldnt overwrite correlation id when it already exists', () => {
    const value = 'correlation-id'
    const request = {
      headers: {
        [CORRELATION_ID_HEADER_NAME]: value
      }
    }
    service.use(request as any, response, next)
    expect(request.headers[CORRELATION_ID_HEADER_NAME]).toEqual(value)
    expect(next).toBeCalledTimes(1)
  })
})
