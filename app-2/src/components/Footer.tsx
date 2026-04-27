import { Link } from 'react-router-dom';
import { Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Projects', href: '/projects' },
    { label: 'Tracking', href: '/how-it-works' },
    { label: 'Ecosystem', href: '/verification' },
    { label: 'Pricing', href: '/pricing' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '#' },
  ],
  legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="w-full bg-[#0A1F15] border-t border-[#2D8A4E]/20">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img src="/logo.png" alt="Recymru" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-white font-heading">Recymru</span>
            </Link>
            <p className="text-sm text-[#A8C4B0] mb-4">
              Wales' sustainable ecosystem connecting green projects with verified funding.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[#A8C4B0] hover:text-[#3CB371] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#A8C4B0] hover:text-[#3CB371] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[#A8C4B0] hover:text-[#3CB371] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[#A8C4B0] hover:text-[#3CB371] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[#A8C4B0] hover:text-[#3CB371] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2D8A4E]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#A8C4B0]">
            © {new Date().getFullYear()} Recymru. All rights reserved.
          </p>
          <p className="text-sm text-[#A8C4B0]">
            Building Wales' sustainable future.
          </p>
        </div>
      </div>
    </footer>
  );
}
