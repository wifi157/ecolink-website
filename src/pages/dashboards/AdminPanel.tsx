import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Clock, AlertTriangle, 
  FileText, MessageSquare, Filter,
  Search, Download
} from 'lucide-react';
import { dummyProjects } from '@/data/projects';
import type { VerificationStatus, RiskLevel } from '@/types';

const statusStyles: Record<VerificationStatus, string> = {
  'Verified': 'bg-emerald-500/15 text-emerald-400',
  'In Review': 'bg-amber-500/15 text-amber-400',
  'Unverified': 'bg-red-500/15 text-red-400',
};

const riskStyles: Record<RiskLevel, string> = {
  'Low': 'text-emerald-400',
  'Medium': 'text-amber-400',
  'High': 'text-red-400',
};

export function AdminPanel() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = dummyProjects.filter(project => {
    if (selectedStatus !== 'all' && project.verificationStatus !== selectedStatus) return false;
    if (searchQuery) {
      return project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             project.location.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const stats = {
    pending: dummyProjects.filter(p => p.verificationStatus === 'In Review').length,
    verified: dummyProjects.filter(p => p.verificationStatus === 'Verified').length,
    flagged: 2,
    total: dummyProjects.length,
  };

  return (
    <div className="min-h-screen bg-[#070B14] pt-24 lg:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white font-heading">
              Admin Panel
            </h1>
            <p className="text-[#A7B1C6]">
              Review and manage project submissions
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stats.pending}</p>
            <p className="text-xs text-[#A7B1C6]">Pending Review</p>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stats.verified}</p>
            <p className="text-xs text-[#A7B1C6]">Verified</p>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stats.flagged}</p>
            <p className="text-xs text-[#A7B1C6]">Flagged</p>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-5 h-5 text-[#4F46E5]" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stats.total}</p>
            <p className="text-xs text-[#A7B1C6]">Total Projects</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 glass-card p-4 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#A7B1C6]" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-[#A7B1C6] outline-none"
            />
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <Filter className="w-5 h-5 text-[#A7B1C6]" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-white outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#070B14]">All Statuses</option>
              <option value="In Review" className="bg-[#070B14]">In Review</option>
              <option value="Verified" className="bg-[#070B14]">Verified</option>
              <option value="Unverified" className="bg-[#070B14]">Unverified</option>
            </select>
          </div>
        </div>

        {/* Projects Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-[#A7B1C6] border-b border-white/10 bg-white/5">
                  <th className="p-4 font-medium">Project</th>
                  <th className="p-4 font-medium">Company</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Risk</th>
                  <th className="p-4 font-medium">CO₂e</th>
                  <th className="p-4 font-medium">Funding</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-white font-medium">{project.title}</p>
                          <p className="text-xs text-[#A7B1C6]">{project.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-white text-sm">Green Company Ltd</p>
                      <p className="text-xs text-[#A7B1C6]">ID: GB12345678</p>
                    </td>
                    <td className="p-4">
                      <select
                        value={project.verificationStatus}
                        onChange={() => {}}
                        className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer ${statusStyles[project.verificationStatus]}`}
                      >
                        <option value="Verified" className="bg-[#070B14]">Verified</option>
                        <option value="In Review" className="bg-[#070B14]">In Review</option>
                        <option value="Unverified" className="bg-[#070B14]">Unverified</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <select
                        value={project.riskLevel}
                        onChange={() => {}}
                        className={`text-sm bg-transparent border-0 cursor-pointer ${riskStyles[project.riskLevel]}`}
                      >
                        <option value="Low" className="bg-[#070B14]">Low</option>
                        <option value="Medium" className="bg-[#070B14]">Medium</option>
                        <option value="High" className="bg-[#070B14]">High</option>
                      </select>
                    </td>
                    <td className="p-4 text-white text-sm">
                      {project.co2eAnnual} t/yr
                    </td>
                    <td className="p-4 text-white text-sm">
                      £{(project.fundingRequired / 1000).toFixed(0)}k
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/projects/${project.id}`}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          title="View Project"
                        >
                          <FileText className="w-4 h-4 text-[#A7B1C6]" />
                        </Link>
                        <button
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          title="Add Note"
                        >
                          <MessageSquare className="w-4 h-4 text-[#A7B1C6]" />
                        </button>
                        <button
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          title="Download Docs"
                        >
                          <Download className="w-4 h-4 text-[#A7B1C6]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="mt-6 glass-card p-4 flex flex-wrap items-center gap-4">
          <span className="text-sm text-[#A7B1C6]">Bulk Actions:</span>
          <button className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 transition-colors">
            Approve Selected
          </button>
          <button className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 text-sm font-medium hover:bg-amber-500/30 transition-colors">
            Request More Info
          </button>
          <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors">
            Reject Selected
          </button>
        </div>
      </div>
    </div>
  );
}
