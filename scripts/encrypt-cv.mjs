import { createCipheriv, randomBytes } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'

const [input, output] = process.argv.slice(2)
const key = process.env.CV_ENCRYPTION_KEY
if (!input || !output || !/^[a-f\d]{64}$/i.test(key || '')) {
  throw new Error('Usage: node --env-file=.env.local scripts/encrypt-cv.mjs INPUT.pdf OUTPUT.pdf.enc; CV_ENCRYPTION_KEY must be 64 hex characters')
}
const pdf = await readFile(input)
if (!pdf.subarray(0, 1024).includes(Buffer.from('%PDF-'))) throw new Error('Input is not a PDF')
const iv = randomBytes(12)
const cipher = createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv)
cipher.setAAD(Buffer.from('portfolio-cv:v1'))
const ciphertext = Buffer.concat([cipher.update(pdf), cipher.final()])
await writeFile(output, Buffer.concat([Buffer.from('CV01'), iv, cipher.getAuthTag(), ciphertext]), { flag: 'wx', mode: 0o600 })
console.log('Encrypted CV written. Keep the key in server-side secret storage.')
