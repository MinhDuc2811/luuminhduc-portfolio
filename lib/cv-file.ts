import { createDecipheriv } from 'node:crypto'

// Format: magic (4 bytes), IV (12), authentication tag (16), ciphertext.
export function decryptCv(file: Buffer, key: string): Buffer {
  if (!/^[a-f\d]{64}$/i.test(key) || file.length < 33 || file.subarray(0, 4).toString() !== 'CV01') {
    throw new Error('Invalid encrypted CV or key')
  }
  const decipher = createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), file.subarray(4, 16))
  decipher.setAAD(Buffer.from('portfolio-cv:v1'))
  decipher.setAuthTag(file.subarray(16, 32))
  return Buffer.concat([decipher.update(file.subarray(32)), decipher.final()])
}
