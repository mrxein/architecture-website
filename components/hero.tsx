'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="film-grain relative h-svh w-full overflow-hidden bg-background"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/hero-architect.png"
          alt="Monumental modern concrete architecture in dramatic black and white"
          fill
          priority
          className="object-contain opacity-70 scale-200"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/50 via-background/20 to-background" />
        <div className="absolute inset-0 bg-linear-to-r from-background/60 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-16 md:px-10 md:pb-20"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-6 font-sans text-[11px] uppercase tracking-[0.4em] text-muted-foreground"
          >
            Architecture Studio • Space • Material • Light
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="font-serif text-[10vw] font-light leading-[0.85] tracking-hero text-foreground md:text-[6vw]"
          >
            SARINA KHEZRIAN
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-6 font-sans text-sm uppercase tracking-[0.35em] text-foreground/80"
          >
            Architecture with intention.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] text-background transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Explore Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-border px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground"
            >
              Start a Project
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="size-4 text-muted-foreground" strokeWidth={1.5} />
        </motion.span>
      </motion.div>
    </section>
  )
}
