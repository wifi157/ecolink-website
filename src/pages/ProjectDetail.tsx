import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, FileText, ArrowRight } from 'lucide-react';
import { dummyProjects } from '@/data/projects';
import type { VerificationStatus, TrackingStatus, RiskLevel } from '@/types';

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

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = dummyProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#070B14] pt-24 lg:pt-28 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project not found</h1>
          <Link to="/projects" className="text-[#4F46E5] hover:underline">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B14] pt-24 lg:pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-[#A7B1C6] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>

        {/* Header */}
        <div className="glass-card p-6 lg:p-8 mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`text-xs px-3 py-1 rounded-full ${statusStyles[project.verificationStatus]}`}>
              {project.verificationStatus}
            </span>
            <span className={`text-xs px-3 py-1 rounded-full ${statusStyles[project.trackingStatus]}`}>
              {project.trackingStatus}
            </span>
          </div>

          <h1 className="text-2xl lg:text-4xl font-bold text-white mb-2 font-heading">
            {project.title}
          </h1>
          <p className="text-[#A7B1C6] flex items-center gap-2 mb-6">
            <MapPin className="w-4 h-4" />
            {project.location} • {project.sector}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card-sm p-4">
              <p className="text-sm text-[#A7B1C6] mb-1">CO₂e Annual</p>
              <p className="text-xl font-bold text-white">{project.co2eAnnual} t</p>
            </div>
            <div className="glass-card-sm p-4">
              <p className="text-sm text-[#A7B1C6] mb-1">CO₂e Lifetime</p>
              <p className="text-xl font-bold text-white">{project.co2eLifetime} t</p>
            </div>
            <div className="glass-card-sm p-4">
              <p className="text-sm text-[#A7B1C6] mb-1">Funding Required</p>
              <p className="text-xl font-bold text-white">£{(project.fundingRequired / 1000).toFixed(0)}k</p>
            </div>
            <div className="glass-card-sm p-4">
              <p className="text-sm text-[#A7B1C6] mb-1">Timeline</p>
              <p className="text-xl font-bold text-white">{project.timelineMonths} months</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="glass-card overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-64 lg:h-80 object-cover"
              />
            </div>

            {/* Overview */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-white mb-4 font-heading">Overview</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-[#A7B1C6] mb-1">Problem</h3>
                  <p className="text-white">{project.problem}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#A7B1C6] mb-1">Solution</h3>
                  <p className="text-white">{project.solution}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#A7B1C6] mb-1">Expected Outcome</h3>
                  <p className="text-white">{project.outcome}</p>
                </div>
              </div>
            </div>

            {/* CO₂e Metrics */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-white mb-4 font-heading">CO₂e Metrics</h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold text-white mb-1">{project.co2eAnnual}</p>
                  <p className="text-xs text-[#A7B1C6]">tCO₂e/year</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold text-white mb-1">{project.co2eLifetime}</p>
                  <p className="text-xs text-[#A7B1C6]">tCO₂e lifetime</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold text-emerald-400 mb-1">
                    {Math.round(project.co2eLifetime / project.timelineMonths * 12)}
                  </p>
                  <p className="text-xs text-[#A7B1C6]">tCO₂e/year avg</p>
                </div>
              </div>
              <p className="text-sm text-[#A7B1C6]">
                <span className="text-white">Methodology:</span> {project.methodology}
              </p>
            </div>

            {/* Funding Structure */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-white mb-4 font-heading">Funding Structure</h2>
              <div className="space-y-3">
                {project.milestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone.status === 'Completed' ? 'bg-emerald-500/20' :
                        milestone.status === 'In Progress' ? 'bg-indigo-500/20' :
                        'bg-white/10'
                      }`}>
                        <span className={`text-sm font-bold ${
                          milestone.status === 'Completed' ? 'text-emerald-400' :
                          milestone.status === 'In Progress' ? 'text-indigo-400' :
                          'text-[#A7B1C6]'
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{milestone.name}</p>
                        <p className="text-sm text-[#A7B1C6]">Due: {milestone.dueDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">£{(milestone.amount / 1000).toFixed(0)}k</p>
                      <span className={`text-xs ${
                        milestone.status === 'Completed' ? 'text-emerald-400' :
                        milestone.status === 'In Progress' ? 'text-indigo-400' :
                        'text-[#A7B1C6]'
                      }`}>
                        {milestone.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-white mb-4 font-heading">Documents</h2>
              <div className="space-y-2">
                {project.documents.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#4F46E5]" />
                      <div>
                        <p className="text-white text-sm">{doc.name}</p>
                        <p className="text-xs text-[#A7B1C6]">{doc.type} • {doc.uploadedAt}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#A7B1C6]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Risk & SDGs */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4 font-heading">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#A7B1C6] mb-1">Risk Rating</p>
                  <p className={`font-medium ${riskStyles[project.riskLevel]}`}>
                    {project.riskLevel} Risk
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#A7B1C6] mb-2">SDG Alignment</p>
                  <div className="flex flex-wrap gap-2">
                    {project.sdgTags.map((sdg) => (
                      <span
                        key={sdg}
                        className="px-2 py-1 rounded-md bg-[#4F46E5]/20 text-xs text-[#4F46E5]"
                      >
                        SDG {sdg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4 font-heading">
                Interested in this project?
              </h3>
              <p className="text-sm text-[#A7B1C6] mb-4">
                Book a demo to discuss funding opportunities and get detailed project information.
              </p>
              <Link
                to="/contact"
                className="btn-primary w-full text-center flex items-center justify-center gap-2"
              >
                Request Funding Discussion
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Updates */}
            {project.updateFeed.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-4 font-heading">Latest Updates</h3>
                <div className="space-y-4">
                  {project.updateFeed.map((update) => (
                    <div key={update.id} className="border-l-2 border-[#4F46E5]/30 pl-4">
                      <p className="text-sm text-[#A7B1C6] mb-1">{update.date}</p>
                      <p className="text-white text-sm">{update.summary}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-[#4F46E5] rounded-full"
                            style={{ width: `${update.progressPercent}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#A7B1C6]">{update.progressPercent}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
