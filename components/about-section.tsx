
'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { SectionHeading } from '@/components/section-heading'

const STATS = [
  { value: '01', label: 'Year of Tekla Experience' },
  { value: 'BIM', label: 'Digital Modeling' },
  { value: '3D', label: 'Architectural Visualization' },
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
              alt="Sarina Khezrian, architecture and BIM enthusiast"
              fill
              className="object-cover grayscale"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        <div className="flex flex-col justify-center">
          <SectionHeading index="01" eyebrow="About Me" title="Designing Beyond Spaces" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 space-y-5 text-pretty font-sans leading-relaxed text-muted-foreground"
          >
            <p>
              I’m Sarina Khezrian, an architecture enthusiast with experience in architectural
              design, digital modeling, and visual communication. My professional background
              includes working in an architecture office and one year of experience editing
              and refining structural steel models using Tekla Structures.
            </p>
            <p>
              I’m passionate about architectural design, Building Information Modeling (BIM),
              3D visualization, and architectural graphics. I enjoy exploring digital tools
              and emerging technologies to improve design workflows and visual presentations,
              while continuously developing my technical skills in BIM and architectural technology.
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
