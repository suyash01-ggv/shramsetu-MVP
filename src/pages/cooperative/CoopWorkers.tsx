import React from 'react';
import { useStore } from '../../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { WorkerProfile } from '../../types';
import { Users } from 'lucide-react';

export function CoopWorkers() {
  const { users, currentUser } = useStore();
  const workers = users.filter(u => u.role === 'worker' && (u as WorkerProfile).cooperativeId === currentUser?.id) as WorkerProfile[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Workforce Management</h1>
      <Card className="shadow-sm">
        <CardHeader><CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-blue-900"/> Registered Workers</CardTitle></CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-100">
            {workers.map(w => (
              <div key={w.id} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <p className="font-semibold text-slate-900">{w.name}</p>
                  <p className="text-sm text-slate-500">{w.skills.join(', ')} • ⭐ {w.rating}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={w.status === 'available' ? 'success' : w.status === 'busy' ? 'warning' : 'secondary'}>
                    {w.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
