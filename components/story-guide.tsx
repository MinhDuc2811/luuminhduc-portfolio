'use client'

import CharacterActor from './character-actor'
import { useEffect, useState } from 'react'
import type { Locale } from '@/lib/proposal-content'
import { storyChapter } from '@/lib/story'

export default function StoryGuide({ activeSlide, locale, onNavigate }: { activeSlide: number; locale: Locale; onNavigate: (index: number) => void }) {
  const [openChapter, setOpenChapter] = useState<number | null>(null)
  const [discovered, setDiscovered] = useState<number[]>([])
  const chapter = storyChapter(locale, activeSlide)
  const open = openChapter === activeSlide
  const vi = locale === 'vi'
  useEffect(() => { setOpenChapter(null) }, [activeSlide])
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpenChapter(null); event.stopPropagation() } }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open])
  function talk() {
    setOpenChapter(open ? null : activeSlide)
    setDiscovered(current => current.includes(activeSlide) ? current : [...current, activeSlide])
  }
  return <div className="story-overlay" data-story-ui>
    <CharacterActor progress={activeSlide / 7} pose={chapter.pose} locale={locale} open={open} onTalk={talk} />
    {open && <aside id="story-note" className="story-note" aria-label={vi ? 'Sổ hành trình của Đức' : "Duc's field notes"}>
      <div className="story-note-heading"><span>{vi ? 'SỔ HÀNH TRÌNH' : 'FIELD NOTES'} · {discovered.length}/8</span><button type="button" onClick={() => setOpenChapter(null)} aria-label={vi ? 'Đóng ghi chú' : 'Close note'}>×</button></div>
      <h3>{chapter.title}</h3><p>{chapter.note}</p>
    </aside>}
    <div className="story-hud">
      <div className="story-caption" aria-live="polite" aria-atomic="true">
        <p className="story-chapter"><span>{String(activeSlide).padStart(2, '0')}</span> / 07 <b>{chapter.title}</b></p>
        <p className="story-line">{chapter.line}</p>
      </div>
      <div className="story-controls">
        <span className="story-input-hint">{vi ? 'Cuộn / vuốt để khám phá' : 'Scroll / swipe to explore'}</span>
        <div><button type="button" aria-label={vi ? 'Chương trước' : 'Previous chapter'} disabled={activeSlide === 0} onClick={() => onNavigate(activeSlide - 1)}>←</button><button type="button" aria-label={vi ? 'Chương tiếp theo' : 'Next chapter'} disabled={activeSlide === 7} onClick={() => onNavigate(activeSlide + 1)}>→</button></div>
      </div>
    </div>
  </div>
}
