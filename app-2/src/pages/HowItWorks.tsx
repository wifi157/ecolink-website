import { useState } from 'react';
import { Building2, Sprout, ArrowRight, CheckCircle2, FileText, Search, Handshake, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const corporateSteps = [
  { icon: FileText, title: 'Create corporate account', description: 'Set up your company profile with budget, SDG priorities, and risk appetite.' },
  { icon: Search, title: 'Define goals', description: 'Specify your budget range, preferred sectors, and timeline for impact.' },
  { icon: CheckCircle2, title: 'Choose verified projects', description: 'Browse ranked recommendations matched to your criteria.' },
  { icon: FileText, title: 'Sign milestone agreement', description: 'Legal-ready documentation with clear deliverables and payment terms.' },
  { icon: LineChart, title: 'Track progress', description: 'Real-time dashboard with CO₂e metrics and milestone updates.' },
  { icon: FileText, title: 'Download ESG/CSR report', description: 'Audit-ready reports with methodology and verification notes.' },
];

const greenSteps = [
  { icon: FileText, title: 'Submit project proposal', description: 'Share your project details with baseline evidence and CO₂e estimates.' },
  { icon: CheckCircle2, title: 'Verification review', description: 'Our team reviews company credentials, evidence, and feasibility.' },
  { icon: Search, title: 'Listing goes live', description: 'Once verified, your project appears in the marketplace with status badges.' },
  { icon: Handshake, title: 'Secure funding via milestones', description: 'Receive payments as you hit verified progress milestones.' },
  { icon: LineChart, title: 'Submit tracking updates', description: 'Upload photos, invoices, and sensor data to verify progress.' },
  { icon: FileText, title: 'Completion & verification report', description: 'Final report documenting impact achieved and lessons learned.' },
];

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'corporate' | 'green'>('corporate');
  const steps = activeTab === 'corporate' ? corporateSteps : greenSteps;

  return (
    <div className="min-h-screen bg-[#070B14] pt-24 lg:pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
            How It Works
          </h1>
          <p className="text-[#A7B1C6] max-w-xl mx-auto">
            Two paths to verified carbon reduction—whether you're funding projects or seeking funding.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="glass-card p-1 flex">
            <button
              onClick={() => setActiveTab('corporate')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'corporate'
                  ? 'bg-[#4F46E5] text-white'
                  : 'text-[#A7B1C6] hover:text-white'
              }`}
            >
              <Building2 className="w-5 h-5" />
              For Corporates
            </button>
            <button
              onClick={() => setActiveTab('green')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'green'
                  ? 'bg-emerald-500 text-white'
                  : 'text-[#A7B1C6] hover:text-white'
              }`}
            >
              <Sprout className="w-5 h-5" />
              For Green Companies
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="glass-card p-6 flex items-start gap-6"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activeTab === 'corporate' ? 'bg-[#4F46E5]/20' : 'bg-emerald-500/20'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    activeTab === 'corporate' ? 'text-[#4F46E5]' : 'text-emerald-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-sm font-mono ${
                      activeTab === 'corporate' ? 'text-[#4F46E5]/50' : 'text-emerald-400/50'
                    }`}>
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[#A7B1C6]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="glass-card p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-4">
            Ready to get started?
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className={`btn-primary inline-flex items-center gap-2 ${
                activeTab === 'green' ? 'hidden' : ''
              }`}
            >
              Book a Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/signup"
              className={`btn-secondary inline-flex items-center gap-2 ${
                activeTab === 'corporate' ? 'hidden' : ''
              }`}
            >
              Apply as Green Company
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/signup"
              className={`btn-primary inline-flex items-center gap-2 ${
                activeTab === 'corporate' ? 'hidden' : ''
              }`}
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className={`btn-secondary inline-flex items-center gap-2 ${
                activeTab === 'green' ? 'hidden' : ''
              }`}
            >
              Contact Sales
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
