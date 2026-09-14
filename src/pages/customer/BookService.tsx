import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useStore } from '../../store/useStore';
import { ShieldCheck, Info } from 'lucide-react';

export function BookService() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';
  const initialType = searchParams.get('type') || 'normal';

  const navigate = useNavigate();
  const { bookService } = useStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: initialService,
    description: '',
    address: 'A-402, Shivam Apts, Bandra', // Mock default
    priority: initialType as 'normal' | 'urgent' | 'emergency',
    preference: 'any' as 'any' | 'women_preferred'
  });

  const [isMatching, setIsMatching] = useState(false);

  const handleNext = () => setStep(2);
  
  const handleConfirm = () => {
    setIsMatching(true);
    // Simulate AI Matching delay
    setTimeout(() => {
      bookService({
        service: formData.service || 'General Service',
        description: formData.description,
        address: formData.address,
        priority: formData.priority,
        preference: formData.preference,
        price: 500, // mock price estimation
        scheduledDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      });
      navigate('/dashboard/customer');
    }, 2000);
  };

  if (isMatching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Finding the right worker...</h2>
        <p className="text-slate-500 max-w-md text-center">
          Our AI is analyzing skills, distance, and fair workload distribution to find the best match for you.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Book a Service</CardTitle>
          <CardDescription>
            {formData.priority === 'emergency' 
              ? 'Emergency service request. We will prioritize finding a worker immediately.' 
              : 'Describe your issue and we will find the perfect worker.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Service Category</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={formData.service}
                  onChange={e => setFormData({...formData, service: e.target.value})}
                >
                  <option value="">Select a service...</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Caregiving">Caregiving</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Describe the problem</label>
                <textarea 
                  className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[100px]"
                  placeholder="E.g., Water leaking from kitchen pipe..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Service Priority</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['normal', 'urgent', 'emergency'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setFormData({...formData, priority: p})}
                      className={`p-3 border rounded-md text-sm font-medium capitalize transition-colors ${
                        formData.priority === p 
                          ? (p === 'emergency' ? 'border-red-500 bg-red-50 text-red-700' : 'border-blue-900 bg-blue-50 text-blue-900')
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Service Address</label>
                  <Input 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                  <h4 className="font-medium text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" /> Worker Preference
                  </h4>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="radio" 
                        name="preference" 
                        checked={formData.preference === 'any'}
                        onChange={() => setFormData({...formData, preference: 'any'})}
                        className="text-blue-900 focus:ring-blue-900"
                      />
                      Any verified worker
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="radio" 
                        name="preference" 
                        checked={formData.preference === 'women_preferred'}
                        onChange={() => setFormData({...formData, preference: 'women_preferred'})}
                        className="text-blue-900 focus:ring-blue-900"
                      />
                      Women worker preferred
                    </label>
                  </div>
                  {formData.preference === 'women_preferred' && (
                    <p className="text-xs text-slate-500 flex items-start gap-1 mt-2">
                      <Info className="w-3 h-3 mt-0.5 shrink-0" />
                      We will prioritize suitable verified women workers for this request.
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800">
                    <strong>Estimated Price:</strong> ₹500 - ₹800<br/>
                    Final price will be confirmed after worker inspection.
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === 2 && (
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
          )}
          {step === 1 ? (
            <Button className="ml-auto" onClick={handleNext} disabled={!formData.service || !formData.description}>
              Next Step
            </Button>
          ) : (
            <Button className="bg-blue-900 hover:bg-blue-800 ml-auto" onClick={handleConfirm}>
              Find Match & Confirm
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
