import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simulate login - in real app, this would call an API
    if (formData.email && formData.password) {
      // Store auth state
      localStorage.setItem('recymru_auth', JSON.stringify({
        email: formData.email,
        role: 'corporate',
        name: 'Demo User',
      }));
      navigate('/dashboard/corporate');
    } else {
      setError('Please enter both email and password');
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
            Welcome back
          </h1>
          <p className="text-[#A8C4B0]">
            Sign in to access your dashboard
          </p>
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
                Email
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
                Password
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#2D8A4E]/30 bg-transparent text-[#2D8A4E] focus:ring-[#2D8A4E]"
                />
                <span className="text-sm text-[#A8C4B0]">Remember me</span>
              </label>
              <Link
                to="#"
                className="text-sm text-[#2D8A4E] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#A8C4B0]">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#2D8A4E] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[#A8C4B0]">
            Demo: Use any email and password to log in
          </p>
        </div>
      </div>
    </div>
  );
}
