'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { STYLES } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'

export function StylesSection() {
  return (
    <section id="styles" className="border-t border-border bg-background px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading index="02" eyebrow="Disciplines" title="Styles & Craft" />

        <div className="mt-14 flex flex-col border-t border-border">
          {STYLES.map((style, i) => (
            <motion.a
              key={style.name}
              href="#work"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative grid grid-cols-1 items-center gap-4 border-b border-border py-8 md:grid-cols-[6rem_1fr_1fr_auto] md:gap-8 md:py-10"
            >
              <span className="font-sans text-xs tabular-nums tracking-[0.2em] text-muted-foreground">
                0{i + 1}
              </span>

              <h3 className="font-serif text-4xl font-light tracking-hero text-foreground transition-transform duration-500 group-hover:translate-x-2 md:text-6xl">
                {style.name}
              </h3>

              <p className="max-w-md font-sans text-sm leading-relaxed text-muted-foreground">
                {style.description}
              </p>

              <div className="pointer-events-none absolute right-6 top-1/2 z-10 hidden h-40 w-56 -translate-y-1/2 overflow-hidden opacity-0 transition-all duration-500 group-hover:opacity-100 lg:block">
                <Image
                  src={style.src || '/placeholder.svg'}
                  alt={`${style.name} example`}
                  fill
                  className="object-cover grayscale"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
