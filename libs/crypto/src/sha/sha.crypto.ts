import * as crypto from 'crypto'

const ALGORITHM = 'sha256'
const ENCODING = 'base64'

export class ShaCrypto {
  static hash (text: string): string {
    return crypto.createHash(ALGORITHM).update(text).digest(ENCODING)
  }
}
