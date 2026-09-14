import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Building2, Menu, Globe } from 'lucide-react';
import { Button } from '../ui/Button';

export function PublicLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" onClick={handleHomeClick} className="flex items-center gap-2">
            <div className="bg-blue-900 text-white p-1.5 rounded-md">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-blue-950">SHRAMSETU</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link to="/" onClick={handleHomeClick} className="hover:text-blue-900">Home</Link>
            <Link to="/#services" onClick={(e) => handleScroll(e, 'services')} className="hover:text-blue-900">Services</Link>
            <Link to="/#about" onClick={(e) => handleScroll(e, 'about')} className="hover:text-blue-900">About</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-600 border border-slate-200 rounded-md px-2 py-1 bg-slate-50">
              <Globe className="w-4 h-4" />
              <select className="bg-transparent text-sm font-medium outline-none cursor-pointer">
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="mr">मराठी</option>
                <option value="bn">বাংলা</option>
                <option value="te">తెలుగు</option>
                <option value="ta">தமிழ்</option>
                <option value="gu">ગુજરાતી</option>
                <option value="ur">اردو</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="ml">മലയാളം</option>
                <option value="pa">ਪੰਜਾਬੀ</option>
              </select>
            </div>
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/register')}>Register</Button>
          </div>

          <button className="md:hidden p-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-white" />
              <span className="font-bold text-xl text-white tracking-tight">SHRAMSETU</span>
            </div>
            <p className="text-sm text-slate-400">
              Connecting Skills. Empowering Cooperatives.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">For Customers</h4>
            <ul className="space-y-2 text-sm">
              <li>Book Service</li>
              <li>Emergency Support</li>
              <li>Help Center</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">For Workers</h4>
            <ul className="space-y-2 text-sm">
              <li>Join Platform</li>
              <li>Welfare Schemes</li>
              <li>Training</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">For Cooperatives</h4>
            <ul className="space-y-2 text-sm">
              <li>Register</li>
              <li>Management</li>
              <li>Network</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 text-center">
          © {new Date().getFullYear()} Shramsetu Platform. A digital public infrastructure initiative.
        </div>
      </footer>
    </div>
  );
}
