'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { SectionHeading } from '@/components/section-heading'

const STATS = [
  { value: '14+', label: 'Years practicing' },
  { value: '38', label: 'Projects completed' },
  { value: '07', label: 'Cities of practice' },
]

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border bg-background px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="film-grain grayscale relative aspect-4/5 overflow-hidden">
            <Image
              src="/avatar-v2.png"
              alt="Portrait of the architect in the studio"
              fill
              className="object-cover grayscale"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        <div className="flex flex-col justify-center">
          <SectionHeading index="01" eyebrow="The Practice" title="Behind the Work" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 space-y-5 text-pretty font-sans leading-relaxed text-muted-foreground"
          >
            <p>
              Atelier Form is an independent architecture practice built on a simple idea: a building should
              give more than it takes. Working across Berlin, Tokyo, and Los Angeles, the studio sits
              where structural precision meets quiet, emotional minimalism.
            </p>
            <p>
              Every project begins with a conversation. No fixed language, no repeats &mdash; only spaces drawn
              for the people and place that will inhabit them. The result is a body of work defined by
              intention, restraint, and a reverence for permanence.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-10">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                <div className="font-serif text-4xl font-light text-foreground md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
