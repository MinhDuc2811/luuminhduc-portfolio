import { test } from 'node:test'
import assert from 'node:assert/strict'
import { stepCharacter, gaitFrame } from '../lib/character-motion.ts'

test('travel accelerates, brakes and reaches a checkpoint without overshooting', () => {
  let state = { x: 0, velocity: 0 }
  const positions = []
  for (let i = 0; i < 1000; i++) {
    state = stepCharacter(state, 200, 1 / 60, 80)
    assert.ok(state.x >= 0 && state.x <= 200)
    assert.ok(Math.abs(state.velocity) <= 80)
    positions.push(state.x)
  }
  assert.deepEqual(state, { x: 200, velocity: 0 })
  assert.ok(positions[0] < positions[60] && positions[60] < positions[120])
})

test('reversal brakes before changing direction instead of flipping at full speed', () => {
  let state = { x: 100, velocity: 80 }
  const first = stepCharacter(state, 0, 1 / 60, 80)
  assert.ok(first.velocity > 0 && first.velocity < 80)
  for (let i = 0; i < 500; i++) state = stepCharacter(state, 0, 1 / 60, 80)
  assert.deepEqual(state, { x: 0, velocity: 0 })
})

test('same travelled distance has the same gait at different update rates', () => {
  const integrate = dt => {
    let state = { x: 0, velocity: 0 }, distance = 0
    for (let t = 0; t < 5; t += dt) {
      const next = stepCharacter(state, 200, dt, 80)
      distance += Math.abs(next.x - state.x)
      state = next
    }
    return gaitFrame(distance, 64)
  }
  assert.equal(integrate(1 / 30), integrate(1 / 120))
  assert.equal(gaitFrame(0, 64), gaitFrame(64 * 1.15, 64))
})

test('a long background-tab interval cannot teleport the actor', () => {
  const result = stepCharacter({ x: 0, velocity: 0 }, 1000, 60, 80)
  assert.ok(result.x < 1)
  assert.equal(stepCharacter({ x: 10, velocity: 0 }, 10, 1 / 60, 80).x, 10)
})
