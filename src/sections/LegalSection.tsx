import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Download, Wand2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const templates = [
  { name: 'Memorandum of Understanding', downloads: '1.2k' },
  { name: 'Milestone Funding Agreement', downloads: '856' },
  { name: 'Baseline & Completion Reports', downloads: '643' },
];

export function LegalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topTileRef = useRef<HTMLDivElement>(null);
  const leftBottomRef = useRef<HTMLDivElement>(null);
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

      // Top tile entrance
      tl.fromTo(
        topTileRef.current,
        { y: '-40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Left bottom tile entrance
      tl.fromTo(
        leftBottomRef.current,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );

      // Right bottom tile entrance
      tl.fromTo(
        rightBottomRef.current,
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Exit phase
      tl.to(
        topTileRef.current,
        { y: '-16vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      tl.to(
        leftBottomRef.current,
        { x: '-16vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      tl.to(
        rightBottomRef.current,
        { x: '16vw', opacity: 0, ease: 'power2.in' },
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
      {/* Top Wide Tile */}
      <div
        ref={topTileRef}
        className="absolute glass-card overflow-hidden"
        style={{
          left: '6vw',
          top: '10vh',
          width: '88vw',
          height: '28vh',
        }}
      >
        <div className="absolute inset-0">
          <img
            src="/legal_docs_ui.jpg"
            alt="Legal Documentation"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F15] via-[#0A1F15]/80 to-transparent" />
        </div>
        <div className="relative z-10 p-8 h-full flex flex-col justify-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-3 font-heading">
            Legal Documentation Toolkit
          </h2>
          <p className="text-lg text-[#A8C4B0] max-w-2xl">
            Templates and agreements ready to adapt for your ecosystem projects.
          </p>
        </div>
      </div>

      {/* Left Bottom Tile - Template Library */}
      <div
        ref={leftBottomRef}
        className="absolute glass-card p-6 lg:p-8"
        style={{
          left: '6vw',
          top: '42vh',
          width: '42vw',
          height: '48vh',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#2D8A4E]/20 flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#2D8A4E]" />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">Template Library</h3>
        </div>

        <div className="space-y-3 mb-6">
          {templates.map((template) => (
            <div
              key={template.name}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#A8C4B0]" />
                <span className="text-sm text-white">{template.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#A8C4B0]">{template.downloads} downloads</span>
                <Download className="w-4 h-4 text-[#2D8A4E] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        <button className="btn-primary inline-flex items-center gap-2 text-sm">
          Download templates
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right Bottom Tile - Document Wizard */}
      <div
        ref={rightBottomRef}
        className="absolute glass-card p-6 lg:p-8"
        style={{
          left: '52vw',
          top: '42vh',
          width: '42vw',
          height: '48vh',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#F4A460]/20 flex items-center justify-center">
            <Wand2 className="w-6 h-6 text-[#F4A460]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-heading">Document Wizard</h3>
            <span className="text-xs text-[#F4A460]">Phase 2</span>
          </div>
        </div>

        <p className="text-[#A8C4B0] leading-relaxed mb-6">
          Answer a few questions to generate a draft agreement tailored to your project. 
          Our wizard will guide you through:
        </p>

        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-3 text-sm text-[#A8C4B0]">
            <span className="w-5 h-5 rounded-full bg-[#F4A460]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-[#F4A460]">1</span>
            </span>
            Project scope and deliverables
          </li>
          <li className="flex items-start gap-3 text-sm text-[#A8C4B0]">
            <span className="w-5 h-5 rounded-full bg-[#F4A460]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-[#F4A460]">2</span>
            </span>
            Milestone definitions and payments
          </li>
          <li className="flex items-start gap-3 text-sm text-[#A8C4B0]">
            <span className="w-5 h-5 rounded-full bg-[#F4A460]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-[#F4A460]">3</span>
            </span>
            Monitoring and reporting requirements
          </li>
        </ul>

        <button className="btn-secondary inline-flex items-center gap-2 text-sm">
          Join the waitlist
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
