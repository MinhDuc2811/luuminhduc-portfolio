'use client'

import { useEffect, useRef, useState } from 'react'
import { gaitFrame, stepCharacter } from '@/lib/character-motion'
import type { StoryChapter } from '@/lib/story'
import type { Locale } from '@/lib/proposal-content'

// All states use ONE 4x3 atlas. Anchors register head position and ground contact
// without resampling or rewriting the generated image. Cells are 362px square.
const FRAMES = [
  { head: 228, foot: 353 }, { head: 190, foot: 353 },
  { head: 178.5, foot: 353 }, { head: 177, foot: 353 },
  { head: 228, foot: 342 }, { head: 202, foot: 341 },
  { head: 187, foot: 342 }, { head: 191, foot: 341 },
  { head: 209, foot: 344 }, { head: 184, foot: 344 },
  { head: 171, foot: 344 }, { head: 170.5, foot: 344 },
]

export default function CharacterActor({ progress, pose, locale, open, onTalk }: {
  progress: number; pose: StoryChapter['pose']; locale: Locale; open: boolean; onTalk: () => void;
}) {
  const traveler = useRef<HTMLButtonElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const target = useRef(progress)
  const currentPose = useRef(pose)
  const wake = useRef<() => void>(() => {})
  useEffect(() => { target.current = progress; wake.current() }, [progress])
  useEffect(() => { currentPose.current = pose; wake.current() }, [pose])

  useEffect(() => {
    const button = traveler.current
    const node = canvas.current
    const context = node?.getContext('2d')
    if (!button || !node || !context) return
    const atlas = new window.Image()
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const compact = matchMedia('(max-width: 640px)')
    let height = compact.matches ? 48 : 64
    const destination = () => innerWidth * (.04 + target.current * .8) - target.current * 48
    let motion = { x: destination(), velocity: 0 }
    let distance = 0, lastTime = 0, lastFrame = -1, lastHeight = 0, raf = 0
    let wasMoving = false, facing = 1, poseSince = 0, previousPose = currentPose.current
    let loaded = false, alive = true
    let sleep: ReturnType<typeof setTimeout> | undefined
    function draw(frame: number) {
      if (!loaded || (frame === lastFrame && height === lastHeight)) return
      lastFrame = frame
      button!.dataset.frame = String(frame)
      lastHeight = height
      const anchor = FRAMES[frame]
      const scale = height / 338
      context!.clearRect(0, 0, 96, 96)
      context!.drawImage(atlas, frame % 4 * 362, Math.floor(frame / 4) * 362, 362, 362,
        48 - anchor.head * scale, 80 - anchor.foot * scale, 362 * scale, 362 * scale)
    }
    function tick(now: number) {
      raf = 0
      if (!alive || document.hidden) { raf = 0; return }
      const dt = lastTime ? (now - lastTime) / 1000 : 0
      lastTime = now
      const before = motion.x
      if (reduced.matches) motion = { x: destination(), velocity: 0 }
      else motion = stepCharacter(motion, destination(), dt, height * 1.2)
      const moving = Math.abs(motion.velocity) > .5 || Math.abs(destination() - motion.x) > .1
      if (moving && !wasMoving) distance = 0
      distance += Math.abs(motion.x - before)
      if (Math.abs(motion.velocity) > 1) facing = Math.sign(motion.velocity)
      button!.style.transform = `translate3d(${motion.x.toFixed(2)}px,0,0)`
      button!.style.setProperty('--character-direction', String(facing))
      button!.classList.toggle('is-walking', moving)
      button!.classList.toggle('is-idle', !moving)
      button!.dataset.motion = moving ? 'walk' : 'idle'
      if (previousPose !== currentPose.current) { previousPose = currentPose.current; poseSince = now }
      if (wasMoving && !moving) poseSince = now
      const greeting = currentPose.current === 'wave' && now - poseSince < 3000
      const blink = now % 4800 > 4650
      draw(moving ? gaitFrame(distance, height) : reduced.matches ? 8 : greeting ? 10 + Math.floor(now / 350) % 2 : blink ? 9 : 8)
      wasMoving = moving
      // Resting poses redraw only when a blink or greeting frame changes.
      if (moving) raf = requestAnimationFrame(tick)
      else sleep = setTimeout(() => { raf = requestAnimationFrame(tick) }, 100)
    }
    wake.current = () => {
      clearTimeout(sleep)
      if (!raf && loaded && !document.hidden) raf = requestAnimationFrame(tick)
    }
    function resize() {
      height = compact.matches ? 48 : 64
      // Resizing changes the coordinate system, not the character's walking speed.
      motion = { x: destination(), velocity: 0 }
      const dpr = Math.min(devicePixelRatio || 1, 2)
      node!.width = 96 * dpr
      node!.height = 96 * dpr
      context!.setTransform(dpr, 0, 0, dpr, 0, 0)
      context!.imageSmoothingEnabled = false
      lastFrame = -1
      lastTime = 0
      if (loaded) { draw(8); wake.current() }
    }
    function visibility() {
      cancelAnimationFrame(raf)
      clearTimeout(sleep)
      raf = 0
      lastTime = 0
      if (!document.hidden && loaded) raf = requestAnimationFrame(tick)
    }
    atlas.onload = () => {
      if (!alive) return
      loaded = true
      resize()
      setReady(true)
    }
    atlas.src = '/character/duc-atlas.png'
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', visibility)
    reduced.addEventListener('change', visibility)
    return () => {
      alive = false
      clearTimeout(sleep)
      wake.current = () => {}
      cancelAnimationFrame(raf)
      atlas.onload = null
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', visibility)
      reduced.removeEventListener('change', visibility)
    }
  }, [])
  return <button ref={traveler} type="button" className={`character-traveler story-character is-idle pose-${pose}`} data-motion="idle"
    aria-label={locale === 'vi' ? 'Trò chuyện với Đức' : 'Talk to Duc'} aria-expanded={open} aria-controls={open ? 'story-note' : undefined} onClick={onTalk}>
    <span className="character-shadow" aria-hidden="true" />
    <span className="character-facing" aria-hidden="true"><canvas ref={canvas} className="character-atlas" width={96} height={96} />{!ready && <span className="character-loading">···</span>}</span>
    <span className="character-prop" aria-hidden="true"><i /><b /></span>
    <span className="character-talk-hint" aria-hidden="true">{open ? '×' : '···'}</span>
  </button>
}
