import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { CinematicSlider } from '@/components/cinematic-slider'
import { AboutSection } from '@/components/about-section'
import { StylesSection } from '@/components/styles-section'
import { MasonryGallery } from '@/components/masonry-gallery'
import { PhilosophySection } from '@/components/philosophy-section'
import { ProcessSection } from '@/components/process-section'
import { StudioSection } from '@/components/studio-section'
import { QuotesSection } from '@/components/quotes-section'
import { InstagramSection } from '@/components/instagram-section'
import { BookingSection } from '@/components/booking-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="relative bg-background">
      <SiteNav />
      <Hero />
      <CinematicSlider />
      <AboutSection />
      <StylesSection />
      <MasonryGallery />
      <PhilosophySection />
      <ProcessSection />
      {/* <StudioSection /> */}
      <QuotesSection />
      <InstagramSection />
      <BookingSection />
      <SiteFooter />
    </main>
  )
}
