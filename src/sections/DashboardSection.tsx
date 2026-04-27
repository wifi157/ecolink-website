import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, AlertTriangle, Paperclip, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function DashboardSection() {
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

      // Left dashboard tile entrance
      tl.fromTo(
        leftTileRef.current,
        { x: '-60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Right top tile entrance
      tl.fromTo(
        rightTopRef.current,
        { x: '50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Right bottom tile entrance
      tl.fromTo(
        rightBottomRef.current,
        { y: '40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
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
        { y: '18vh', opacity: 0, ease: 'power2.in' },
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
      {/* Left Large Dashboard Tile */}
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
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl lg:text-2xl font-bold text-white font-heading">
            Live Ecosystem Dashboard
          </h3>
          <span className="status-badge live">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-pulse-dot" />
            Live
          </span>
        </div>

        {/* Dashboard Image */}
        <div className="rounded-xl overflow-hidden mb-6 border border-[#2D8A4E]/20">
          <img
            src="/dashboard_chart_ui.jpg"
            alt="Dashboard"
            className="w-full h-48 lg:h-64 object-cover"
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-[#4CAF50]" />
              <span className="text-xs text-[#A8C4B0]">Baseline</span>
            </div>
            <p className="text-lg lg:text-xl font-bold text-white">850 tCO₂e</p>
          </div>
          <div className="glass-card-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#4FC3F7]" />
              <span className="text-xs text-[#A8C4B0]">Actual</span>
            </div>
            <p className="text-lg lg:text-xl font-bold text-white">620 tCO₂e</p>
          </div>
          <div className="glass-card-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-[#F4A460]" />
              <span className="text-xs text-[#A8C4B0]">Alerts</span>
            </div>
            <p className="text-lg lg:text-xl font-bold text-white">2 Active</p>
          </div>
        </div>
      </div>

      {/* Right Top Info Tile */}
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
        <h3 className="text-lg font-bold text-white mb-4 font-heading">
          Real-time Monitoring
        </h3>
        <p className="text-sm text-[#A8C4B0] leading-relaxed mb-4">
          Track your ecosystem impact across energy, waste, water, and nature-based projects.
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-sm text-[#A8C4B0]">
            <Activity className="w-4 h-4 text-[#4CAF50] mt-0.5 flex-shrink-0" />
            Baseline vs. actual reduction
          </li>
          <li className="flex items-start gap-3 text-sm text-[#A8C4B0]">
            <AlertTriangle className="w-4 h-4 text-[#F4A460] mt-0.5 flex-shrink-0" />
            Automated anomaly alerts
          </li>
          <li className="flex items-start gap-3 text-sm text-[#A8C4B0]">
            <Paperclip className="w-4 h-4 text-[#4FC3F7] mt-0.5 flex-shrink-0" />
            Document attachments per update
          </li>
        </ul>
      </div>

      {/* Right Bottom Metric Tile */}
      <div
        ref={rightBottomRef}
        className="absolute glass-card p-6 flex flex-col justify-between"
        style={{
          left: '62vw',
          top: '52vh',
          width: '32vw',
          height: '34vh',
        }}
      >
        <div>
          <p className="text-4xl lg:text-5xl font-bold text-white mb-2 font-heading">
            12,400
          </p>
          <p className="text-lg text-[#A8C4B0]">tCO₂e</p>
          <p className="text-sm text-[#A8C4B0] mt-1">
            Tracked across Welsh projects
          </p>
        </div>
        <a
          href="#"
          className="text-sm text-[#2D8A4E] hover:text-[#3CB371] transition-colors"
        >
          View methodology →
        </a>
      </div>
    </section>
  );
}
