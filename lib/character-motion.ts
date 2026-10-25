export type Motion = { x: number; velocity: number }

/** Acceleration-limited travel with braking; dt is capped after a suspended tab. */
export function stepCharacter(state: Motion, target: number, elapsed: number, maxSpeed: number): Motion {
  const dt = Math.max(0, Math.min(elapsed, 1 / 30))
  const distance = target - state.x
  if (Math.abs(distance) < .05 && Math.abs(state.velocity) < 1) return { x: target, velocity: 0 }
  const acceleration = maxSpeed * 5
  const desired = Math.sign(distance) * Math.min(maxSpeed, Math.sqrt(2 * acceleration * Math.abs(distance)))
  const velocity = state.velocity + Math.max(-acceleration * dt, Math.min(acceleration * dt, desired - state.velocity))
  const x = state.x + velocity * dt
  if (distance !== 0 && Math.sign(target - x) !== Math.sign(distance)) return { x: target, velocity: 0 }
  return { x, velocity }
}

/** One full gait cycle per stride, independent of frame rate and journey length. */
export function gaitFrame(distance: number, bodyHeight: number): number {
  return Math.floor(Math.max(0, distance) / (bodyHeight * 1.15) * 8) % 8
}
