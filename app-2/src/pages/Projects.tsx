import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { dummyProjects } from '@/data/projects';
import type { VerificationStatus, TrackingStatus, RiskLevel, Sector, SDG } from '@/types';

const statusStyles: Record<VerificationStatus | TrackingStatus, string> = {
  'Verified': 'bg-emerald-500/15 text-emerald-400',
  'In Review': 'bg-amber-500/15 text-amber-400',
  'Unverified': 'bg-red-500/15 text-red-400',
  'Live': 'bg-indigo-500/15 text-indigo-400',
  'Not Started': 'bg-slate-500/15 text-slate-400',
  'Completed': 'bg-emerald-500/15 text-emerald-400',
};

const riskStyles: Record<RiskLevel, string> = {
  'Low': 'text-emerald-400',
  'Medium': 'text-amber-400',
  'High': 'text-red-400',
};

const sectors: Sector[] = ['Energy', 'Waste', 'Nature-based', 'Transport', 'Buildings'];
const sdgList: SDG[] = ['7', '11', '12', '13', '15'];

export function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<Sector[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<VerificationStatus[]>([]);
  const [selectedTracking, setSelectedTracking] = useState<TrackingStatus[]>([]);
  const [selectedSDGs, setSelectedSDGs] = useState<SDG[]>([]);
  const [sortBy, setSortBy] = useState('impact');
  const [showFilters, setShowFilters] = useState(false);

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

  const toggleTracking = (status: TrackingStatus) => {
    setSelectedTracking(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const toggleSDG = (sdg: SDG) => {
    setSelectedSDGs(prev =>
      prev.includes(sdg)
        ? prev.filter(s => s !== sdg)
        : [...prev, sdg]
    );
  };

  const filteredProjects = dummyProjects.filter(project => {
    if (selectedSectors.length > 0 && !selectedSectors.includes(project.sector)) return false;
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(project.verificationStatus)) return false;
    if (selectedTracking.length > 0 && !selectedTracking.includes(project.trackingStatus)) return false;
    if (selectedSDGs.length > 0 && !project.sdgTags.some(sdg => selectedSDGs.includes(sdg))) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        project.sector.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'impact':
        return b.co2eAnnual - a.co2eAnnual;
      case 'funding':
        return b.fundingRequired - a.fundingRequired;
      case 'timeline':
        return a.timelineMonths - b.timelineMonths;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-[#070B14] pt-24 lg:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 font-heading">
            Project Marketplace
          </h1>
          <p className="text-[#A7B1C6]">
            Browse verified carbon reduction projects from green companies worldwide.
          </p>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 glass-card p-4 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#A7B1C6]" />
            <input
              type="text"
              placeholder="Search projects, locations, or SDGs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-[#A7B1C6] outline-none"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden glass-button flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <div className="glass-card p-4 flex items-center gap-3">
            <span className="text-sm text-[#A7B1C6]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-white outline-none cursor-pointer"
            >
              <option value="impact" className="bg-[#070B14]">Impact (CO₂e)</option>
              <option value="funding" className="bg-[#070B14]">Funding Required</option>
              <option value="timeline" className="bg-[#070B14]">Timeline</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
            <div className="glass-card p-6 space-y-6">
              {/* Sector Filter */}
              <div>
                <h4 className="text-sm font-medium text-white mb-3">Sector</h4>
                <div className="space-y-2">
                  {sectors.map((sector) => (
                    <label key={sector} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSectors.includes(sector)}
                        onChange={() => toggleSector(sector)}
                        className="w-4 h-4 rounded border-white/20 bg-transparent text-[#4F46E5] focus:ring-[#4F46E5]"
                      />
                      <span className="text-sm text-[#A7B1C6]">{sector}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Verification Status */}
              <div>
                <h4 className="text-sm font-medium text-white mb-3">Verification Status</h4>
                <div className="space-y-2">
                  {(['Verified', 'In Review', 'Unverified'] as VerificationStatus[]).map((status) => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStatuses.includes(status)}
                        onChange={() => toggleStatus(status)}
                        className="w-4 h-4 rounded border-white/20 bg-transparent text-[#4F46E5] focus:ring-[#4F46E5]"
                      />
                      <span className="text-sm text-[#A7B1C6]">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tracking Status */}
              <div>
                <h4 className="text-sm font-medium text-white mb-3">Tracking Status</h4>
                <div className="space-y-2">
                  {(['Not Started', 'Live', 'Completed'] as TrackingStatus[]).map((status) => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTracking.includes(status)}
                        onChange={() => toggleTracking(status)}
                        className="w-4 h-4 rounded border-white/20 bg-transparent text-[#4F46E5] focus:ring-[#4F46E5]"
                      />
                      <span className="text-sm text-[#A7B1C6]">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* SDG Filter */}
              <div>
                <h4 className="text-sm font-medium text-white mb-3">SDG Goals</h4>
                <div className="flex flex-wrap gap-2">
                  {sdgList.map((sdg) => (
                    <button
                      key={sdg}
                      onClick={() => toggleSDG(sdg)}
                      className={`px-2 py-1 rounded-md text-xs transition-all ${
                        selectedSDGs.includes(sdg)
                          ? 'bg-[#4F46E5] text-white'
                          : 'bg-white/5 text-[#A7B1C6] hover:bg-white/10'
                      }`}
                    >
                      SDG {sdg}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-[#A7B1C6]">
                Showing {sortedProjects.length} projects
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="glass-card overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusStyles[project.verificationStatus]}`}>
                        {project.verificationStatus}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusStyles[project.trackingStatus]}`}>
                        {project.trackingStatus}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#4F46E5] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#A7B1C6] mb-3 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm mb-4">
                      <span className="text-[#A7B1C6] flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {project.co2eAnnual} tCO₂e/yr
                      </span>
                      <span className="text-[#A7B1C6] flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {project.timelineMonths} mo
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-lg font-bold text-white">
                        £{(project.fundingRequired / 1000).toFixed(0)}k
                      </span>
                      <span className={`text-sm flex items-center gap-1 ${riskStyles[project.riskLevel]}`}>
                        <AlertCircle className="w-4 h-4" />
                        {project.riskLevel} Risk
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {sortedProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#A7B1C6]">No projects match your filters.</p>
                <button
                  onClick={() => {
                    setSelectedSectors([]);
                    setSelectedStatuses([]);
                    setSelectedTracking([]);
                    setSelectedSDGs([]);
                    setSearchQuery('');
                  }}
                  className="mt-4 text-[#4F46E5] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
