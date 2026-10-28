'use client'

import { useMemo, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import {
  GALLERY_FILTERS,
  GALLERY_ITEMS,
  type GalleryItem,
} from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function MasonryGallery() {
  const [filter, setFilter] = useState<(typeof GALLERY_FILTERS)[number]>('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const items = useMemo(
    () =>
      filter === 'All'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((i) => i.category === filter),
    [filter],
  )

  const openAt = (item: GalleryItem) =>
    setLightbox(items.findIndex((i) => i.src === item.src))

  const paginate = useCallback(
    (dir: number) => {
      setLightbox((prev) =>
        prev === null ? prev : (prev + dir + items.length) % items.length,
      )
    },
    [items.length],
  )

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') paginate(1)
      if (e.key === 'ArrowLeft') paginate(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, paginate])

  return (
    <section id="gallery" className="bg-background px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="text-accent">Archive</span> — Full Portfolio
            </p>
            <h2 className="font-serif text-5xl font-light tracking-hero text-foreground md:text-7xl">
              The Collection
            </h2>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  'relative pb-1 font-sans text-xs uppercase tracking-[0.2em] transition-colors',
                  filter === f
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {f}
                {filter === f && (
                  <motion.span
                    layoutId="filter-underline"
                    className="absolute -bottom-0 left-0 h-px w-full bg-accent"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.button
                type="button"
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                onClick={() => openAt(item)}
                className="group relative block w-full overflow-hidden bg-card"
              >
                <div
                  className={cn(
                    'relative w-full',
                    item.span === 'tall'
                      ? 'aspect-3/4'
                      : item.span === 'wide'
                        ? 'aspect-[4/3]'
                        : 'aspect-square',
                  )}
                >
                  <Image
                    src={item.src || '/placeholder.svg'}
                    alt={`${item.title} — ${item.category} architecture project`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-background/90 via-background/10 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
                    {item.category}
                  </span>
                  <span className="mt-1 font-serif text-2xl font-light text-foreground">
                    {item.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox !== null && items[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/95 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightbox(null)}
              className="absolute right-5 top-5 z-10 flex size-11 items-center justify-center border border-border text-foreground transition-colors hover:bg-foreground hover:text-background md:right-10 md:top-10"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>

            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation()
                paginate(-1)
              }}
              className="absolute left-4 z-10 flex size-11 items-center justify-center border border-border text-foreground transition-colors hover:bg-foreground hover:text-background md:left-10"
            >
              <ArrowLeft className="size-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation()
                paginate(1)
              }}
              className="absolute right-4 z-10 flex size-11 items-center justify-center border border-border text-foreground transition-colors hover:bg-foreground hover:text-background md:right-10"
            >
              <ArrowRight className="size-5" strokeWidth={1.5} />
            </button>

            <motion.div
              key={items[lightbox].src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative flex max-h-[85vh] w-[90vw] max-w-4xl flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh] w-full">
                <Image
                  src={items[lightbox].src || '/placeholder.svg'}
                  alt={items[lightbox].title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="font-serif text-2xl font-light text-foreground">
                    {items[lightbox].title}
                  </p>
                  <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-accent">
                    {items[lightbox].category}
                  </p>
                </div>
                <span className="font-sans text-xs tabular-nums tracking-[0.2em] text-muted-foreground">
                  {String(lightbox + 1).padStart(2, '0')} /{' '}
                  {String(items.length).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
