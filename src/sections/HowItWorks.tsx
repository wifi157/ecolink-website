import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Handshake, LineChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Browse verified projects',
    description: 'Filter by sector, region, SDG, and verification level. Review detailed project profiles with CO₂e estimates and milestone plans.',
  },
  {
    icon: Handshake,
    number: '02',
    title: 'Fund via milestones',
    description: 'Agree on deliverables, then release funds as progress is verified. Our escrow system protects both parties throughout the project lifecycle.',
  },
  {
    icon: LineChart,
    number: '03',
    title: 'Track and report',
    description: 'Monitor CO₂e reduction in real-time and export audit-ready documentation for your CSR and ESG reporting requirements.',
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step) => {
        if (step) {
          gsap.fromTo(
            step,
            { x: -60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#0A1F15]"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
            How the Ecosystem Works
          </h2>
          <p className="text-[#A8C4B0] max-w-xl mx-auto">
            Three simple steps to start funding verified green projects across Wales.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[index] = el; }}
                className="glass-card p-6 lg:p-8 flex flex-col lg:flex-row items-start gap-6"
              >
                <div className="flex items-center gap-4 lg:w-48 flex-shrink-0">
                  <span className="text-4xl font-bold text-[#2D8A4E]/30 font-mono">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#2D8A4E]/20 flex items-center justify-center lg:hidden">
                    <Icon className="w-6 h-6 text-[#2D8A4E]" />
                  </div>
                </div>
                
                <div className="hidden lg:flex w-12 h-12 rounded-xl bg-[#2D8A4E]/20 items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-[#2D8A4E]" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-[#A8C4B0] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Join the Ecosystem
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/signup" className="btn-secondary inline-flex items-center gap-2">
            Apply as Project Owner
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
