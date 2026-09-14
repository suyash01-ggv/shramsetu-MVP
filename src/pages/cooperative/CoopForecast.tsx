import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const forecastData = [
  { name: 'Mon', demand: 40, capacity: 45 },
  { name: 'Tue', demand: 30, capacity: 45 },
  { name: 'Wed', demand: 20, capacity: 45 },
  { name: 'Thu', demand: 55, capacity: 45 },
  { name: 'Fri', demand: 60, capacity: 45 },
  { name: 'Sat', demand: 80, capacity: 45 },
  { name: 'Sun', demand: 70, capacity: 45 },
];

export function CoopForecast() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Demand Forecast</h1>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-purple-600"/> 7-Day Prediction</CardTitle>
          <CardDescription>Predicted service requests vs current workforce capacity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="capacity" name="Available Capacity" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="demand" name="Predicted Demand" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
