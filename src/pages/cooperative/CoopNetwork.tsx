import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Building2 } from 'lucide-react';

export function CoopNetwork() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Inter-Cooperative Network</h1>
        <p className="text-slate-600">Collaborate with other cooperatives to fulfill excess demand.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5 text-blue-700"/> Pune District Coop</CardTitle>
            <CardDescription>Distance: 120km</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-slate-600">Available Workforce: <span className="font-bold text-green-600">14 Workers</span></div>
            <Button variant="outline" className="w-full text-blue-700 border-blue-200 hover:bg-blue-50">Request Sharing</Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5 text-blue-700"/> Thane Labour Society</CardTitle>
            <CardDescription>Distance: 25km</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-slate-600">Status: <span className="font-bold text-red-600">High Demand (Shortage)</span></div>
            <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">Offer Workforce</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
