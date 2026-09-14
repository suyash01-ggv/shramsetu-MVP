import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ShieldAlert, AlertTriangle, HeartPulse } from 'lucide-react';

export function WorkerWelfare() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">SOS & Welfare</h1>
      
      <Card className="border-red-200 bg-red-50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2"><ShieldAlert /> Emergency Assistance</CardTitle>
          <CardDescription className="text-red-700">Use this only in case of workplace emergencies or safety threats.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" variant="destructive" className="w-full sm:w-auto gap-2">
            <AlertTriangle className="w-5 h-5" /> Trigger SOS Alert
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader><CardTitle className="flex items-center gap-2"><HeartPulse className="text-teal-600"/> Health & Safety</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start text-slate-700 border-slate-300">Report Workplace Incident</Button>
            <Button variant="outline" className="w-full justify-start text-slate-700 border-slate-300">View Insurance Policy</Button>
            <Button variant="outline" className="w-full justify-start text-slate-700 border-slate-300">Grievance Redressal</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
