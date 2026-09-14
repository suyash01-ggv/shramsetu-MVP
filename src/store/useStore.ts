import { create } from 'zustand';
import { User, WorkerProfile, CooperativeProfile, Job, GovernmentScheme } from '../types';

interface AppState {
  currentUser: User | null;
  users: User[];
  jobs: Job[];
  schemes: GovernmentScheme[];
  
  // Auth Actions
  login: (email: string) => void;
  logout: () => void;
  
  // Customer Actions
  bookService: (job: Omit<Job, 'id' | 'status' | 'createdAt' | 'customerId'>) => void;
  rateWorker: (workerId: string, rating: number) => void;
  
  // Worker Actions
  updateWorkerStatus: (status: WorkerProfile['status']) => void;
  acceptJob: (jobId: string) => void;
  declineJob: (jobId: string) => void;
  updateJobStatus: (jobId: string, status: Job['status']) => void;
  
  // Coop Actions
  assignWorker: (jobId: string, workerId: string) => void;
}

const mockUsers: (User | WorkerProfile | CooperativeProfile)[] = [
  {
    id: 'c1',
    name: 'Priya Sharma',
    email: 'customer@test.com',
    role: 'customer',
    phone: '+91 98765 43210',
    location: 'Mumbai, MH',
  },
  {
    id: 'w1',
    name: 'Rajesh Kumar',
    email: 'rajesh@test.com',
    role: 'worker',
    phone: '+91 98765 43211',
    location: 'Andheri, Mumbai',
    skills: ['Plumbing', 'Pipe Fitting'],
    experience: 6,
    rating: 4.8,
    completedJobs: 127,
    status: 'available',
    cooperativeId: 'coop1',
    gender: 'male',
    earnings: 45000,
  },
  {
    id: 'w2',
    name: 'Sunita Devi',
    email: 'sunita@test.com',
    role: 'worker',
    phone: '+91 98765 43212',
    location: 'Bandra, Mumbai',
    skills: ['Cleaning', 'Caregiving'],
    experience: 4,
    rating: 4.9,
    completedJobs: 85,
    status: 'available',
    cooperativeId: 'coop1',
    gender: 'female',
    earnings: 28000,
  },
  {
    id: 'w3',
    name: 'Amit Patel',
    email: 'amit@test.com',
    role: 'worker',
    phone: '+91 98765 43213',
    location: 'Dadar, Mumbai',
    skills: ['Electrical', 'Appliance Repair'],
    experience: 8,
    rating: 4.7,
    completedJobs: 210,
    status: 'busy',
    cooperativeId: 'coop1',
    gender: 'male',
    earnings: 65000,
  },
  {
    id: 'coop1',
    name: 'Mumbai Labour Cooperative Society',
    email: 'admin@coop.com',
    role: 'cooperative',
    phone: '+91 98765 43220',
    location: 'Mumbai Central',
    region: 'Mumbai Metropolitan Region',
  }
];

const mockJobs: Job[] = [
  {
    id: 'j1',
    customerId: 'c1',
    workerId: 'w3',
    cooperativeId: 'coop1',
    service: 'Electrical',
    description: 'Ceiling fan installation in living room',
    address: 'A-402, Shivam Apts, Bandra',
    priority: 'normal',
    status: 'completed',
    price: 450,
    scheduledDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'j2',
    customerId: 'c1',
    workerId: 'w1',
    cooperativeId: 'coop1',
    service: 'Plumbing',
    description: 'Major leak under kitchen sink',
    address: 'A-402, Shivam Apts, Bandra',
    priority: 'urgent',
    status: 'accepted',
    price: 650,
    scheduledDate: new Date().toISOString(),
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];

const mockSchemes: GovernmentScheme[] = [
  {
    id: 's1',
    name: 'PM Svanidhi Yojana',
    description: 'Micro-credit facility for street vendors and informal workers.',
    eligibility: ['Informal sector worker', 'Valid ID'],
    benefits: 'Collateral-free working capital loan up to ₹10,000.',
  },
  {
    id: 's2',
    name: 'E-Shram Registration',
    description: 'National database of unorganized workers to provide social security benefits.',
    eligibility: ['Age 16-59', 'Not member of EPFO/ESIC'],
    benefits: 'Accidental insurance cover of ₹2 Lakhs, routing of direct benefit transfers.',
  }
];

export const useStore = create<AppState>((set) => ({
  currentUser: null,
  users: mockUsers,
  jobs: mockJobs,
  schemes: mockSchemes,

  login: (email) => set((state) => ({
    currentUser: state.users.find(u => u.email === email) || null
  })),

  logout: () => set({ currentUser: null }),

  bookService: (jobData) => set((state) => {
    if (!state.currentUser || state.currentUser.role !== 'customer') return state;
    const newJob: Job = {
      ...jobData,
      id: `j${Date.now()}`,
      customerId: state.currentUser.id,
      status: 'requested',
      createdAt: new Date().toISOString(),
    };
    return { jobs: [newJob, ...state.jobs] };
  }),

  rateWorker: (workerId, rating) => set((state) => {
    // In a real app, we'd store individual ratings. Here we just bump the average slightly.
    return {
      users: state.users.map(u => {
        if (u.id === workerId && u.role === 'worker') {
          const worker = u as WorkerProfile;
          return {
            ...worker,
            rating: Math.min(5, Number(((worker.rating * worker.completedJobs + rating) / (worker.completedJobs + 1)).toFixed(1))),
            completedJobs: worker.completedJobs + 1
          };
        }
        return u;
      })
    };
  }),

  updateWorkerStatus: (status) => set((state) => {
    if (!state.currentUser || state.currentUser.role !== 'worker') return state;
    const updatedUsers = state.users.map(u => 
      u.id === state.currentUser?.id ? { ...u, status } : u
    );
    return { 
      users: updatedUsers,
      currentUser: updatedUsers.find(u => u.id === state.currentUser?.id)
    };
  }),

  acceptJob: (jobId) => set((state) => {
    if (!state.currentUser || state.currentUser.role !== 'worker') return state;
    return {
      jobs: state.jobs.map(j => j.id === jobId ? { ...j, status: 'accepted', workerId: state.currentUser!.id } : j)
    };
  }),

  declineJob: (jobId) => set((state) => {
    return {
      jobs: state.jobs.map(j => j.id === jobId ? { ...j, status: 'requested', workerId: undefined } : j)
    };
  }),

  updateJobStatus: (jobId, status) => set((state) => {
    return {
      jobs: state.jobs.map(j => j.id === jobId ? { ...j, status } : j)
    };
  }),

  assignWorker: (jobId, workerId) => set((state) => {
    return {
      jobs: state.jobs.map(j => j.id === jobId ? { ...j, status: 'assigned', workerId } : j)
    };
  }),
}));
