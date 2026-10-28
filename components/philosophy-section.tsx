'use client'

import { motion } from 'motion/react'

const words = ['Permanence', 'is', 'an', 'act', 'of', 'intention.']

export function PhilosophySection() {
  return (
    <section className="border-t border-border bg-secondary px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-10 font-sans text-[11px] uppercase tracking-[0.35em] text-accent">
          Philosophy
        </p>
        <h2 className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-serif text-4xl font-light leading-tight tracking-hero md:text-6xl lg:text-7xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.12, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={word === 'intention.' ? 'italic text-accent' : 'text-foreground'}
            >
              {word}
            </motion.span>
          ))}
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mx-auto mt-10 max-w-2xl text-pretty font-sans leading-relaxed text-muted-foreground"
        >
          No trends, no volume. Each appointment is a single-day commitment to one person and one
          idea &mdash; a slow, deliberate practice where the mark and the meaning are inseparable.
        </motion.p>
      </div>
    </section>
  )
}
