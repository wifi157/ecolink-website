import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Leaf, Droplets, Sun, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dummyProjects } from '@/data/projects';
import type { VerificationStatus, TrackingStatus } from '@/types';

const statusStyles: Record<VerificationStatus | TrackingStatus, string> = {
  'Verified': 'bg-[#2D8A4E]/20 text-[#4CAF50]',
  'In Review': 'bg-[#F4A460]/20 text-[#FF9800]',
  'Unverified': 'bg-[#E53935]/20 text-[#E53935]',
  'Live': 'bg-[#1E90B8]/20 text-[#4FC3F7]',
  'Not Started': 'bg-slate-500/15 text-slate-400',
  'Completed': 'bg-[#2D8A4E]/20 text-[#4CAF50]',
};

const heroCards = [
  { project: dummyProjects[0], position: { left: '6vw', top: '14vh' }, delay: 0 },
  { project: dummyProjects[1], position: { left: '74vw', top: '10vh' }, delay: 0.08 },
  { project: dummyProjects[3], position: { left: '78vw', top: '62vh' }, delay: 0.16 },
  { project: dummyProjects[2], position: { left: '8vw', top: '68vh' }, delay: 0.24 },
  { project: dummyProjects[4], position: { left: '34vw', top: '10vh' }, delay: 0.32 },
  { project: dummyProjects[5], position: { left: '56vw', top: '76vh' }, delay: 0.4 },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline entrance animation
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power2.out',
            delay: 0.3,
          }
        );
      }

      // Cards entrance animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              scale: 0.78,
              opacity: 0,
              rotate: -6,
            },
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              duration: 0.7,
              delay: 0.5 + heroCards[index].delay,
              ease: 'back.out(1.2)',
            }
          );

          // Floating animation
          gsap.to(card, {
            y: -10,
            duration: 3.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: index * 0.3,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0A1F15] eco-bg overflow-hidden flex items-center justify-center"
    >
      {/* Floating Project Cards */}
      {heroCards.map((card, index) => (
        <div
          key={card.project.id}
          ref={(el) => { cardsRef.current[index] = el; }}
          className="absolute hidden lg:block glass-card-sm p-4 w-44 xl:w-52 opacity-0"
          style={{
            left: card.position.left,
            top: card.position.top,
            zIndex: 10,
          }}
        >
          <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3">
            <img
              src={card.project.imageUrl}
              alt={card.project.title}
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="text-sm font-semibold text-white mb-2 line-clamp-2">
            {card.project.title}
          </h4>
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusStyles[card.project.verificationStatus]}`}>
              {card.project.verificationStatus}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-[#A8C4B0]">
            <span>{card.project.co2eAnnual} tCO₂e</span>
            <span>£{(card.project.fundingRequired / 1000).toFixed(0)}k</span>
          </div>
        </div>
      ))}

      {/* Center Content */}
      <div
        ref={headlineRef}
        className="relative z-20 text-center px-6 max-w-4xl mx-auto pt-20"
      >
        <span className="eyebrow mb-6 block text-[#3CB371]">RECYMRU ECOSYSTEM</span>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="word inline-block">Wales'</span>{' '}
          <span className="word inline-block gradient-text">Sustainable</span>{' '}
          <span className="word inline-block">Ecosystem</span>
        </h1>
        
        <p className="word text-lg lg:text-xl text-[#A8C4B0] mb-8 max-w-2xl mx-auto leading-relaxed">
          Connecting green energy, waste reduction, and nature-based projects with 
          verified funding and transparent impact tracking.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link to="/contact" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
            Join the Ecosystem
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/projects" className="btn-secondary w-full sm:w-auto text-center">
            Explore Projects
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#A8C4B0]">
          <span className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#4CAF50]" />
            Nature-based solutions
          </span>
          <span className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-[#4FC3F7]" />
            Renewable energy
          </span>
          <span className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-[#1E90B8]" />
            Water conservation
          </span>
          <span className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-[#F4A460]" />
            Solar & wind
          </span>
        </div>
      </div>

      {/* Mobile Project Cards Grid */}
      <div className="lg:hidden absolute bottom-8 left-0 right-0 px-6">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
          {dummyProjects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-64 glass-card-sm p-4 snap-start"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-sm font-semibold text-white mb-2">
                {project.title}
              </h4>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusStyles[project.verificationStatus]}`}>
                {project.verificationStatus}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
