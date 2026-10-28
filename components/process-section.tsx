'use client'

import { motion } from 'motion/react'
import { SectionHeading } from '@/components/section-heading'
import { PROCESS_STEPS } from '@/lib/site-data'

export function ProcessSection() {
  return (
    <section className="border-t border-border bg-background px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading index="04" eyebrow="How It Works" title="The Process" />

        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col bg-background p-8 transition-colors duration-500 hover:bg-secondary md:p-10"
            >
              <span className="font-serif text-5xl font-light text-outline transition-colors duration-500 group-hover:text-accent">
                {step.number}
              </span>
              <h3 className="mt-8 font-serif text-2xl font-light text-foreground">{step.title}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
