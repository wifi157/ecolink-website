import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Filter, MapPin, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dummyProjects } from '@/data/projects';
import type { VerificationStatus, TrackingStatus, RiskLevel, Sector, SDG } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const statusStyles: Record<VerificationStatus | TrackingStatus, string> = {
  'Verified': 'bg-[#2D8A4E]/20 text-[#4CAF50]',
  'In Review': 'bg-[#F4A460]/20 text-[#FF9800]',
  'Unverified': 'bg-[#E53935]/20 text-[#E53935]',
  'Live': 'bg-[#1E90B8]/20 text-[#4FC3F7]',
  'Not Started': 'bg-slate-500/15 text-slate-400',
  'Completed': 'bg-[#2D8A4E]/20 text-[#4CAF50]',
};

const riskStyles: Record<RiskLevel, string> = {
  'Low': 'text-[#4CAF50]',
  'Medium': 'text-[#FF9800]',
  'High': 'text-[#E53935]',
};

const sectors: Sector[] = ['Energy', 'Waste', 'Nature-based', 'Transport', 'Buildings'];
const sdgList: SDG[] = ['7', '11', '12', '13', '15'];

export function MarketplaceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [selectedSectors, setSelectedSectors] = useState<Sector[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<VerificationStatus[]>([]);

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

      // Sidebar entrance
      tl.fromTo(
        sidebarRef.current,
        { x: '-35vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Search bar entrance
      tl.fromTo(
        searchRef.current,
        { y: '-20vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Project cards entrance
      cardsRef.current.forEach((card, index) => {
        if (card) {
          tl.fromTo(
            card,
            { y: '60vh', opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, ease: 'none' },
            0.08 + index * 0.04
          );
        }
      });

      // Exit phase
      tl.to(
        sidebarRef.current,
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      tl.to(
        searchRef.current,
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      cardsRef.current.forEach((card) => {
        if (card) {
          tl.to(
            card,
            { y: '16vh', opacity: 0, ease: 'power2.in' },
            0.7
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleSector = (sector: Sector) => {
    setSelectedSectors(prev =>
      prev.includes(sector)
        ? prev.filter(s => s !== sector)
        : [...prev, sector]
    );
  };

  const toggleStatus = (status: VerificationStatus) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const displayedProjects = dummyProjects.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0A1F15] eco-bg overflow-hidden"
    >
      {/* Left Sidebar */}
      <div
        ref={sidebarRef}
        className="absolute glass-card p-6 overflow-y-auto"
        style={{
          left: '6vw',
          top: '14vh',
          width: '22vw',
          height: '72vh',
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-[#2D8A4E]" />
          <h3 className="text-lg font-bold text-white font-heading">Filters</h3>
        </div>

        {/* Sector Filters */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-[#A8C4B0] mb-3">Sector</h4>
          <div className="flex flex-wrap gap-2">
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => toggleSector(sector)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedSectors.includes(sector)
                    ? 'bg-[#2D8A4E] text-white'
                    : 'bg-white/5 text-[#A8C4B0] hover:bg-white/10'
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filters */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-[#A8C4B0] mb-3">Verification Status</h4>
          <div className="space-y-2">
            {(['Verified', 'In Review', 'Unverified'] as VerificationStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => toggleStatus(status)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all ${
                  selectedStatuses.includes(status)
                    ? 'bg-white/10 text-white'
                    : 'text-[#A8C4B0] hover:bg-white/5'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${
                  status === 'Verified' ? 'bg-[#4CAF50]' :
                  status === 'In Review' ? 'bg-[#FF9800]' : 'bg-[#E53935]'
                }`} />
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* SDG Tags */}
        <div>
          <h4 className="text-sm font-medium text-[#A8C4B0] mb-3">SDG Goals</h4>
          <div className="flex flex-wrap gap-2">
            {sdgList.map((sdg) => (
              <span
                key={sdg}
                className="px-2 py-1 rounded-md bg-white/5 text-xs text-[#A8C4B0]"
              >
                SDG {sdg}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div
        ref={searchRef}
        className="absolute glass-card p-4 flex items-center justify-between"
        style={{
          left: '30vw',
          top: '14vh',
          width: '64vw',
          height: '10vh',
        }}
      >
        <div className="flex items-center gap-3 flex-1">
          <Search className="w-5 h-5 text-[#A8C4B0]" />
          <input
            type="text"
            placeholder="Search projects, locations, or SDGs..."
            className="bg-transparent text-white placeholder-[#A8C4B0] outline-none flex-1"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-[#A8C4B0]">
          <span>Sort by:</span>
          <select className="bg-white/5 border border-[#2D8A4E]/30 rounded-lg px-3 py-1.5 text-white outline-none">
            <option>Impact (CO₂e)</option>
            <option>Verification Level</option>
            <option>Timeline</option>
            <option>Funding Required</option>
          </select>
        </div>
      </div>

      {/* Project Cards */}
      {displayedProjects.map((project, index) => (
        <div
          key={project.id}
          ref={(el) => { cardsRef.current[index] = el; }}
          className="absolute glass-card overflow-hidden group cursor-pointer"
          style={{
            left: `${30 + index * 22}vw`,
            top: '28vh',
            width: '20vw',
            height: '58vh',
          }}
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusStyles[project.verificationStatus]}`}>
                {project.verificationStatus}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusStyles[project.trackingStatus]}`}>
                {project.trackingStatus}
              </span>
            </div>
            
            <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">
              {project.title}
            </h4>
            <p className="text-xs text-[#A8C4B0] mb-3 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {project.location}
            </p>
            
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="flex items-center gap-1 text-[#A8C4B0]">
                <TrendingUp className="w-3 h-3" />
                {project.co2eAnnual} tCO₂e
              </div>
              <div className="flex items-center gap-1 text-[#A8C4B0]">
                <Clock className="w-3 h-3" />
                {project.timelineMonths} mo
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                £{(project.fundingRequired / 1000).toFixed(0)}k
              </span>
              <span className={`text-xs flex items-center gap-1 ${riskStyles[project.riskLevel]}`}>
                <AlertCircle className="w-3 h-3" />
                {project.riskLevel} Risk
              </span>
            </div>
            
            <Link
              to={`/projects/${project.id}`}
              className="mt-4 block w-full text-center py-2 rounded-lg bg-[#2D8A4E]/20 text-[#2D8A4E] text-sm font-medium hover:bg-[#2D8A4E]/30 transition-colors"
            >
              View Project
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
