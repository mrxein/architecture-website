'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { INSTAGRAM_URL, INSTAGRAM_GRID } from '@/lib/site-data'
import { InstagramGlyph } from '@/components/icons'

export function InstagramSection() {
  return (
    <section className="border-t border-border bg-background px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-accent">
              Follow the work
            </p>
            <h2 className="mt-3 font-serif text-4xl font-light tracking-hero text-foreground md:text-5xl">
              @instagram account
            </h2>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <InstagramGlyph className="size-4" />
            View profile
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {INSTAGRAM_GRID.map((src, i) => (
            <motion.a
              key={src}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="film-grain group relative aspect-square overflow-hidden"
            >
              <Image
                src={src || '/placeholder.svg'}
                alt="Architecture studies from the Instagram feed"
                fill
                className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 z-[2] flex items-center justify-center bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <InstagramGlyph className="size-5 text-foreground" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
