import React from 'react';
import { useStore } from '../../store/useStore';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { formatDate } from '../../lib/utils';
import { MapPin } from 'lucide-react';

export function CustomerBookings() {
  const { currentUser, jobs } = useStore();
  const myJobs = jobs.filter(j => j.customerId === currentUser?.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Bookings</h1>
      <div className="grid gap-4">
        {myJobs.map(job => (
          <Card key={job.id}>
            <CardContent className="p-6 flex flex-col md:flex-row gap-4 justify-between">
              <div>
                <h3 className="font-bold text-lg">{job.service}</h3>
                <p className="text-slate-600">{job.description}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                  <MapPin className="w-4 h-4" /> {job.address}
                  <span className="ml-4 flex gap-2 items-center">Date: {formatDate(job.scheduledDate)}</span>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <Badge variant={job.status === 'completed' ? 'success' : 'default'}>{job.status.replace('_', ' ')}</Badge>
                <span className="font-medium text-slate-900">₹{job.price}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        {myJobs.length === 0 && (
          <div className="text-center p-8 bg-slate-50 rounded-lg text-slate-500">No bookings found.</div>
        )}
      </div>
    </div>
  );
}
