import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Zap, Droplet, Hammer, Sparkles, HeartHandshake, Paintbrush, Car, Wrench } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Connecting Skills.<br />Empowering Cooperatives.
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Trusted local workers. Fair opportunities. Smarter cooperatives.
            A digital platform bringing efficiency and dignity to unorganized work.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button size="lg" className="bg-white text-black hover:bg-slate-100" onClick={() => navigate('/login')}>
              Book a Service
            </Button>
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 border-0" onClick={() => navigate('/login')}>
              Join as Worker
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-lg text-slate-600">Expert assistance across a wide range of professional trades, verified for quality and safety.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Electrical & Wiring', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'hover:border-yellow-200' },
              { name: 'Plumbing Solutions', icon: Droplet, color: 'text-blue-600', bg: 'bg-blue-50', border: 'hover:border-blue-200' },
              { name: 'Carpentry & Wood', icon: Hammer, color: 'text-amber-700', bg: 'bg-amber-50', border: 'hover:border-amber-200' },
              { name: 'Deep Cleaning', icon: Sparkles, color: 'text-teal-600', bg: 'bg-teal-50', border: 'hover:border-teal-200' },
              { name: 'Home Care & Nursing', icon: HeartHandshake, color: 'text-rose-600', bg: 'bg-rose-50', border: 'hover:border-rose-200' },
              { name: 'Painting & Decor', icon: Paintbrush, color: 'text-purple-600', bg: 'bg-purple-50', border: 'hover:border-purple-200' },
              { name: 'Professional Driving', icon: Car, color: 'text-slate-700', bg: 'bg-slate-100', border: 'hover:border-slate-300' },
              { name: 'Appliance Repair', icon: Wrench, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'hover:border-indigo-200' },
            ].map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.name} className={`group hover:shadow-lg transition-all cursor-pointer border-transparent ${service.border} border-2 bg-slate-50 hover:bg-white`}>
                  <CardContent className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${service.bg} ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="font-semibold text-slate-800 text-lg">{service.name}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">About SHRAMSETU</h2>
            <p className="text-lg text-slate-600">
              We are a digital public infrastructure initiative designed to connect skilled unorganized workers with customers seeking reliable services. By empowering labor cooperatives with AI-driven tools, we ensure fair work allocation, transparent pricing, and dignity of labor.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-4xl font-bold text-blue-900 mb-2">5000+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Happy Users</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-4xl font-bold text-teal-600 mb-2">1000+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Verified Workers</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-4xl font-bold text-blue-900 mb-2">50+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Cooperatives</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-4xl font-bold text-teal-600 mb-2">10k+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Jobs Completed</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
