import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { Projects } from '@/pages/Projects';
import { ProjectDetail } from '@/pages/ProjectDetail';
import { HowItWorks } from '@/pages/HowItWorks';
import { Verification } from '@/pages/Verification';
import { PricingPage } from '@/pages/Pricing';
import { Contact } from '@/pages/Contact';
import { About } from '@/pages/About';
import { Insights } from '@/pages/Insights';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';
import { CorporateDashboard } from '@/pages/dashboards/CorporateDashboard';
import { GreenDashboard } from '@/pages/dashboards/GreenDashboard';
import { AdminPanel } from '@/pages/dashboards/AdminPanel';

function App() {
  const [auth, setAuth] = useState<{ isAuthenticated: boolean; role: 'corporate' | 'green_company' | 'admin' | null }>({
    isAuthenticated: false,
    role: null,
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem('recymru_auth');
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      setAuth({
        isAuthenticated: true,
        role: parsed.role,
      });
    }
  }, []);

  const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
    if (!auth.isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (!allowedRoles.includes(auth.role || '')) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0A1F15]">
        <Navigation isAuthenticated={auth.isAuthenticated} userRole={auth.role} />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/insights" element={<Insights />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Dashboard Routes */}
          <Route
            path="/dashboard/corporate"
            element={
              <ProtectedRoute allowedRoles={['corporate']}>
                <CorporateDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/corporate/*"
            element={
              <ProtectedRoute allowedRoles={['corporate']}>
                <CorporateDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/green"
            element={
              <ProtectedRoute allowedRoles={['green_company']}>
                <GreenDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/green/*"
            element={
              <ProtectedRoute allowedRoles={['green_company']}>
                <GreenDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {!window.location.pathname.startsWith('/dashboard') && 
         !window.location.pathname.startsWith('/admin') && 
         !window.location.pathname.startsWith('/login') && 
         !window.location.pathname.startsWith('/signup') && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
