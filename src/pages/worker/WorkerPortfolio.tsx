import React from 'react';
import { useStore } from '../../store/useStore';
import { WorkerProfile } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Star, CheckCircle2 } from 'lucide-react';

export function WorkerPortfolio() {
  const { currentUser } = useStore();
  const worker = currentUser as WorkerProfile;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My Digital Portfolio</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-blue-100 bg-blue-50/50 shadow-sm">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-24 h-24 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              {worker?.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{worker?.name}</h2>
              <p className="text-blue-700 font-medium">{worker?.skills?.join(', ')}</p>
            </div>
            <div className="flex justify-center items-center gap-1 text-yellow-600 font-bold bg-white w-fit mx-auto px-3 py-1 rounded-full border border-yellow-200">
              <Star className="w-4 h-4 fill-current" /> {worker?.rating} Rating
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 shadow-sm">
          <CardHeader><CardTitle>Verified Credentials</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3"><CheckCircle2 className="text-green-600" /> Identity Verified (Aadhaar)</div>
            <div className="flex items-center gap-3"><CheckCircle2 className="text-green-600" /> Police Clearance Completed</div>
            <div className="flex items-center gap-3"><CheckCircle2 className="text-green-600" /> Skill Certified: {worker?.experience} years experience</div>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h3 className="font-semibold mb-2">Total Jobs Completed</h3>
              <div className="text-4xl font-bold text-slate-900">{worker?.completedJobs}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
