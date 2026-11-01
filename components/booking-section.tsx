
'use client'

import type React from 'react'
import { useState } from 'react'
import { SectionHeading } from '@/components/section-heading'
import { PROJECT_TYPE_OPTIONS } from '@/lib/site-data'

const inputBase =
  'w-full border-0 border-b border-border bg-transparent px-0 py-3 font-sans text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none transition-colors'

export function BookingSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="border-t border-border bg-secondary px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionHeading index="06" eyebrow="Get in Touch" title="Let's Connect" />

        {submitted ? (
          <div className="mt-16 border border-border p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="font-serif text-3xl font-light text-foreground">Message received.</p>
            <p className="mt-4 font-sans leading-relaxed text-muted-foreground">
              Thank you for reaching out. I appreciate your interest and will review your message
              and get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-16 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700"
          >
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Full name
                </label>
                <input id="name" name="name" type="text" required placeholder="Your name" className={inputBase} />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Email address
                </label>
                <input id="email" name="email" type="email" required placeholder="you@email.com" className={inputBase} />
              </div>
            </div>

            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <label
                  htmlFor="style"
                  className="mb-1 block font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Area of interest
                </label>
                <select id="style" name="style" required defaultValue="" className={`${inputBase} appearance-none`}>
                  <option value="" disabled className="bg-background">
                    Select an area of interest
                  </option>
                  {PROJECT_TYPE_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-background">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="site"
                  className="mb-1 block font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Company / Location
                </label>
                <input
                  id="site"
                  name="site"
                  type="text"
                  placeholder="Company name or location"
                  className={inputBase}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="idea"
                className="mb-1 block font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Your message
              </label>
              <textarea
                id="idea"
                name="idea"
                rows={4}
                required
                placeholder="Tell me about your project, collaboration opportunity, or inquiry..."
                className={`${inputBase} resize-none`}
              />
            </div>

            <div className="flex flex-col items-start gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm font-sans text-xs leading-relaxed text-muted-foreground">
                Open to professional inquiries, architectural collaborations, BIM-related opportunities,
                and creative projects.
              </p>
              <button
                type="submit"
                className="group inline-flex items-center gap-3 whitespace-nowrap bg-foreground px-10 py-4 font-sans text-xs uppercase tracking-[0.25em] text-background transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
              >
                Send message
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
