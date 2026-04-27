import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '@/sections/Hero';
import { DashboardSection } from '@/sections/DashboardSection';
import { VerificationSection } from '@/sections/VerificationSection';
import { MilestoneSection } from '@/sections/MilestoneSection';
import { MarketplaceSection } from '@/sections/MarketplaceSection';
import { ReportingSection } from '@/sections/ReportingSection';
import { LegalSection } from '@/sections/LegalSection';
import { ImpactMetrics } from '@/sections/ImpactMetrics';
import { HowItWorks } from '@/sections/HowItWorks';
import { Testimonials } from '@/sections/Testimonials';
import { Pricing } from '@/sections/Pricing';
import { FinalCTA } from '@/sections/FinalCTA';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  useEffect(() => {
    // Global snap configuration for pinned sections
    const setupSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay to allow all ScrollTriggers to initialize
    const timer = setTimeout(setupSnap, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <main className="relative">
      <Hero />
      <DashboardSection />
      <VerificationSection />
      <MilestoneSection />
      <MarketplaceSection />
      <ReportingSection />
      <LegalSection />
      <ImpactMetrics />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FinalCTA />
    </main>
  );
}
