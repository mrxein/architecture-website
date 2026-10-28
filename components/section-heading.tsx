'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type Props = {
  index?: string
  eyebrow?: string
  title: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  className,
  align = 'left',
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {(index || eyebrow) && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          {index && <span className="text-accent">{index}</span>}
          {eyebrow && <span>{eyebrow}</span>}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="max-w-[16ch] text-balance font-serif text-5xl font-light leading-[0.95] tracking-hero text-foreground md:text-7xl"
      >
        {title}
      </motion.h2>
    </div>
  )
}
