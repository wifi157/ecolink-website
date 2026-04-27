import { Building2, ClipboardCheck, Target, History, Shield, AlertTriangle, FileCheck, Users } from 'lucide-react';

const verificationCriteria = [
  { icon: Building2, title: 'Company/KYB Verification', description: 'Business registration, ownership structure, and financial health checks.' },
  { icon: ClipboardCheck, title: 'Baseline Evidence Review', description: 'Historical emissions data and project feasibility assessment.' },
  { icon: Target, title: 'Budget & Milestones Validation', description: 'Realistic costing and achievable milestone definitions.' },
  { icon: History, title: 'Monitoring Plan Review', description: 'Data collection methodology and verification procedures.' },
];

const processSteps = [
  { number: '01', title: 'Submission', description: 'Project owner submits proposal with baseline evidence.' },
  { number: '02', title: 'Internal Review', description: 'Initial assessment of completeness and eligibility.' },
  { number: '03', title: 'Evidence Checks', description: 'Detailed verification of claims and documentation.' },
  { number: '04', title: 'Risk Scoring', description: 'Evaluation of project risks and mitigation strategies.' },
  { number: '05', title: 'Approval & Badge', description: 'Project listed with appropriate verification status.' },
  { number: '06', title: 'Ongoing Audit Trail', description: 'Continuous monitoring via milestone updates.' },
];

const antiFraudMeasures = [
  'KYB/KYC checks for all project owners',
  'Milestone-based fund release (not upfront)',
  'Document validation and cross-referencing',
  'Anomaly detection in tracking data',
  'Clear dispute resolution process',
];

export function Verification() {
  return (
    <div className="min-h-screen bg-[#070B14] pt-24 lg:pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-[#4F46E5]/20 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-[#4F46E5]" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
            Verification & Trust
          </h1>
          <p className="text-[#A7B1C6] max-w-2xl mx-auto">
            Our multi-layer verification process ensures every project meets rigorous standards 
            for credibility and impact.
          </p>
        </div>

        {/* What Verified Means */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 font-heading text-center">
            What "Verified" Means
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationCriteria.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass-card p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#4F46E5]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-[#A7B1C6]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 font-heading text-center">
            Verification Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {processSteps.map((step) => (
              <div key={step.number} className="glass-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-[#4F46E5]/30 font-mono">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-[#A7B1C6]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Anti-Fraud Measures */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-white font-heading">Anti-Fraud Measures</h2>
            </div>
            <ul className="space-y-3">
              {antiFraudMeasures.map((measure) => (
                <li key={measure} className="flex items-start gap-3 text-[#A7B1C6]">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </span>
                  {measure}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-xl font-bold text-white font-heading">Dispute Resolution</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
                  1
                </span>
                <div>
                  <h4 className="text-white font-medium mb-1">Submit Issue</h4>
                  <p className="text-sm text-[#A7B1C6]">Either party raises a concern through the platform.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
                  2
                </span>
                <div>
                  <h4 className="text-white font-medium mb-1">Review Process</h4>
                  <p className="text-sm text-[#A7B1C6]">Our team reviews evidence from both sides within 5 business days.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
                  3
                </span>
                <div>
                  <h4 className="text-white font-medium mb-1">Resolution</h4>
                  <p className="text-sm text-[#A7B1C6]">Binding decision with clear next steps for both parties.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third-Party Verification */}
        <div className="glass-card p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2 font-heading">
            Third-Party Verification (Coming Soon)
          </h2>
          <p className="text-[#A7B1C6] max-w-xl mx-auto">
            We're partnering with leading carbon verification bodies to offer optional 
            third-party validation for high-value projects.
          </p>
        </div>
      </div>
    </div>
  );
}
