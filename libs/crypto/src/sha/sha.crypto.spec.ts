import { ShaCrypto } from './sha.crypto'

describe('ShaCrypto', () => {
  it('hash', () => {
    expect(ShaCrypto.hash('test text')).toBe('D0Zzjr7TcMXFLuCtlt7I9Fn7kBwspOKFIR7d+QO/FZg=')
  })
})
