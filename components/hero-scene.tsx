'use client'

import Image from 'next/image'

// Character sprite sheet — 8 running frames, 96x96 each, laid out horizontally.
const RUN_SHEET = '/character/run-sheet.png'
const RUN_FRAME_SIZE = 96
const RUN_FRAME_COUNT = 8

// Day cycle backgrounds — crossfade across the slide deck, first to last.
const SCENERY = [
  '/scenery/01-pre-dawn.png',
  '/scenery/02-sunrise.png',
  '/scenery/03-morning.png',
  '/scenery/04-midday.png',
  '/scenery/05-sunset.png',
  '/scenery/06-twilight.png',
  '/scenery/07-deep-night.png',
]

export default function HeroScene({ progress }: { progress: number }) {
  // Position along the 7-image strip, e.g. 2.4 means 40% faded from image 2 into image 3.
  const position = Math.min(1, Math.max(0, progress)) * (SCENERY.length - 1)
  const activeIndex = Math.min(SCENERY.length - 2, Math.floor(position))
  const fade = position - activeIndex

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* background layer — crossfades through the day cycle as the page scrolls */}
      <div className="absolute inset-0">
        {SCENERY.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0"
            style={{ opacity: i === activeIndex ? 1 - fade : i === activeIndex + 1 ? fade : 0 }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              className="object-cover object-bottom"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* character layer — runs left to right on a loop */}
      <div className="absolute inset-0">
        <div
          role="img"
          aria-label="Pixel-art character running"
          className="absolute bottom-0 w-[96px] h-[96px] character-run character-run-upright select-none pointer-events-none"
          style={{
            backgroundImage: `url(${RUN_SHEET})`,
            backgroundSize: `${RUN_FRAME_SIZE * RUN_FRAME_COUNT}px ${RUN_FRAME_SIZE}px`,
            imageRendering: 'pixelated',
          }}
        />
      </div>
    </div>
  )
}
