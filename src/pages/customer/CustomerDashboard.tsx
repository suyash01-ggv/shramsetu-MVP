import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatDate, formatCurrency } from '../../lib/utils';
import { AlertCircle, Clock, CheckCircle2, Wrench, ShieldAlert } from 'lucide-react';

export function CustomerDashboard() {
  const { currentUser, jobs, users } = useStore();
  const navigate = useNavigate();

  const myJobs = jobs.filter(j => j.customerId === currentUser?.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const activeJobs = myJobs.filter(j => !['completed', 'cancelled'].includes(j.status));
  const pastJobs = myJobs.filter(j => ['completed', 'cancelled'].includes(j.status));

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'requested': return <Badge variant="secondary">Looking for worker</Badge>;
      case 'assigned': return <Badge variant="warning">Worker Assigned</Badge>;
      case 'accepted': return <Badge variant="warning">Worker Accepted</Badge>;
      case 'on_the_way': return <Badge variant="default">On the way</Badge>;
      case 'arrived': return <Badge variant="default">Arrived</Badge>;
      case 'started': return <Badge variant="default">Work in progress</Badge>;
      case 'completed': return <Badge variant="success">Completed</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getWorkerName = (workerId?: string) => {
    if (!workerId) return 'Pending Match';
    return users.find(u => u.id === workerId)?.name || 'Unknown Worker';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, {currentUser?.name.split(' ')[0]}</h1>
          <p className="text-slate-500">Manage your services and bookings here.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="destructive" className="gap-2" onClick={() => navigate('/dashboard/customer/book?type=emergency')}>
            <ShieldAlert className="w-4 h-4" /> Emergency
          </Button>
          <Button onClick={() => navigate('/dashboard/customer/book')}>
            Book Service
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Bookings</CardTitle>
              <CardDescription>Your current and upcoming service requests</CardDescription>
            </CardHeader>
            <CardContent>
              {activeJobs.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-400" />
                  <p>No active bookings found.</p>
                  <Button variant="link" onClick={() => navigate('/dashboard/customer/book')}>Book a service now</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeJobs.map(job => (
                    <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-lg bg-slate-50 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{job.service}</span>
                          {job.priority === 'emergency' && <Badge variant="destructive">Emergency</Badge>}
                          {getStatusBadge(job.status)}
                        </div>
                        <p className="text-sm text-slate-600">{job.description}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(job.scheduledDate)}</span>
                          <span className="flex items-center gap-1"><Wrench className="w-3 h-3" /> {getWorkerName(job.workerId)}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/customer/bookings/${job.id}`)}>
                        Track
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastJobs.slice(0, 3).map(job => (
                  <div key={job.id} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                    <div>
                      <p className="font-medium text-slate-900">{job.service}</p>
                      <p className="text-sm text-slate-500">{formatDate(job.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(job.price)}</p>
                      <p className="text-sm text-green-600 flex items-center gap-1 justify-end"><CheckCircle2 className="w-3 h-3" /> Completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/dashboard/customer/book?service=Plumbing')}>
                Need a Plumber?
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/dashboard/customer/book?service=Electrical')}>
                Electrical Repair
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/dashboard/customer/book?service=Cleaning')}>
                Deep Cleaning
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
