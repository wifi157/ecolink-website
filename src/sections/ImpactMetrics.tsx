import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Briefcase, Clock, CheckCircle2 } from 'lucide-react';
import { impactMetrics } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { icon: TrendingUp, value: impactMetrics.projectedCo2eReduced, suffix: ' tCO₂e', label: 'CO₂e Reduced' },
  { icon: Briefcase, value: impactMetrics.projectsListed, suffix: '', label: 'Active Projects' },
  { icon: Clock, value: impactMetrics.avgVerificationTime, suffix: ' days', label: 'Avg Verification' },
  { icon: CheckCircle2, value: impactMetrics.milestoneCompletionRate, suffix: '%', label: 'Milestone Success' },
];

export function ImpactMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Cards reveal animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.1,
            }
          );
        }
      });

      // Number count-up animation
      numbersRef.current.forEach((numEl, index) => {
        if (numEl) {
          const targetValue = metrics[index].value;
          gsap.fromTo(
            { value: 0 },
            { value: targetValue },
            {
              duration: 2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: numEl,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
              onUpdate: function () {
                if (numEl) {
                  numEl.textContent = Math.round(this.targets()[0].value).toLocaleString();
                }
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
      className="relative w-full py-24 lg:py-32 bg-[#0A1F15] eco-bg"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
            Ecosystem Impact
          </h2>
          <p className="text-[#A8C4B0]">
            Real results from verified projects across Wales.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2D8A4E]/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#2D8A4E]" />
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-white mb-2 font-heading">
                  <span ref={(el) => { numbersRef.current[index] = el; }}>0</span>
                  {metric.suffix}
                </p>
                <p className="text-sm text-[#A8C4B0]">{metric.label}</p>
              </div>
            );
          })}
        </div>

        {/* Partner Logos */}
        <div className="text-center">
          <p className="text-sm text-[#A8C4B0] mb-6">Ecosystem Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 opacity-40">
            {['Welsh Government', 'Natural Resources Wales', 'Cardiff University', 'Swansea Bay', 'Pembrokeshire Coast'].map((partner) => (
              <div
                key={partner}
                className="text-lg font-bold text-white"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
