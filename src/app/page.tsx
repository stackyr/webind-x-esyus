"use client";

import { useState } from "react";
import ImageSequenceCanvas from "@/components/ImageSequence";
import { WebindHero } from "@/components/WebindHero";
import { FeatureFlowSection } from "@/components/FeatureFlowSection";
import { ArcShowcaseSection } from "@/components/ArcShowcaseSection";
import { ScrollVideoShowcase } from "@/components/ScrollVideoShowcase";
import { PremiumMarquee } from "@/components/PremiumMarquee";
import { WebindEsyusPartnership } from "@/components/WebindEsyusPartnership";
import { WebindFooter } from "@/components/WebindFooter";
import { ProjectInquiryModal } from "@/components/ProjectInquiryModal";
import { MobileAppNavBar } from "@/components/MobileAppNavBar";
import { DesktopNavigationModal } from "@/components/DesktopNavigationModal";
import { ScanLoadingScreen } from "@/components/ScanLoadingScreen";

export default function Home() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryProject, setInquiryProject] = useState<string | undefined>(undefined);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenInquiry = (projectName?: string) => {
    setInquiryProject(projectName);
    setIsInquiryOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-clip bg-[#080B10] text-[#F5F7FA] selection:bg-[#FF384C] selection:text-white">
      {/* 0. Cinematic Futuristic Scan Preloader */}
      <ScanLoadingScreen onComplete={() => setIsLoading(false)} />

      {/* Floating Mobile App Bottom Dock */}
      <MobileAppNavBar onInquireClick={() => handleOpenInquiry("Mobile Quick Inquiry")} />
      {/* 1. Background Fixed Image Sequence Canvas */}
      <ImageSequenceCanvas />

      {/* 2. Section 1 Visual Sequence Area: WebindHero + FeatureFlowSection over continuous Image Sequence */}
      <div id="sequence-section" className="relative z-10 w-full">
        <WebindHero
          onStartProject={() => handleOpenInquiry()}
          onOpenNav={() => setIsNavOpen(true)}
        />
        <FeatureFlowSection />
      </div>

      {/* 3. Section 2: Arc Showcase Section (Selected Works // Auto Showcase) */}
      <ArcShowcaseSection
        onSelectProjectForInquiry={(projectName) => handleOpenInquiry(projectName)}
      />

      {/* 4. Seamless Transition: Premium Infinite Brand Marquee (between Section 2 & 3) */}
      <PremiumMarquee />

      {/* 5. Section 3: Expanding Scroll Video Showcase */}
      <ScrollVideoShowcase />

      {/* 6. Section 4: Webind × Esyus Strategic Partnership */}
      <WebindEsyusPartnership
        onStartJointProject={() => handleOpenInquiry("Webind × Esyus Joint Venture")}
      />

      {/* 7. Section 5: Seamless Continuous Living Liquid Footer */}
      <WebindFooter
        onContactClick={() => handleOpenInquiry("General Inquiry / Partnership")}
        onHomeClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />

      {/* 8. Interactive Project Inquiry Modal */}
      <ProjectInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialProject={inquiryProject}
      />

      {/* 9. Fullscreen Desktop/PC Animated Navigation Modal */}
      <DesktopNavigationModal
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        onOpenInquiry={(project) => handleOpenInquiry(project)}
      />
    </div>
  );
}
