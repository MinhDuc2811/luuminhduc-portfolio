'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const SCENERY = [
  '/scenery/01-pre-dawn.png', '/scenery/02-sunrise.png', '/scenery/03-morning.png',
  '/scenery/04-midday.png', '/scenery/05-sunset.png', '/scenery/06-twilight.png', '/scenery/07-deep-night.png',
]
const TREES = [0, 80, 155, 260, 365, 510, 650, 790, 925, 1040, 1140, 1260, 1375]

export default function HeroScene({ progress }: { progress: number }) {
  const root = useRef<HTMLDivElement>(null)
  const position = Math.min(1, Math.max(0, progress)) * (SCENERY.length - 1)
  const activeIndex = Math.min(SCENERY.length - 2, Math.floor(position))
  const fade = position - activeIndex
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const fine = matchMedia('(pointer: fine)')
    let targetX = 0, targetY = 0, x = 0, y = 0, frame = 0
    const tick = () => {
      x += (targetX - x) * .09
      y += (targetY - y) * .09
      root.current?.style.setProperty('--pointer-x', `${x.toFixed(2)}px`)
      root.current?.style.setProperty('--pointer-y', `${y.toFixed(2)}px`)
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > .1 ? requestAnimationFrame(tick) : 0
    }
    const move = (event: PointerEvent) => {
      if (preference.matches || !fine.matches || document.hidden) return
      targetX = (event.clientX / innerWidth - .5) * 20
      targetY = (event.clientY / innerHeight - .5) * 10
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const reset = () => {
      targetX = targetY = 0
      cancelAnimationFrame(frame)
      frame = 0
      x = y = 0
      root.current?.style.setProperty('--pointer-x', '0px')
      root.current?.style.setProperty('--pointer-y', '0px')
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', reset)
    document.addEventListener('visibilitychange', reset)
    preference.addEventListener('change', reset)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', reset)
      document.removeEventListener('visibilitychange', reset)
      preference.removeEventListener('change', reset)
    }
  }, [])
  return <div ref={root} className="fixed inset-0 -z-10 overflow-hidden journey-scene" aria-hidden="true">
    <div className="parallax-scenery absolute inset-0">
      {SCENERY.map((src, i) => <div key={src} className="scenery-layer absolute inset-0" style={{ opacity: i === activeIndex ? 1 - fade : i === activeIndex + 1 ? fade : 0 }}>
        <Image src={src} alt="" fill priority={i === 0} className="object-cover object-bottom" sizes="100vw" />
      </div>)}
    </div>
    <div className="scene-reading-shade" />
    <div className="scene-mist" />
    <svg className="scene-foreground" viewBox="0 0 1440 150" preserveAspectRatio="none">
      <defs><path id="story-pine" d="M16 0 3 28h7L0 49h11L1 69h13v25h5V69h13L22 49h11L23 28h7Z" /></defs>
      <path d="M0 120 180 112 360 130 580 118 800 128 1020 113 1220 125 1440 110V150H0Z" fill="#080f18" />
      {TREES.map((x, i) => <use key={x} href="#story-pine" x={x} y={35 + i % 3 * 13} fill={i % 2 ? '#0a1520' : '#080f18'} />)}
    </svg>
  </div>
}
