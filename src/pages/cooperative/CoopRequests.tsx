import React from 'react';
import { useStore } from '../../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { formatDate } from '../../lib/utils';
import { Briefcase } from 'lucide-react';

export function CoopRequests() {
  const { jobs, currentUser } = useStore();
  const coopJobs = jobs.filter(j => j.cooperativeId === currentUser?.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Service Requests</h1>
      <Card className="shadow-sm">
        <CardHeader><CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-blue-900"/> All Bookings</CardTitle></CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-100">
            {coopJobs.map(job => (
              <div key={job.id} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <p className="font-semibold text-slate-900">{job.service}</p>
                  <p className="text-sm text-slate-500">{job.address} • {formatDate(job.scheduledDate)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-slate-700">₹{job.price}</span>
                  <Badge variant={job.status === 'completed' ? 'success' : 'default'}>{job.status.replace('_', ' ')}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
