export type Role = 'customer' | 'worker' | 'cooperative';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone: string;
  location: string;
  avatar?: string;
}

export interface WorkerProfile extends User {
  role: 'worker';
  skills: string[];
  experience: number; // years
  rating: number;
  completedJobs: number;
  status: 'available' | 'busy' | 'offline';
  cooperativeId: string;
  gender: 'male' | 'female' | 'other';
  earnings: number;
}

export interface CooperativeProfile extends User {
  role: 'cooperative';
  region: string;
}

export interface Job {
  id: string;
  customerId: string;
  workerId?: string;
  cooperativeId?: string;
  service: string;
  description: string;
  address: string;
  priority: 'normal' | 'urgent' | 'emergency';
  status: 'requested' | 'assigned' | 'accepted' | 'on_the_way' | 'arrived' | 'started' | 'completed' | 'cancelled';
  price: number;
  scheduledDate: string;
  createdAt: string;
  preference?: 'any' | 'women_preferred';
}

export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  benefits: string;
}
