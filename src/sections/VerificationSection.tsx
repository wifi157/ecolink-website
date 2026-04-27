import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, ClipboardCheck, Target, History, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const verificationItems = [
  { icon: Building2, title: 'KYB / Company Check', description: 'Business registration and financial health verification.' },
  { icon: ClipboardCheck, title: 'Baseline Evidence Review', description: 'Historical data and feasibility assessment.' },
  { icon: Target, title: 'Milestone Validation', description: 'Realistic costing and achievable deliverables.' },
  { icon: History, title: 'Ongoing Audit Trail', description: 'Continuous monitoring via milestone updates.' },
];

export function VerificationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const centralTileRef = useRef<HTMLDivElement>(null);
  const smallTilesRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Central tile entrance
      tl.fromTo(
        centralTileRef.current,
        { scale: 0.72, opacity: 0, y: '10vh' },
        { scale: 1, opacity: 1, y: 0, ease: 'none' },
        0
      );

      // Small tiles entrance with directional offsets
      smallTilesRef.current.forEach((tile, index) => {
        if (!tile) return;
        const item = verificationItems[index];
        const fromX = item.title.includes('Company') || item.title.includes('Baseline') ? '-18vw' : '18vw';
        const fromY = item.title.includes('Company') || item.title.includes('Milestone') ? '-18vh' : '18vh';

        tl.fromTo(
          tile,
          { opacity: 0, scale: 0.88, x: fromX, y: fromY },
          { opacity: 1, scale: 1, x: 0, y: 0, ease: 'none' },
          0.08 + index * 0.02
        );
      });

      // Exit phase
      tl.to(
        centralTileRef.current,
        { scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.7
      );

      smallTilesRef.current.forEach((tile, index) => {
        if (!tile) return;
        const toX = verificationItems[index].title.includes('Company') || verificationItems[index].title.includes('Baseline') ? '-12vw' : '12vw';

        tl.to(
          tile,
          { x: toX, opacity: 0, ease: 'power2.in' },
          0.7
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0A1F15] eco-bg overflow-hidden"
    >
      {/* Central Verification Tile */}
      <div
        ref={centralTileRef}
        className="absolute glass-card p-8 lg:p-10 flex flex-col justify-center"
        style={{
          left: '30vw',
          top: '18vh',
          width: '40vw',
          height: '64vh',
        }}
      >
        <div className="w-14 h-14 rounded-2xl bg-[#2D8A4E]/20 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-7 h-7 text-[#2D8A4E]" />
        </div>
        
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-heading">
          Ecosystem Verification
        </h2>
        
        <p className="text-[#A8C4B0] leading-relaxed mb-6">
          Every project in our ecosystem undergoes rigorous verification to ensure 
          credibility, feasibility, and real environmental impact for Wales.
        </p>
        
        <button className="glass-button w-fit text-sm">
          See the checklist
        </button>
      </div>

      {/* Small Tiles */}
      {verificationItems.map((item, index) => {
        const positions: Record<number, { left: string; top: string }> = {
          0: { left: '6vw', top: '14vh' },
          1: { left: '6vw', top: '56vh' },
          2: { left: '72vw', top: '14vh' },
          3: { left: '72vw', top: '56vh' },
        };
        const pos = positions[index];
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            ref={(el) => { smallTilesRef.current[index] = el; }}
            className="absolute glass-card-sm p-5 w-44 lg:w-52"
            style={{
              left: pos.left,
              top: pos.top,
              height: '26vh',
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-[#2D8A4E]/20 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-[#2D8A4E]" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-2">
              {item.title}
            </h4>
            <p className="text-xs text-[#A8C4B0] leading-relaxed">
              {item.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
