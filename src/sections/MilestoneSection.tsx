import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Sprout, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export function MilestoneSection() {
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
        className="absolute glass-card p-8 flex flex-col justify-center"
        style={{
          left: '6vw',
          top: '10vh',
          width: '88vw',
          height: '28vh',
        }}
      >
        <h2 className="text-2xl lg:text-4xl font-bold text-white mb-3 font-heading">
          Milestone-Based Funding
        </h2>
        <p className="text-lg text-[#A8C4B0] max-w-2xl">
          Funds are released as verified progress is delivered—protecting both funders and project owners.
        </p>
      </div>

      {/* Left Bottom Tile - For Funders */}
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
            <Building2 className="w-6 h-6 text-[#2D8A4E]" />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">For Funders</h3>
        </div>

        <ul className="space-y-4 mb-6">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#2D8A4E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-[#2D8A4E]">1</span>
            </span>
            <span className="text-[#A8C4B0]">Set budget, priorities, and risk appetite</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#2D8A4E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-[#2D8A4E]">2</span>
            </span>
            <span className="text-[#A8C4B0]">Get ranked project recommendations</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#2D8A4E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-[#2D8A4E]">3</span>
            </span>
            <span className="text-[#A8C4B0]">Sign agreements and track releases</span>
          </li>
        </ul>

        <Link
          to="/signup"
          className="btn-primary inline-flex items-center gap-2 text-sm"
        >
          Create funder account
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Right Bottom Tile - For Project Owners */}
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
          <div className="w-12 h-12 rounded-xl bg-[#1E90B8]/20 flex items-center justify-center">
            <Sprout className="w-6 h-6 text-[#4FC3F7]" />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">For Project Owners</h3>
        </div>

        <ul className="space-y-4 mb-6">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#1E90B8]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-[#4FC3F7]">1</span>
            </span>
            <span className="text-[#A8C4B0]">Submit proposal + baseline evidence</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#1E90B8]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-[#4FC3F7]">2</span>
            </span>
            <span className="text-[#A8C4B0]">Pass verification and list your project</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#1E90B8]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-[#4FC3F7]">3</span>
            </span>
            <span className="text-[#A8C4B0]">Receive milestone payments on delivery</span>
          </li>
        </ul>

        <Link
          to="/signup"
          className="btn-secondary inline-flex items-center gap-2 text-sm"
        >
          Apply as project owner
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
