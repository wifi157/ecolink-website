import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Briefcase, Wallet, Target, AlertTriangle, 
  FileText, Download, ChevronRight, Clock,
  BarChart3, PieChart
} from 'lucide-react';
import { dummyProjects, dummyReports } from '@/data/projects';
import type { VerificationStatus, TrackingStatus } from '@/types';

const statusStyles: Record<VerificationStatus | TrackingStatus, string> = {
  'Verified': 'bg-emerald-500/15 text-emerald-400',
  'In Review': 'bg-amber-500/15 text-amber-400',
  'Unverified': 'bg-red-500/15 text-red-400',
  'Live': 'bg-indigo-500/15 text-indigo-400',
  'Not Started': 'bg-slate-500/15 text-slate-400',
  'Completed': 'bg-emerald-500/15 text-emerald-400',
};

export function CorporateDashboard() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('nocarbon_auth');
    if (auth) {
      setUser(JSON.parse(auth));
    }
  }, []);

  const fundedProjects = dummyProjects.slice(0, 3);
  const totalCo2e = fundedProjects.reduce((sum, p) => sum + p.co2eAnnual, 0);
  const totalFunded = fundedProjects.reduce((sum, p) => sum + p.fundingRequired, 0);

  return (
    <div className="min-h-screen bg-[#070B14] pt-24 lg:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white font-heading">
              Corporate Dashboard
            </h1>
            <p className="text-[#A7B1C6]">
              Welcome back, {user?.name || 'User'}
            </p>
          </div>
          <Link to="/projects" className="btn-primary inline-flex items-center gap-2 w-fit">
            Browse Projects
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Overview Widgets */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="text-xs text-emerald-400">+12%</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{totalCo2e.toLocaleString()}</p>
            <p className="text-xs text-[#A7B1C6]">tCO₂e Reduced (YTD)</p>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <Briefcase className="w-5 h-5 text-[#4F46E5]" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">{fundedProjects.length}</p>
            <p className="text-xs text-[#A7B1C6]">Projects Funded</p>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <Wallet className="w-5 h-5 text-indigo-400" />
              <span className="text-xs text-[#A7B1C6]">68% used</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">£{(totalFunded / 1000).toFixed(0)}k</p>
            <p className="text-xs text-[#A7B1C6]">Budget Deployed</p>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <Target className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">5</p>
            <p className="text-xs text-[#A7B1C6]">SDGs Supported</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Projects Table */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white font-heading">Your Projects</h2>
                <Link to="#" className="text-sm text-[#4F46E5] hover:underline">
                  View all
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-[#A7B1C6] border-b border-white/10">
                      <th className="pb-3 font-medium">Project</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Tracking</th>
                      <th className="pb-3 font-medium">Funded</th>
                      <th className="pb-3 font-medium">Next Milestone</th>
                      <th className="pb-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundedProjects.map((project) => (
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
                        <td className="py-4 text-white">
                          £{(project.fundingRequired / 1000).toFixed(0)}k
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2 text-[#A7B1C6]">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{project.milestones[0]?.dueDate || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <Link
                            to={`/projects/${project.id}`}
                            className="text-[#4F46E5] hover:underline text-sm"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tracking Chart Placeholder */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white font-heading">CO₂e Reduction Tracking</h2>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none">
                  <option className="bg-[#070B14]">Last 6 months</option>
                  <option className="bg-[#070B14]">Last year</option>
                  <option className="bg-[#070B14]">All time</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center rounded-xl bg-white/5">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-[#4F46E5]/30 mx-auto mb-3" />
                  <p className="text-[#A7B1C6]">Chart visualization coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Alerts */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white font-heading">Alerts</h2>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-sm text-amber-400 mb-1">Milestone Due</p>
                  <p className="text-xs text-[#A7B1C6]">
                    Waste-to-Value SME - Equipment Procurement due in 5 days
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <p className="text-sm text-indigo-400 mb-1">Update Available</p>
                  <p className="text-xs text-[#A7B1C6]">
                    EV Fleet Transition - New progress report submitted
                  </p>
                </div>
              </div>
            </div>

            {/* Reports */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#4F46E5]" />
                  <h2 className="text-lg font-bold text-white font-heading">Reports</h2>
                </div>
              </div>
              <button className="w-full btn-primary mb-4 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Generate Report
              </button>
              <div className="space-y-2">
                {dummyReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-sm text-white">{report.title}</p>
                      <p className="text-xs text-[#A7B1C6]">{report.generatedAt}</p>
                    </div>
                    <Download className="w-4 h-4 text-[#A7B1C6]" />
                  </div>
                ))}
              </div>
            </div>

            {/* SDG Impact */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white font-heading">SDG Impact</h2>
              </div>
              <div className="space-y-3">
                {['SDG 7', 'SDG 11', 'SDG 12', 'SDG 13'].map((sdg, index) => (
                  <div key={sdg} className="flex items-center gap-3">
                    <span className="text-sm text-[#A7B1C6] w-16">{sdg}</span>
                    <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-[#4F46E5] rounded-full"
                        style={{ width: `${[85, 60, 45, 90][index]}%` }}
                      />
                    </div>
                    <span className="text-sm text-white">{[85, 60, 45, 90][index]}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
