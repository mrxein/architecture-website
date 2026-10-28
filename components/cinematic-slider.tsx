'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SLIDER_IMAGES } from '@/lib/site-data'

export function CinematicSlider() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0])
  const count = SLIDER_IMAGES.length

  const paginate = useCallback(
    (dir: number) => {
      setState(([i]) => [(i + dir + count) % count, dir])
    },
    [count],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1)
      if (e.key === 'ArrowLeft') paginate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paginate])

  const current = SLIDER_IMAGES[index]

  return (
    <section
      id="work"
      className="film-grain relative h-[100svh] w-full overflow-hidden bg-background"
      aria-roledescription="carousel"
      aria-label="Featured architecture work"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) paginate(1)
            else if (info.offset.x > 80) paginate(-1)
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <Image
            src={current.src || '/placeholder.svg'}
            alt={current.title}
            fill
            className="pointer-events-none select-none object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/30" />
        </motion.div>
      </AnimatePresence>

      {/* Overlay content */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between px-5 py-24 md:px-10 md:py-28">
        <div className="mx-auto flex w-full max-w-[1600px] items-start justify-between">
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="text-accent">Selected</span> — The Gallery
          </span>
          <span className="font-sans text-xs tabular-nums tracking-[0.2em] text-muted-foreground">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>

        <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-serif text-6xl font-light tracking-hero text-foreground md:text-8xl">
                {current.title}
              </h3>
              <p className="mt-3 font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {current.caption}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-auto hidden items-center gap-3 md:flex">
            <SliderButton label="Previous" onClick={() => paginate(-1)}>
              <ArrowLeft className="size-5" strokeWidth={1.5} />
            </SliderButton>
            <SliderButton label="Next" onClick={() => paginate(1)}>
              <ArrowRight className="size-5" strokeWidth={1.5} />
            </SliderButton>
          </div>
        </div>
      </div>

      {/* Progress bars */}
      <div className="absolute bottom-0 left-0 z-10 flex h-[3px] w-full">
        {SLIDER_IMAGES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Go to ${s.title}`}
            onClick={() => setState([i, i > index ? 1 : -1])}
            className="group relative h-full flex-1 bg-border/40"
          >
            <span
              className={`absolute inset-0 origin-left bg-accent transition-transform duration-500 ${
                i === index ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}

function SliderButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-12 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
    >
      {children}
    </button>
  )
}
