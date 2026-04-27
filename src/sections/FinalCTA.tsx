import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#0A1F15]"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div
          ref={ctaRef}
          className="glass-card p-8 lg:p-12 text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
            Ready to join the ecosystem?
          </h2>
          <p className="text-[#A8C4B0] mb-8 max-w-lg mx-auto">
            Be part of Wales' sustainable future. Whether you're funding projects 
            or seeking funding, Recymru connects you to verified green impact.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center">
              Join the Ecosystem
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/signup" className="btn-secondary inline-flex items-center gap-2 w-full sm:w-auto justify-center">
              Apply as Project Owner
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
