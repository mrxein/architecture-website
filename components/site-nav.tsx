'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, INSTAGRAM_URL } from '@/lib/site-data'
import { InstagramGlyph } from '@/components/icons'
import { cn } from '@/lib/utils'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-border bg-background/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
          <a
            href="#top"
            className="font-sans text-sm font-semibold uppercase tracking-[0.25em] text-foreground"
          >
            Architecture Studio
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Atelier Form on Instagram"
              className="hidden text-muted-foreground transition-colors hover:text-foreground md:block"
            >
              <InstagramGlyph className="size-[18px]" />
            </a>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="text-foreground md:hidden"
            >
              <Menu className="size-6" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-background md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-sans text-sm font-semibold uppercase tracking-[0.25em]">
                Atelier Form
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="size-6" strokeWidth={1.5} />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block font-serif text-5xl font-light tracking-hero text-foreground"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border-t border-border px-6 py-6 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              <InstagramGlyph className="size-4" />
              @atelierform
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
