import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    description: 'Browse and explore',
    price: 'Free',
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
    features: [
      'Verified projects access',
      'Tracking dashboard',
      'Report export (PDF)',
      'Priority support',
      'SDG mapping',
      'API access',
    ],
    cta: 'Join Ecosystem',
    ctaStyle: 'primary',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organisations',
    price: 'Custom',
    period: 'annual',
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

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.12,
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#0A1F15]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
            Ecosystem Pricing
          </h2>
          <p className="text-[#A8C4B0] max-w-xl mx-auto">
            Start free. Upgrade when you need verified access and reporting.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`glass-card p-6 lg:p-8 flex flex-col ${
                plan.highlighted ? 'border-[#2D8A4E]/50 relative' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-[#2D8A4E] text-xs font-medium text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1 font-heading">
                  {plan.name}
                </h3>
                <p className="text-sm text-[#A8C4B0]">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-white font-heading">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-[#A8C4B0] ml-2">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-[#A8C4B0]">
                    <Check className="w-4 h-4 text-[#4CAF50] flex-shrink-0 mt-0.5" />
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
          ))}
        </div>
      </div>
    </section>
  );
}
