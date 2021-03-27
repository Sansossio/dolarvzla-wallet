import * as crypto from 'crypto'

const IV_LENGTH = 16
const SALT_LENGTH = 64
const ALGORITHM = 'aes-256-gcm'

// Source: https://gist.github.com/AndiDittrich/4629e7db04819244e843
export class AesCrypto {
  static encrypt (text: string, secret: string): string {
    if (!text) {
      return text
    }

    // random initialization vector
    const iv = crypto.randomBytes(IV_LENGTH)

    // random salt
    const salt = crypto.randomBytes(SALT_LENGTH)

    // derive encryption key: 32 byte key length
    // in assumption the masterkey is a cryptographic and NOT a password there is no need for
    // a large number of iterations. It may can replaced by HKDF
    // the value of 2145 is randomly chosen!
    const key = crypto.pbkdf2Sync(secret, salt, 2145, 32, 'sha512')

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

    // encrypt the given text
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])

    // extract the auth tag
    const tag = cipher.getAuthTag()

    // generate output
    return Buffer.concat([salt, iv, tag, encrypted]).toString('base64')
  }

  static decrypt (encdata: string, secret: string): string {
    if (!encdata) {
      return encdata
    }

    // base64 decoding
    const bData = Buffer.from(encdata, 'base64')

    // convert data to buffers
    const salt = bData.slice(0, SALT_LENGTH)
    const iv = bData.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH)
    const tag = bData.slice(80, 96)
    const text = bData.slice(96)

    // derive key using 32 byte key length
    const key = crypto.pbkdf2Sync(secret, salt , 2145, 32, 'sha512')

    // AES 256 GCM Mode
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(tag)

    // encrypt the given text
    const decrypted = `${(decipher as any).update(text, 'binary', 'utf8')}${(decipher as any).final('utf8')}`

    return decrypted
  }
}
