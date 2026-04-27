import { Target, Users, Shield, Globe } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Wales First',
    description: 'Proudly supporting Welsh communities and businesses in building a sustainable future.',
  },
  {
    icon: Shield,
    title: 'Trust Through Verification',
    description: 'Every project is verified for credibility, feasibility, and real environmental impact.',
  },
  {
    icon: Users,
    title: 'Collaborative Ecosystem',
    description: 'Connecting funders, project owners, and communities for shared success.',
  },
  {
    icon: Globe,
    title: 'Global Standards',
    description: 'Our reporting aligns with major frameworks including CSRD, GRI, and TCFD.',
  },
];

const team = [
  { name: 'Alex Williams', role: 'CEO & Co-Founder', initials: 'AW' },
  { name: 'Sarah Evans', role: 'Head of Verification', initials: 'SE' },
  { name: 'James Morgan', role: 'CTO', initials: 'JM' },
  { name: 'Emma Jones', role: 'Head of Partnerships', initials: 'EJ' },
];

export function About() {
  return (
    <div className="min-h-screen bg-[#0A1F15] pt-24 lg:pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-6">
            <img src="/logo.png" alt="Recymru" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
            About Recymru
          </h1>
          <p className="text-[#A8C4B0] max-w-2xl mx-auto">
            Wales' sustainable ecosystem—connecting green projects with verified funding 
            to build a cleaner, greener future for our communities.
          </p>
        </div>

        {/* Mission */}
        <div className="glass-card p-8 lg:p-12 mb-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4 font-heading">Our Mission</h2>
          <p className="text-lg text-[#A8C4B0] leading-relaxed">
            To accelerate Wales' transition to a sustainable economy by making it easy for 
            organisations to fund verified green projects—while giving Welsh project owners 
            access to the capital they need to scale their environmental impact.
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 font-heading text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="glass-card p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#2D8A4E]/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#2D8A4E]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-[#A8C4B0]">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 font-heading text-center">
            Leadership Team
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="glass-card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#2D8A4E]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-[#2D8A4E]">{member.initials}</span>
                </div>
                <h3 className="text-white font-medium mb-1">{member.name}</h3>
                <p className="text-sm text-[#A8C4B0]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="glass-card p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-4 font-heading">
            Want to learn more?
          </h2>
          <p className="text-[#A8C4B0] mb-6">
            We'd love to hear from you. Reach out to our team for partnerships, 
            press inquiries, or just to say hello.
          </p>
          <a
            href="mailto:hello@recymru.wales"
            className="btn-primary inline-flex items-center gap-2"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
