import React from 'react'
import { OrderModalProvider } from './context/OrderModalProvider'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { TechMarquee } from './components/sections/TechMarquee'
import { TrustStrip } from './components/sections/TrustStrip'
import { Services } from './components/sections/Services'
import { BusinessOrderSection } from './components/sections/BusinessOrderSection'
import { PartnershipStory } from './components/sections/PartnershipStory'
import { Process } from './components/sections/Process'
import { WorkShowcase } from './components/sections/WorkShowcase'
import { ContactCTA } from './components/sections/ContactCTA'
import { Footer } from './components/layout/Footer'
import { MobileAppDock } from './components/layout/MobileAppDock'
import { BusinessOrderModal } from './components/sections/BusinessOrderModal'

export default function App() {
  return (
    <OrderModalProvider>
      <SmoothScroll>
        <div className="min-h-screen flex flex-col bg-ambient-mesh text-slate-800 dark:text-slate-100 dark:bg-[#060911] transition-colors duration-300 selection:bg-sky-500/30 selection:text-sky-200 pb-24 lg:pb-0 overflow-x-hidden w-full max-w-full">
          {/* Floating App Navigation with Reading Progress Bar & Active Section Tracker */}
          <Navbar />

        {/* Main Landmark */}
        <main id="main-content" className="flex-1">
          {/* Stage 3: Hero Experience with Dynamic Animated Typewriter & 3D Scroll Parallax */}
          <Hero />

          {/* Pro Infinite Tech Stack & Capabilities Marquee */}
          <TechMarquee />

          {/* Stage 4: Trust Strip */}
          <TrustStrip />

          {/* Stage 4: Services Bento with Code Runner & Architecture */}
          <Services />

          {/* Dedicated Instant Business Website Order Section */}
          <BusinessOrderSection />

          {/* Stage 5: Partnership Story & Synchronized Pipeline */}
          <PartnershipStory />

          {/* Stage 6: Process Timeline with Scroll Connection */}
          <Process />

          {/* Stage 7: Work & Capabilities Prototype Lab */}
          <WorkShowcase />

          {/* Stage 8: Final Conversion CTA */}
          <ContactCTA />
        </main>

        {/* Stage 10: Footer */}
        <Footer />

        {/* Mobile App Floating Bottom Dock */}
        <MobileAppDock />

        {/* Interactive Step-by-Step Business Order Modal */}
        <BusinessOrderModal />
      </div>
    </SmoothScroll>
  </OrderModalProvider>
  )
}
