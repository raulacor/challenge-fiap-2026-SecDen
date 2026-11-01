import test from 'node:test'
import assert from 'node:assert/strict'
import { analyzePassword, formatDuration } from '../hub/src/utils/crackTime.js'

test('senha vazia', () => {
  const r = analyzePassword('')
  assert.equal(r.seconds, 0)
  assert.equal(r.charsetSize, 0)
})

test('conjunto de caracteres', () => {
  assert.equal(analyzePassword('abc').charsetSize, 26)
  assert.equal(analyzePassword('aB1!').charsetSize, 95)
})

test('senha fraca e quebrada rapido', () => {
  assert.equal(analyzePassword('abc').tier.id, 'instant')
})

test('senha longa e variada e forte', () => {
  const id = analyzePassword('Xk9!mQ2#vL7$pR4&').tier.id
  assert.ok(id === 'strong' || id === 'unbreakable')
})

test('formatDuration', () => {
  assert.equal(formatDuration(0), '0 segundos')
  assert.equal(formatDuration(120), '2.0 minutos')
})
