import React from 'react';
import { useStore } from '../../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency, formatDate } from '../../lib/utils';
import { MapPin, Phone, CheckCircle2, Clock } from 'lucide-react';
import { WorkerProfile } from '../../types';

export function WorkerDashboard() {
  const { currentUser, jobs, users, updateWorkerStatus, acceptJob, updateJobStatus } = useStore();
  const worker = currentUser as WorkerProfile;

  // Jobs assigned to this worker specifically, or jobs looking for a worker (mock matching logic)
  const availableJobs = jobs.filter(j => j.status === 'requested' || (j.status === 'assigned' && j.workerId === worker.id));
  const activeJobs = jobs.filter(j => j.workerId === worker.id && ['accepted', 'on_the_way', 'arrived', 'started'].includes(j.status));

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Header Profile Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Namaste, {worker?.name.split(' ')[0]}</h2>
          <p className="text-sm text-slate-500">Rating: ⭐ {worker?.rating} ({worker?.completedJobs} jobs)</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <select 
            className={`text-sm font-medium rounded-full px-3 py-1 border-0 ring-1 ring-inset ${
              worker?.status === 'available' ? 'bg-green-50 text-green-700 ring-green-600/20' : 
              worker?.status === 'busy' ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' : 
              'bg-slate-50 text-slate-600 ring-slate-500/20'
            }`}
            value={worker?.status}
            onChange={(e) => updateWorkerStatus(e.target.value as any)}
          >
            <option value="available">🟢 Available</option>
            <option value="busy">🟡 Busy</option>
            <option value="offline">⚪ Offline</option>
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-blue-900 text-white border-0">
          <CardContent className="p-4">
            <p className="text-blue-200 text-xs font-medium uppercase tracking-wider mb-1">Today's Earnings</p>
            <p className="text-2xl font-bold">{formatCurrency(1850)}</p>
          </CardContent>
        </Card>
        <Card className="bg-teal-700 text-white border-0">
          <CardContent className="p-4">
            <p className="text-teal-200 text-xs font-medium uppercase tracking-wider mb-1">Active Jobs</p>
            <p className="text-2xl font-bold">{activeJobs.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Jobs */}
      {activeJobs.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-900">Current Work</h3>
          {activeJobs.map(job => (
            <Card key={job.id} className="border-blue-200 shadow-sm">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900">{job.service}</h4>
                    <p className="text-sm text-slate-600">{job.description}</p>
                  </div>
                  <Badge variant="default" className="bg-blue-100 text-blue-900 hover:bg-blue-100">{job.status.replace('_', ' ')}</Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{job.address}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  {job.status === 'accepted' && (
                    <Button className="w-full" onClick={() => updateJobStatus(job.id, 'on_the_way')}>Start Travel</Button>
                  )}
                  {job.status === 'on_the_way' && (
                    <Button className="w-full" onClick={() => updateJobStatus(job.id, 'arrived')}>Mark Arrived</Button>
                  )}
                  {job.status === 'arrived' && (
                    <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => updateJobStatus(job.id, 'started')}>Start Work</Button>
                  )}
                  {job.status === 'started' && (
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => updateJobStatus(job.id, 'completed')}>Complete Job</Button>
                  )}
                  <Button variant="outline" size="icon"><Phone className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Available/New Jobs */}
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-900">New Opportunities</h3>
        {availableJobs.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-500">No new jobs right now.</p>
          </div>
        ) : (
          availableJobs.map(job => {
            const customer = users.find(u => u.id === job.customerId);
            return (
              <Card key={job.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900">{job.service}</h4>
                      <p className="text-sm font-medium text-blue-700">{formatCurrency(job.price)} Estimated</p>
                    </div>
                    {job.priority === 'emergency' && <Badge variant="destructive">Emergency</Badge>}
                  </div>
                  
                  <div className="text-sm text-slate-600 space-y-1">
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> 2.5 km away</p>
                    <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> {formatDate(job.scheduledDate)}</p>
                  </div>

                  <div className="bg-blue-50 text-blue-800 text-xs p-2 rounded flex gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Recommended because it matches your skills and location.
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button className="flex-1 bg-blue-900 hover:bg-blue-800" onClick={() => acceptJob(job.id)}>Accept</Button>
                    <Button variant="outline" className="flex-1">Decline</Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  );
}
