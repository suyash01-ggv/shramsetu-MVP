import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public Pages
import { Home } from './pages/public/Home';
import { Login } from './pages/public/Login';

// Customer Pages
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { BookService } from './pages/customer/BookService';
import { CustomerBookings } from './pages/customer/CustomerBookings';

// Worker Pages
import { WorkerDashboard } from './pages/worker/WorkerDashboard';
import { WorkerPortfolio } from './pages/worker/WorkerPortfolio';
import { WorkerSchemes } from './pages/worker/WorkerSchemes';
import { WorkerEarnings } from './pages/worker/WorkerEarnings';
import { WorkerWelfare } from './pages/worker/WorkerWelfare';
import { VoiceSaathi } from './pages/worker/VoiceSaathi';

// Coop Pages
import { CoopDashboard } from './pages/cooperative/CoopDashboard';
import { CoopWorkers } from './pages/cooperative/CoopWorkers';
import { CoopRequests } from './pages/cooperative/CoopRequests';
import { CoopForecast } from './pages/cooperative/CoopForecast';
import { CoopNetwork } from './pages/cooperative/CoopNetwork';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<div className="p-8 text-center">Registration Page (Demo uses pre-configured accounts via Login)</div>} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Customer */}
          <Route path="customer" element={<CustomerDashboard />} />
          <Route path="customer/book" element={<BookService />} />
          <Route path="customer/bookings" element={<CustomerBookings />} />
          
          {/* Worker */}
          <Route path="worker" element={<WorkerDashboard />} />
          <Route path="worker/portfolio" element={<WorkerPortfolio />} />
          <Route path="worker/schemes" element={<WorkerSchemes />} />
          <Route path="worker/earnings" element={<WorkerEarnings />} />
          <Route path="worker/welfare" element={<WorkerWelfare />} />
          <Route path="worker/voice" element={<VoiceSaathi />} />
          
          {/* Cooperative */}
          <Route path="coop" element={<CoopDashboard />} />
          <Route path="coop/workers" element={<CoopWorkers />} />
          <Route path="coop/requests" element={<CoopRequests />} />
          <Route path="coop/forecast" element={<CoopForecast />} />
          <Route path="coop/network" element={<CoopNetwork />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
