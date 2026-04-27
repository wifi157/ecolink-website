import { Check, ArrowRight, Building2, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    description: 'Browse and explore',
    price: 'Free',
    period: '',
    icon: Sprout,
    features: [
      'Browse marketplace',
      'Basic project info',
      'Limited reports',
      'Email support',
      'Standard verification',
    ],
    cta: 'Start Free',
    ctaStyle: 'secondary',
    highlighted: false,
  },
  {
    name: 'Pro',
    description: 'For active funders',
    price: 'Custom',
    period: 'per project',
    icon: Building2,
    features: [
      'Verified projects access',
      'Tracking dashboard',
      'Report export (PDF)',
      'Priority support',
      'SDG mapping',
      'API access',
    ],
    cta: 'Book Demo',
    ctaStyle: 'primary',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    price: 'Custom',
    period: 'annual',
    icon: Building2,
    features: [
      'Custom verification process',
      'Legal workflow + templates',
      'Full API / integrations',
      'Dedicated account manager',
      'White-label options',
      'Custom reporting',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'secondary',
    highlighted: false,
  },
];

const faqs = [
  {
    question: 'How does milestone-based funding work?',
    answer: 'Funds are held in escrow and released only when verified progress is delivered. Each project has predefined milestones with clear deliverables.',
  },
  {
    question: 'What is included in verification?',
    answer: 'Verification includes company checks, baseline evidence review, budget validation, and monitoring plan assessment. Verified projects receive a badge.',
  },
  {
    question: 'Can I export reports for audit purposes?',
    answer: 'Yes, Pro and Enterprise plans include PDF export with CO₂e methodology, SDG mapping, and verification notes—ready for audit.',
  },
  {
    question: 'What happens if a project fails to deliver?',
    answer: 'Our milestone-based structure protects funders. If milestones are missed, funds can be withheld or returned based on the agreement terms.',
  },
];

export function PricingPage() {
  return (
    <div className="min-h-screen bg-[#070B14] pt-24 lg:pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
            Pricing
          </h1>
          <p className="text-[#A7B1C6] max-w-xl mx-auto">
            Start free. Upgrade when you need verified access and reporting.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`glass-card p-6 lg:p-8 flex flex-col ${
                  plan.highlighted ? 'border-[#4F46E5]/50 relative' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-[#4F46E5] text-xs font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    plan.highlighted ? 'bg-[#4F46E5]/20' : 'bg-white/5'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      plan.highlighted ? 'text-[#4F46E5]' : 'text-[#A7B1C6]'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 font-heading">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-[#A7B1C6]">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-white font-heading">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-[#A7B1C6] ml-2">{plan.period}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[#A7B1C6]">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`w-full text-center py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    plan.ctaStyle === 'primary'
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 font-heading text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="glass-card p-6">
                <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-[#A7B1C6]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
