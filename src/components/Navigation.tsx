import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  isAuthenticated?: boolean;
  userRole?: 'corporate' | 'green_company' | 'admin' | null;
}

export function Navigation({ isAuthenticated = false, userRole = null }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const publicNavItems = [
    { label: 'Projects', href: '/projects' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Ecosystem', href: '/verification' },
    { label: 'Pricing', href: '/pricing' },
  ];

  const corporateNavItems = [
    { label: 'Overview', href: '/dashboard/corporate' },
    { label: 'Projects', href: '/dashboard/corporate/projects' },
    { label: 'Tracking', href: '/dashboard/corporate/tracking' },
    { label: 'Reports', href: '/dashboard/corporate/reports' },
  ];

  const greenNavItems = [
    { label: 'Overview', href: '/dashboard/green' },
    { label: 'My Projects', href: '/dashboard/green/projects' },
    { label: 'Milestones', href: '/dashboard/green/milestones' },
    { label: 'Updates', href: '/dashboard/green/updates' },
  ];

  const adminNavItems = [
    { label: 'Review', href: '/admin' },
    { label: 'Projects', href: '/admin/projects' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Verifications', href: '/admin/verifications' },
  ];

  const getNavItems = () => {
    if (!isAuthenticated) return publicNavItems;
    if (userRole === 'corporate') return corporateNavItems;
    if (userRole === 'green_company') return greenNavItems;
    if (userRole === 'admin') return adminNavItems;
    return publicNavItems;
  };

  const navItems = getNavItems();
  const isPublicPage = !location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/admin');

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isPublicPage
          ? 'bg-[#0A1F15]/90 backdrop-blur-xl border-b border-[#2D8A4E]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="Recymru" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold text-white font-heading">EcoLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-[#3CB371]'
                    : 'text-[#A8C4B0] hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-[#A8C4B0] hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link to="/contact" className="btn-primary text-sm">
                  Join Ecosystem
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  localStorage.removeItem('recymru_auth');
                  window.location.href = '/';
                }}
                className="text-sm font-medium text-[#A8C4B0] hover:text-white transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1F15]/95 backdrop-blur-xl border-b border-[#2D8A4E]/20">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base font-medium ${
                  location.pathname === item.href
                    ? 'text-[#3CB371]'
                    : 'text-[#A8C4B0]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="pt-4 border-t border-[#2D8A4E]/20 space-y-3">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-base font-medium text-[#A8C4B0]"
                >
                  Log In
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block btn-primary text-center"
                >
                  Join Ecosystem
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
