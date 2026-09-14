import React from 'react';
import { useStore } from '../../store/useStore';
import { WorkerProfile } from '../../types';
import { Card, CardContent } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/utils';
import { TrendingUp, Wallet } from 'lucide-react';

export function WorkerEarnings() {
  const { currentUser } = useStore();
  const worker = currentUser as WorkerProfile;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Earnings</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-blue-900 text-white border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="w-6 h-6 text-blue-300" />
              <span className="font-medium text-blue-200">Total Lifetime Earnings</span>
            </div>
            <div className="text-4xl font-bold">{formatCurrency(worker?.earnings || 0)}</div>
          </CardContent>
        </Card>
        <Card className="bg-teal-700 text-white border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-teal-300" />
              <span className="font-medium text-teal-200">This Month (Estimated)</span>
            </div>
            <div className="text-4xl font-bold">{formatCurrency((worker?.earnings || 0) * 0.15)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
