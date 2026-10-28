'use client'

import { motion } from 'motion/react'
import { QUOTES } from '@/lib/site-data'

export function QuotesSection() {
  return (
    <section className="border-t border-border bg-background px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {QUOTES.map((quote, i) => (
            <motion.figure
              key={quote.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col justify-between gap-10 bg-background p-8 md:p-12"
            >
              <blockquote className="text-balance font-serif text-xl font-light leading-snug text-foreground md:text-2xl">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              <figcaption className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="text-foreground">{quote.author}</span>
                <span className="mx-2 text-accent">&mdash;</span>
                {quote.meta}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
