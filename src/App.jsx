import React, { useState } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { TrustStrip } from './components/sections/TrustStrip'
import { Services } from './components/sections/Services'
import { PartnershipStory } from './components/sections/PartnershipStory'
import { Process } from './components/sections/Process'
import { WorkShowcase } from './components/sections/WorkShowcase'
import { ProjectInquiry } from './components/sections/ProjectInquiry'
import { ContactCTA } from './components/sections/ContactCTA'
import { Footer } from './components/layout/Footer'

export default function App() {
  const [selectedService, setSelectedService] = useState('website')

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId)
  }

  return (
    <div className="min-h-screen flex flex-col bg-ambient-mesh text-slate-800 dark:text-slate-100 dark:bg-[#060911] transition-colors duration-300 selection:bg-sky-500/30 selection:text-sky-200">
      {/* Floating App Navigation */}
      <Navbar />

      {/* Main Landmark */}
      <main id="main-content" className="flex-1">
        {/* Stage 3: Hero Experience */}
        <Hero />

        {/* Stage 4: Trust Strip */}
        <TrustStrip />

        {/* Stage 4: Services Overview */}
        <Services onSelectService={handleServiceSelect} />

        {/* Stage 5: Partnership Story */}
        <PartnershipStory />

        {/* Stage 6: Process Timeline */}
        <Process />

        {/* Stage 7: Work & Capabilities Showcase */}
        <WorkShowcase />

        {/* Stage 8: Project Inquiry Multi-Step Form */}
        <ProjectInquiry preselectedService={selectedService} />

        {/* Stage 9: Final Conversion CTA */}
        <ContactCTA />
      </main>

      {/* Stage 10: Footer */}
      <Footer />
    </div>
  )
}
