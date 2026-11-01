
'use client'

import { motion } from 'motion/react'
import { INSTAGRAM_URL } from '@/lib/site-data'
import { InstagramGlyph } from '@/components/icons'

const navGroups = [
  {
    title: 'Explore',
    links: [
      { label: 'Portfolio', href: '#work' },
      { label: 'Expertise', href: '#styles' },
      { label: 'Gallery', href: '#studio' },
      { label: 'About Me', href: '#about' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Instagram', href: INSTAGRAM_URL },
      { label: 'Contact', href: '#contact' },
      { label: 'Collaborate', href: '#contact' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-5 pt-20 md:px-10">
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#top" className="font-serif text-3xl font-light tracking-hero text-foreground">
              Sarina Khezrian
            </a>
            <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
              Architecture, BIM, and architectural graphics. Exploring digital design,
              3D modeling, and visual communication through creativity and technical precision.
            </p>
          </div>

          {navGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-sans text-[11px] uppercase tracking-[0.25em] text-accent">
                {group.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-2 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label === 'Instagram' && <InstagramGlyph className="size-3.5" />}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="pt-10"
        >
          <p className="text-center font-serif text-[19vw] font-light leading-[0.8] tracking-hero text-outline md:text-[16vw]">
            SARINA
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-8 font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:flex-row">
          <span>&copy; {new Date().getFullYear()} SARINA KHEZRIAN</span>
          <span>Architecture | BIM | Digital Design</span>
        </div>
      </div>
    </footer>
  )
}
