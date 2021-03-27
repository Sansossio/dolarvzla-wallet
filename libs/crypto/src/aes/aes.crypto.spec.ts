import { AesCrypto } from './aes.crypto'

const ORIGINAL = 'secret'
const SUBSCRIPTION_SECRET = 'X4p8CAaSJzVKILxJGJXdnO8ju2824mr2'

describe('AesCrypto', () => {

  it('encrypt: null text', () => {
    expect(AesCrypto.encrypt(null, '')).toEqual(null)
  })

  it('decrypt: wrong IV in encrypted string', () => {
    expect(() => AesCrypto.decrypt('x', SUBSCRIPTION_SECRET)).toThrowError()
  })

  it('decrypt: wrong data in encrypted string', () => {
    expect(() => AesCrypto.decrypt('8a71627b26188c5bcdd081b9a323170d:x', SUBSCRIPTION_SECRET))
      .toThrowError()
  })

  it('decrypt', () => {
    const encrypted = AesCrypto.encrypt(ORIGINAL, SUBSCRIPTION_SECRET)
    const decrypted = AesCrypto.decrypt(encrypted, SUBSCRIPTION_SECRET)
    expect(decrypted).toBe(ORIGINAL)
  })
})
