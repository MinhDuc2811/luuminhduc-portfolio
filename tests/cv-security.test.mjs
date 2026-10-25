import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createCipheriv, randomBytes } from 'node:crypto'
import { createCvToken, cvConfigured, passwordMatches, verifyCvToken } from '../lib/cv-token.ts'
import { decryptCv } from '../lib/cv-file.ts'

const now = 1_800_000_000_000
process.env.CV_LINK_SECRET = randomBytes(32).toString('hex')
process.env.CV_ENCRYPTION_KEY = randomBytes(32).toString('hex')
process.env.CV_ACCESS_PASSWORD = randomBytes(32).toString('hex')

test('CV sessions reject expired, future, tampered, malformed and old URL tokens', () => {
  const token = createCvToken(now)
  assert.ok(verifyCvToken(token, now))
  assert.equal(verifyCvToken(token, now + 300_000), false)
  assert.equal(verifyCvToken(token, now - 1), false)
  assert.equal(verifyCvToken(token.slice(0, -1) + (token.endsWith('0') ? '1' : '0'), now), false)
  for (const invalid of [undefined, '', 'Infinity', '1234.abc', '1792739776618.deadbeef']) {
    assert.equal(verifyCvToken(invalid, now), false)
  }
  assert.notEqual(createCvToken(now), createCvToken(now))
})

test('access fails closed without configuration and rejects incorrect passwords', () => {
  assert.ok(passwordMatches(process.env.CV_ACCESS_PASSWORD))
  assert.equal(passwordMatches('incorrect'), false)
  const secret = process.env.CV_LINK_SECRET
  const token = createCvToken(now)
  delete process.env.CV_LINK_SECRET
  assert.equal(cvConfigured(), false)
  assert.equal(passwordMatches(process.env.CV_ACCESS_PASSWORD), false)
  assert.equal(verifyCvToken(token, now), false)
  assert.throws(() => createCvToken())
  process.env.CV_LINK_SECRET = secret
})

test('AES-GCM decrypts authentic content and rejects wrong keys or tampering', () => {
  const key = randomBytes(32)
  const iv = randomBytes(12)
  const pdf = Buffer.from('%PDF-1.7 test fixture')
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  cipher.setAAD(Buffer.from('portfolio-cv:v1'))
  const encrypted = Buffer.concat([cipher.update(pdf), cipher.final()])
  const file = Buffer.concat([Buffer.from('CV01'), iv, cipher.getAuthTag(), encrypted])
  assert.deepEqual(decryptCv(file, key.toString('hex')), pdf)
  assert.throws(() => decryptCv(file, randomBytes(32).toString('hex')))
  const corrupt = Buffer.from(file)
  corrupt[corrupt.length - 1] ^= 1
  assert.throws(() => decryptCv(corrupt, key.toString('hex')))
  assert.throws(() => decryptCv(Buffer.from('invalid'), key.toString('hex')))
})
