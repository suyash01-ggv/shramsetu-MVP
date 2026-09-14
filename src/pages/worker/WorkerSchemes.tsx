import React from 'react';
import { useStore } from '../../store/useStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Award } from 'lucide-react';

export function WorkerSchemes() {
  const { schemes } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Government Schemes</h1>
        <p className="text-slate-600">Schemes and welfare programs you might be eligible for.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {schemes.map(s => (
          <Card key={s.id} className="shadow-sm border-slate-200 hover:border-blue-200 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Award className="w-5 h-5 text-teal-600" /> {s.name}</CardTitle>
              <CardDescription>{s.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="font-semibold text-sm block mb-1">Eligibility:</span>
                <ul className="list-disc list-inside text-sm text-slate-600">
                  {s.eligibility.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
              </div>
              <div>
                <span className="font-semibold text-sm block mb-1">Benefits:</span>
                <p className="text-sm text-slate-600">{s.benefits}</p>
              </div>
              <Button variant="outline" className="w-full">Check Eligibility</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
