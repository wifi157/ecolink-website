import { useState } from 'react';
import { Mail, Building2, User, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    role: '',
    userType: 'corporate',
    budget: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0A1F15] pt-24 lg:pt-28 pb-16 flex items-center justify-center">
        <div className="glass-card p-8 lg:p-12 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#2D8A4E]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-[#4CAF50]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 font-heading">
            Thank you!
          </h2>
          <p className="text-[#A8C4B0] mb-6">
            We've received your request and will be in touch within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="btn-secondary"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1F15] pt-24 lg:pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
            Join the Ecosystem
          </h1>
          <p className="text-[#A8C4B0] max-w-xl mx-auto">
            Tell us about your goals and we'll show you how Recymru can help you 
            fund or launch verified green projects across Wales.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-card p-6 lg:p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8C4B0]" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-[#2D8A4E]/30 text-white placeholder-[#A8C4B0] outline-none focus:border-[#2D8A4E] transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Company *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8C4B0]" />
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-[#2D8A4E]/30 text-white placeholder-[#A8C4B0] outline-none focus:border-[#2D8A4E] transition-colors"
                      placeholder="Acme Wales Ltd"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8C4B0]" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-[#2D8A4E]/30 text-white placeholder-[#A8C4B0] outline-none focus:border-[#2D8A4E] transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#2D8A4E]/30 text-white placeholder-[#A8C4B0] outline-none focus:border-[#2D8A4E] transition-colors"
                    placeholder="Sustainability Director"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    I am a *
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#2D8A4E]/30 text-white outline-none focus:border-[#2D8A4E] transition-colors"
                  >
                    <option value="corporate" className="bg-[#0A1F15]">Funder / Corporate</option>
                    <option value="green_company" className="bg-[#0A1F15]">Project Owner</option>
                    <option value="other" className="bg-[#0A1F15]">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Budget Range (optional)
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#2D8A4E]/30 text-white outline-none focus:border-[#2D8A4E] transition-colors"
                  >
                    <option value="" className="bg-[#0A1F15]">Select range</option>
                    <option value="under-100k" className="bg-[#0A1F15]">Under £100k</option>
                    <option value="100k-500k" className="bg-[#0A1F15]">£100k - £500k</option>
                    <option value="500k-1m" className="bg-[#0A1F15]">£500k - £1M</option>
                    <option value="over-1m" className="bg-[#0A1F15]">Over £1M</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-[#A8C4B0]" />
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-[#2D8A4E]/30 text-white placeholder-[#A8C4B0] outline-none focus:border-[#2D8A4E] transition-colors resize-none"
                    placeholder="Tell us about your goals and requirements..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Request
              </button>
            </form>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4 font-heading">
                What happens next?
              </h3>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#2D8A4E]/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-[#2D8A4E]">
                    1
                  </span>
                  <p className="text-sm text-[#A8C4B0]">
                    We'll review your request within 24 hours.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#2D8A4E]/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-[#2D8A4E]">
                    2
                  </span>
                  <p className="text-sm text-[#A8C4B0]">
                    Schedule a call to discuss your needs.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#2D8A4E]/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-[#2D8A4E]">
                    3
                  </span>
                  <p className="text-sm text-[#A8C4B0]">
                    Get personalised recommendations.
                  </p>
                </li>
              </ol>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-2 font-heading">
                Questions?
              </h3>
              <p className="text-sm text-[#A8C4B0] mb-4">
                Reach out directly:
              </p>
              <a
                href="mailto:hello@recymru.wales"
                className="text-[#2D8A4E] hover:underline text-sm"
              >
                hello@recymru.wales
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
