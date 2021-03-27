import { clearToken } from './clear-token.utils'

describe('Clear token', () => {
  it('should clear token', () => {
    const token = 'Bearer 1'
    expect(clearToken(token)).toEqual('1')
  })

  it('should remove bearer when is lowercase', () => {
    const token = 'bearer 1'
    expect(clearToken(token)).toEqual('1')
  })

  it('should return the same token when bearer word does not exists', () => {
    const token = '1'
    expect(clearToken(token)).toEqual('1')
  })

  it('you should remove bearer only when this word is at the beginning of the string', () => {
    const token = '1 Bearer 1'
    expect(clearToken(token)).toEqual('1 Bearer 1')
  })
})
