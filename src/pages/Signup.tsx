import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Building2, Sprout, User } from 'lucide-react';

export function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'corporate' | 'green'>('corporate');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.email && formData.password && formData.name) {
      localStorage.setItem('recymru_auth', JSON.stringify({
        email: formData.email,
        role: userType === 'corporate' ? 'corporate' : 'green_company',
        name: formData.name,
      }));
      navigate(userType === 'corporate' ? '/dashboard/corporate' : '/dashboard/green');
    } else {
      setError('Please fill in all required fields');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1F15] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl overflow-hidden">
              <img src="/logo.png" alt="Recymru" className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-bold text-white font-heading">Recymru</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2 font-heading">
            Join the Ecosystem
          </h1>
          <p className="text-[#A8C4B0]">
            Be part of Wales' sustainable future
          </p>
        </div>

        {/* User Type Selection */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setUserType('corporate')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
              userType === 'corporate'
                ? 'bg-[#2D8A4E] text-white'
                : 'bg-white/5 text-[#A8C4B0] hover:bg-white/10'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Funder
          </button>
          <button
            type="button"
            onClick={() => setUserType('green')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
              userType === 'green'
                ? 'bg-[#1E90B8] text-white'
                : 'bg-white/5 text-[#A8C4B0] hover:bg-white/10'
            }`}
          >
            <Sprout className="w-4 h-4" />
            Project Owner
          </button>
        </div>

        {/* Form */}
        <div className="glass-card p-8">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8C4B0]" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-[#2D8A4E]/30 text-white placeholder-[#A8C4B0] outline-none focus:border-[#2D8A4E] transition-colors"
                  placeholder="John Smith"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Company Name *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8C4B0]" />
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-[#2D8A4E]/30 text-white placeholder-[#A8C4B0] outline-none focus:border-[#2D8A4E] transition-colors"
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8C4B0]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-[#2D8A4E]/30 text-white placeholder-[#A8C4B0] outline-none focus:border-[#2D8A4E] transition-colors"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8C4B0]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border border-[#2D8A4E]/30 text-white placeholder-[#A8C4B0] outline-none focus:border-[#2D8A4E] transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8C4B0] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                className="w-4 h-4 rounded border-[#2D8A4E]/30 bg-transparent text-[#2D8A4E] focus:ring-[#2D8A4E] mt-1"
              />
              <span className="text-sm text-[#A8C4B0]">
                I agree to the{' '}
                <Link to="#" className="text-[#2D8A4E] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="#" className="text-[#2D8A4E] hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </div>

            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                userType === 'corporate'
                  ? 'bg-[#2D8A4E] text-white hover:bg-[#368F55]'
                  : 'bg-[#1E90B8] text-white hover:bg-[#2A9BC4]'
              }`}
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#A8C4B0]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#2D8A4E] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
