import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Calendar, BarChart3, Shield, Target, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ReportingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftTileRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Left tile entrance
      tl.fromTo(
        leftTileRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Right tiles entrance
      tl.fromTo(
        rightTopRef.current,
        { x: '50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );
      tl.fromTo(
        rightBottomRef.current,
        { x: '50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.14
      );

      // Exit phase
      tl.to(
        leftTileRef.current,
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      tl.to(
        rightTopRef.current,
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      tl.to(
        rightBottomRef.current,
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0A1F15] eco-bg overflow-hidden"
    >
      {/* Left Large Report Tile */}
      <div
        ref={leftTileRef}
        className="absolute glass-card p-6 lg:p-8"
        style={{
          left: '6vw',
          top: '14vh',
          width: '54vw',
          height: '72vh',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#2D8A4E]/20 flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#2D8A4E]" />
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-white font-heading">
              Ecosystem Reporting
            </h3>
            <p className="text-sm text-[#A8C4B0]">
              Generate audit-ready reports for your sustainability disclosures
            </p>
          </div>
        </div>

        {/* Report Preview Image */}
        <div className="rounded-xl overflow-hidden mb-6 border border-[#2D8A4E]/20">
          <img
            src="/report_cover_ui.jpg"
            alt="Report Preview"
            className="w-full h-40 lg:h-48 object-cover"
          />
        </div>

        {/* Features List */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="glass-card-sm p-4">
            <Calendar className="w-5 h-5 text-[#2D8A4E] mb-2" />
            <p className="text-sm font-medium text-white">Custom Date Ranges</p>
            <p className="text-xs text-[#A8C4B0]">Quarterly or annual</p>
          </div>
          <div className="glass-card-sm p-4">
            <BarChart3 className="w-5 h-5 text-[#4CAF50] mb-2" />
            <p className="text-sm font-medium text-white">Portfolio Summaries</p>
            <p className="text-xs text-[#A8C4B0]">Aggregate impact</p>
          </div>
          <div className="glass-card-sm p-4">
            <Shield className="w-5 h-5 text-[#F4A460] mb-2" />
            <p className="text-sm font-medium text-white">Verification Notes</p>
            <p className="text-xs text-[#A8C4B0]">Third-party docs</p>
          </div>
        </div>

        <button className="btn-primary text-sm">
          Request a sample report
        </button>
      </div>

      {/* Right Top Tile - SDG Mapping */}
      <div
        ref={rightTopRef}
        className="absolute glass-card p-6"
        style={{
          left: '62vw',
          top: '14vh',
          width: '32vw',
          height: '34vh',
        }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#4CAF50]/20 flex items-center justify-center mb-4">
          <Target className="w-5 h-5 text-[#4CAF50]" />
        </div>
        <h4 className="text-lg font-bold text-white mb-2 font-heading">
          SDG Mapping
        </h4>
        <p className="text-sm text-[#A8C4B0] mb-4 leading-relaxed">
          Automatically tag projects to SDGs 7, 11, 12, 13, 15 with evidence links.
        </p>
        <div className="flex flex-wrap gap-2">
          {['SDG 7', 'SDG 11', 'SDG 12', 'SDG 13', 'SDG 15'].map((sdg) => (
            <span
              key={sdg}
              className="px-2 py-1 rounded-md bg-[#4CAF50]/10 text-xs text-[#4CAF50]"
            >
              {sdg}
            </span>
          ))}
        </div>
      </div>

      {/* Right Bottom Tile - Compliance */}
      <div
        ref={rightBottomRef}
        className="absolute glass-card p-6"
        style={{
          left: '62vw',
          top: '52vh',
          width: '32vw',
          height: '34vh',
        }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#1E90B8]/20 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-5 h-5 text-[#4FC3F7]" />
        </div>
        <h4 className="text-lg font-bold text-white mb-2 font-heading">
          Compliance-ready Formats
        </h4>
        <p className="text-sm text-[#A8C4B0] mb-4 leading-relaxed">
          Export aligned with major frameworks:
        </p>
        <div className="space-y-2">
          {['CSRD-ready structure', 'GRI Standards', 'TCFD-aligned'].map((framework) => (
            <div key={framework} className="flex items-center gap-2 text-sm text-[#A8C4B0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7]" />
              {framework}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
