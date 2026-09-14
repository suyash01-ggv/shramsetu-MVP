import React from 'react';
import { useStore } from '../../store/useStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Briefcase, TrendingUp, AlertTriangle } from 'lucide-react';
import { WorkerProfile } from '../../types';

const forecastData = [
  { name: 'Mon', demand: 40, capacity: 45 },
  { name: 'Tue', demand: 30, capacity: 45 },
  { name: 'Wed', demand: 20, capacity: 45 },
  { name: 'Thu', demand: 55, capacity: 45 }, // Shortage
  { name: 'Fri', demand: 60, capacity: 45 }, // Shortage
  { name: 'Sat', demand: 80, capacity: 45 }, // Shortage
  { name: 'Sun', demand: 70, capacity: 45 }, // Shortage
];

export function CoopDashboard() {
  const { users, jobs, currentUser } = useStore();

  const workers = users.filter(u => u.role === 'worker' && (u as WorkerProfile).cooperativeId === currentUser?.id) as WorkerProfile[];
  const activeJobs = jobs.filter(j => j.cooperativeId === currentUser?.id && !['completed', 'cancelled'].includes(j.status));
  
  const availableWorkers = workers.filter(w => w.status === 'available').length;
  const busyWorkers = workers.filter(w => w.status === 'busy').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{currentUser?.name}</h1>
        <p className="text-slate-500">Cooperative Administration Dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-900 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Workforce</p>
              <h3 className="text-2xl font-bold text-slate-900">{workers.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-900 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Available Now</p>
              <h3 className="text-2xl font-bold text-slate-900">{availableWorkers}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-yellow-100 text-yellow-900 rounded-lg">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Jobs</p>
              <h3 className="text-2xl font-bold text-slate-900">{activeJobs.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-900 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Weekly Completion</p>
              <h3 className="text-2xl font-bold text-slate-900">142</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Demand Forecast Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI Demand Forecast (7 Days)</CardTitle>
            <CardDescription>Predicted service requests vs current workforce capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecastData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="capacity" name="Available Capacity" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="demand" name="Predicted Demand" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights & Alerts */}
        <div className="space-y-6">
          <Card className="border-red-200">
            <CardHeader className="bg-red-50 rounded-t-lg border-b border-red-100 pb-4">
              <CardTitle className="text-red-900 text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Skill Gap Detected
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-slate-700 mb-2">
                High demand predicted for <strong>AC Repair</strong> this weekend. You are short of 4 technicians.
              </p>
              <div className="text-xs text-slate-500 mb-4">AI Recommendation:</div>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex justify-between items-center bg-slate-50 p-2 rounded">
                  <span>Borrow from XYZ Coop</span>
                  <Badge variant="outline">Network</Badge>
                </li>
              </ul>
              <button className="text-sm font-medium text-blue-700 hover:underline">View detailed gap analysis &rarr;</button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Fair Workforce Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Underutilized Workers</span>
                  <Badge variant="secondary">12</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Overloaded Workers</span>
                  <Badge variant="warning">3</Badge>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs text-slate-500">The AI allocator is currently prioritizing underutilized workers for new standard jobs.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
