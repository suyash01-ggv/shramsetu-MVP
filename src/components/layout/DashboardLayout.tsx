import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, LogOut, Menu, X, Home, Briefcase, 
  User, Calendar, Bell, Mic, FileText, 
  TrendingUp, Users, ShieldAlert, Award, Globe
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export function DashboardLayout() {
  const { currentUser, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const getNavItems = () => {
    switch (currentUser.role) {
      case 'customer':
        return [
          { label: 'Dashboard', icon: Home, path: '/dashboard/customer' },
          { label: 'Book Service', icon: Briefcase, path: '/dashboard/customer/book' },
          { label: 'My Bookings', icon: Calendar, path: '/dashboard/customer/bookings' },
        ];
      case 'worker':
        return [
          { label: 'Today\'s Jobs', icon: Home, path: '/dashboard/worker' },
          { label: 'My Portfolio', icon: FileText, path: '/dashboard/worker/portfolio' },
          { label: 'Govt Schemes', icon: Award, path: '/dashboard/worker/schemes' },
          { label: 'Earnings', icon: TrendingUp, path: '/dashboard/worker/earnings' },
          { label: 'SOS / Welfare', icon: ShieldAlert, path: '/dashboard/worker/welfare' },
        ];
      case 'cooperative':
        return [
          { label: 'Overview', icon: Home, path: '/dashboard/coop' },
          { label: 'Workforce', icon: Users, path: '/dashboard/coop/workers' },
          { label: 'Service Requests', icon: Briefcase, path: '/dashboard/coop/requests' },
          { label: 'Demand Forecast', icon: TrendingUp, path: '/dashboard/coop/forecast' },
          { label: 'Network', icon: Building2, path: '/dashboard/coop/network' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      {/* Mobile Header */}
      <header className="md:hidden bg-blue-900 text-white h-16 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          <span className="font-bold tracking-tight">SHRAMSETU</span>
        </div>
        <div className="flex items-center gap-4">
          {currentUser.role === 'worker' && (
            <button className="bg-teal-500 p-2 rounded-full shadow-lg text-white" onClick={() => navigate('/dashboard/worker/voice')}>
              <Mic className="w-5 h-5" />
            </button>
          )}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar (Desktop) & Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 bg-slate-900/50 transition-opacity md:hidden",
        isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={() => setIsMobileMenuOpen(false)} />

      <aside className={cn(
        "fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="h-16 hidden md:flex items-center gap-2 px-6 border-b border-slate-200 bg-blue-900 text-white">
          <Building2 className="w-5 h-5" />
          <span className="font-bold text-lg tracking-tight">SHRAMSETU</span>
        </div>

        <div className="p-6 border-b border-slate-200 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-slate-900 text-center">{currentUser.name}</h3>
          <p className="text-xs text-slate-500 capitalize">{currentUser.role}</p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-900"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200 items-center justify-end px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-600 border border-slate-200 rounded-md px-2 py-1 bg-slate-50 mr-2">
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
            {currentUser.role === 'worker' && (
              <Button variant="outline" className="gap-2 border-teal-500 text-teal-700 hover:bg-teal-50" onClick={() => navigate('/dashboard/worker/voice')}>
                <Mic className="w-4 h-4" />
                Voice Saathi
              </Button>
            )}
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav (Worker Only Example) */}
      {currentUser.role === 'worker' && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 pb-safe z-40">
           {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg",
                  location.pathname === item.path ? "text-blue-900" : "text-slate-500"
                )}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
           ))}
        </nav>
      )}
    </div>
  );
}
