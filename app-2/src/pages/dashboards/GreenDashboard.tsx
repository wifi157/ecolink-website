import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, FileText, Upload, CheckCircle2, Clock, 
  TrendingUp, Wallet, Target, AlertCircle
} from 'lucide-react';
import { dummyProjects } from '@/data/projects';
import type { VerificationStatus, TrackingStatus } from '@/types';

const statusStyles: Record<VerificationStatus | TrackingStatus, string> = {
  'Verified': 'bg-emerald-500/15 text-emerald-400',
  'In Review': 'bg-amber-500/15 text-amber-400',
  'Unverified': 'bg-red-500/15 text-red-400',
  'Live': 'bg-indigo-500/15 text-indigo-400',
  'Not Started': 'bg-slate-500/15 text-slate-400',
  'Completed': 'bg-emerald-500/15 text-emerald-400',
};

export function GreenDashboard() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('nocarbon_auth');
    if (auth) {
      setUser(JSON.parse(auth));
    }
  }, []);

  const myProjects = dummyProjects.slice(0, 3);
  const totalFunding = myProjects.reduce((sum, p) => sum + p.fundingRequired, 0);
  const completedMilestones = myProjects.reduce((sum, p) => 
    sum + p.milestones.filter(m => m.status === 'Completed').length, 0
  );
  const totalMilestones = myProjects.reduce((sum, p) => sum + p.milestones.length, 0);
  const milestonePercent = Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <div className="min-h-screen bg-[#070B14] pt-24 lg:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white font-heading">
              Green Company Dashboard
            </h1>
            <p className="text-[#A7B1C6]">
              Welcome back, {user?.name || 'User'}
            </p>
          </div>
          <Link to="#" className="btn-primary inline-flex items-center gap-2 w-fit">
            <Plus className="w-4 h-4" />
            Submit New Project
          </Link>
        </div>

        {/* Overview Widgets */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-5 h-5 text-[#4F46E5]" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">{myProjects.length}</p>
            <p className="text-xs text-[#A7B1C6]">Projects Submitted</p>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <Wallet className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">£{(totalFunding / 1000).toFixed(0)}k</p>
            <p className="text-xs text-[#A7B1C6]">Funding Requested</p>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <Target className="w-5 h-5 text-indigo-400" />
              <span className="text-xs text-indigo-400">{milestonePercent}%</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{completedMilestones}/{totalMilestones}</p>
            <p className="text-xs text-[#A7B1C6]">Milestones Complete</p>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">1,240</p>
            <p className="text-xs text-[#A7B1C6]">tCO₂e Tracked</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Projects Table */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white font-heading">My Projects</h2>
                <Link to="#" className="text-sm text-[#4F46E5] hover:underline">
                  View all
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-[#A7B1C6] border-b border-white/10">
                      <th className="pb-3 font-medium">Project</th>
                      <th className="pb-3 font-medium">Verification</th>
                      <th className="pb-3 font-medium">Tracking</th>
                      <th className="pb-3 font-medium">Funding Stage</th>
                      <th className="pb-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {myProjects.map((project) => (
                      <tr key={project.id} className="border-b border-white/5 last:border-0">
                        <td className="py-4">
                          <div>
                            <p className="text-white font-medium">{project.title}</p>
                            <p className="text-xs text-[#A7B1C6]">{project.location}</p>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[project.verificationStatus]}`}>
                            {project.verificationStatus}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[project.trackingStatus]}`}>
                            {project.trackingStatus}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 rounded-full bg-white/10 overflow-hidden">
                              <div
                                className="h-full bg-[#4F46E5] rounded-full"
                                style={{ 
                                  width: `${(project.milestones.filter(m => m.status === 'Completed').length / project.milestones.length) * 100}%` 
                                }}
                              />
                            </div>
                            <span className="text-xs text-[#A7B1C6]">
                              {project.milestones.filter(m => m.status === 'Completed').length}/{project.milestones.length}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/projects/${project.id}`}
                              className="text-[#4F46E5] hover:underline text-sm"
                            >
                              Edit
                            </Link>
                            <Link
                              to="#"
                              className="text-emerald-400 hover:underline text-sm"
                            >
                              Update
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Submit Updates Module */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-6 font-heading">Submit Update</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Select Project
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#4F46E5] transition-colors">
                    <option className="bg-[#070B14]">Waste-to-Value SME Program</option>
                    <option className="bg-[#070B14]">Solar Rooftop Retrofit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Progress %
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#A7B1C6] outline-none focus:border-[#4F46E5] transition-colors"
                    placeholder="75"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Update Summary
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#A7B1C6] outline-none focus:border-[#4F46E5] transition-colors resize-none"
                  placeholder="Describe progress, issues, and next steps..."
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="glass-button flex items-center gap-2 text-sm">
                  <Upload className="w-4 h-4" />
                  Upload Photos
                </button>
                <button className="glass-button flex items-center gap-2 text-sm">
                  <Upload className="w-4 h-4" />
                  Upload Invoices
                </button>
                <button className="glass-button flex items-center gap-2 text-sm">
                  <Upload className="w-4 h-4" />
                  Sensor Reports
                </button>
                <button className="btn-primary ml-auto">
                  Submit Update
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Actions */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-[#4F46E5]" />
                <h2 className="text-lg font-bold text-white font-heading">Next Actions</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white mb-1">Submit milestone evidence</p>
                    <p className="text-xs text-[#A7B1C6]">Due: 2024-04-15</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <Clock className="w-5 h-5 text-[#A7B1C6] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white mb-1">Update project photos</p>
                    <p className="text-xs text-[#A7B1C6]">Recommended</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <FileText className="w-5 h-5 text-[#A7B1C6] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white mb-1">Upload verification docs</p>
                    <p className="text-xs text-[#A7B1C6]">Optional</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Log */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4 font-heading">Recent Activity</h2>
              <div className="space-y-4">
                <div className="border-l-2 border-[#4F46E5]/30 pl-4">
                  <p className="text-xs text-[#A7B1C6] mb-1">Today</p>
                  <p className="text-sm text-white">Milestone "Site Assessment" marked complete</p>
                </div>
                <div className="border-l-2 border-white/10 pl-4">
                  <p className="text-xs text-[#A7B1C6] mb-1">2 days ago</p>
                  <p className="text-sm text-white">Update submitted with 5 photos</p>
                </div>
                <div className="border-l-2 border-white/10 pl-4">
                  <p className="text-xs text-[#A7B1C6] mb-1">1 week ago</p>
                  <p className="text-sm text-white">Project approved for listing</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4 font-heading">Quick Stats</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[#A7B1C6]">Verification Progress</span>
                    <span className="text-sm text-white">75%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-3/4 bg-[#4F46E5] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[#A7B1C6]">Documentation</span>
                    <span className="text-sm text-white">60%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-3/5 bg-emerald-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
