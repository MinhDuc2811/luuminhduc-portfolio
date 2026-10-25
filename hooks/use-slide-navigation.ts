'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const TRANSITION_MS = 480
const GESTURE_GAP_MS = 180

export function useSlideNavigation(count: number) {
  const [activeSlide, setActiveSlide] = useState(0)
  const active = useRef(0)
  const lockedUntil = useRef(0)
  const goTo = useCallback((index: number) => {
    const next = Math.min(count - 1, Math.max(0, index))
    if (next === active.current) return
    active.current = next
    lockedUntil.current = performance.now() + TRANSITION_MS
    setActiveSlide(next)
  }, [count])

  useEffect(() => {
    let lastWheel = -Infinity
    let wheelAmount = 0
    let wheelConsumed = false
    let touch: { x: number; y: number; top: boolean; bottom: boolean } | null = null
    const container = () => document.querySelector<HTMLElement>('.slide-scroll[data-active="true"]')
    const blocked = (target: EventTarget | null) => Boolean(document.querySelector('dialog[open]') ||
      (target instanceof Element && target.closest('input, textarea, select, [contenteditable="true"], [role="slider"], [data-story-ui]')))
    const edges = () => {
      const el = container()
      return { top: !el || el.scrollTop <= 2, bottom: !el || el.scrollTop + el.clientHeight >= el.scrollHeight - 2 }
    }
    const canLeave = (direction: number) => direction > 0 ? edges().bottom : edges().top
    const navigate = (direction: number) => {
      if (performance.now() < lockedUntil.current) return
      goTo(active.current + direction)
    }
    function onWheel(event: WheelEvent) {
      if (blocked(event.target) || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      const now = performance.now()
      const fresh = now - lastWheel > GESTURE_GAP_MS
      lastWheel = now
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1)
      if (fresh) { wheelAmount = 0; wheelConsumed = !canLeave(Math.sign(delta)) }
      // A gesture that started scrolling content must finish before advancing a slide.
      if (wheelConsumed) {
        if (canLeave(Math.sign(delta))) event.preventDefault()
        return
      }
      if (!canLeave(Math.sign(delta))) { wheelConsumed = true; return }
      event.preventDefault()
      if (now < lockedUntil.current) { wheelConsumed = true; return }
      if (Math.sign(delta) !== Math.sign(wheelAmount)) wheelAmount = 0
      wheelAmount += delta
      if (Math.abs(wheelAmount) < 60) return
      wheelConsumed = true
      navigate(Math.sign(wheelAmount))
    }
    function onTouchStart(event: TouchEvent) {
      if (blocked(event.target) || event.touches.length !== 1) { touch = null; return }
      const edge = edges()
      touch = { x: event.touches[0].clientX, y: event.touches[0].clientY, ...edge }
    }
    function onTouchMove(event: TouchEvent) {
      if (!touch || blocked(event.target) || event.touches.length !== 1) return
      const dy = touch.y - event.touches[0].clientY
      const dx = touch.x - event.touches[0].clientX
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 12 && (dy > 0 ? touch.bottom : touch.top)) event.preventDefault()
    }
    function onTouchEnd(event: TouchEvent) {
      const start = touch
      touch = null
      if (!start || blocked(event.target)) return
      const dy = start.y - event.changedTouches[0].clientY
      const dx = start.x - event.changedTouches[0].clientX
      if (Math.abs(dy) < 60 || Math.abs(dy) < Math.abs(dx) * 1.2 || !(dy > 0 ? start.bottom : start.top)) return
      navigate(Math.sign(dy))
    }
    function onKeyDown(event: KeyboardEvent) {
      if (blocked(event.target) || event.altKey || event.ctrlKey || event.metaKey || event.repeat) return
      const direction = ['ArrowDown', 'PageDown'].includes(event.key) ? 1 : ['ArrowUp', 'PageUp'].includes(event.key) ? -1 : 0
      if (!direction || !canLeave(direction)) return
      event.preventDefault()
      navigate(direction)
    }
    const onTouchCancel = () => { touch = null }
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchCancel)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchCancel)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [goTo])
  return { activeSlide, goTo }
}
