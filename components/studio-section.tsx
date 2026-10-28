'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { SectionHeading } from '@/components/section-heading'

export function StudioSection() {
  return (
    <section id="studio" className="border-t border-border bg-secondary px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading index="05" eyebrow="The Space" title="A Private Studio" />

        <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="film-grain relative aspect-[16/10] overflow-hidden md:col-span-8"
          >
            <Image
              src="/studio-1.png"
              alt="Minimalist architecture studio interior"
              fill
              className="object-cover grayscale"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </motion.div>

          <div className="flex flex-col gap-4 md:col-span-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="film-grain relative aspect-square overflow-hidden"
            >
              <Image
                src="/studio-2.png"
                alt="Material samples and architectural models on a dark table"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </motion.div>
            <div className="flex flex-1 flex-col justify-center border border-border p-6">
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                By appointment only. A calm, single-chair space built for focus &mdash; no walk-ins, no
                crowds. Just you, the work, and the time it takes to do it right.
              </p>
              <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.2em] text-accent">
                Downtown &middot; By appointment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
