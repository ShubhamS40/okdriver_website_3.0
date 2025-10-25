'use client'
import React, { useEffect, useState } from 'react';
import { useVehicleLimit } from '../../../hooks/useVehicleLimit';
import VehicleDetail from '../../../components/VechileDetail.jsx';
import ClientManager from '@/components/ClientManager';

// Import all the new components
import DashboardStats from './../../../components/dashboard/DashboardStats';
import VehicleList from './../../../components/dashboard/VechileList.jsx';
import AddVehicleForm from './../../../components/dashboard/AddVehicleFrom.jsx';
import ChatSection from './../../../components/dashboard/ChatSection';
import Sidebar from './../../../components/dashboard/Sidebar';
import Header from './../../../components/dashboard/Header';
import LocationsView from './../../../components/dashboard/LocationView.jsx';
import HelpSupportView from './../../../components/dashboard/HelpSupportView.jsx';
import SettingsView from './../../../components/dashboard/SettingView.jsx';
import ProfileView from './../../../components/dashboard/ProfileView';
import ReportSection from './../../../components/dashboard/ReportSection';
import VehicleLimitWarning from './../../../components/dashboard/VehicleLimitWarning';
import ApiKeysView from '../../../components/dashboard/ApiKeysView.jsx';

export default function ChatSupportDashboard() {
  // Dashboard Data State Management
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(false);
  const [vehiclesError, setVehiclesError] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [detailVehicleId, setDetailVehicleId] = useState(null);

  const [chatRooms] = useState([
    { id: 1, vehicle: 'Vehicle 001', participants: ['Driver', 'Client', 'Support'], lastMessage: '2 mins ago', status: 'active' },
    { id: 2, vehicle: 'Vehicle 002', participants: ['Driver', 'Client'], lastMessage: '15 mins ago', status: 'idle' },
    { id: 3, vehicle: 'Vehicle 003', participants: ['Driver', 'Support'], lastMessage: '1 hour ago', status: 'closed' },
  ]);

  // --- Add Vehicle form state ---
  const [vehicleForm, setVehicleForm] = useState({
    vehicleNumber: '',
    password: '',
    model: '',
    type: '',
    companyId: ''
  });
  const [vehicleSubmitting, setVehicleSubmitting] = useState(false);
  const [vehicleMsg, setVehicleMsg] = useState('');

  // Load Vehicles from API
  const loadVehicles = async () => {
    setVehiclesLoading(true);
    setVehiclesError('');
    
    // Check authentication token
    const token = typeof window !== 'undefined' ? localStorage.getItem('companyToken') : null;
    if (!token) {
      setVehiclesError('No authentication token found. Please log in again.');
      setVehiclesLoading(false);
      return;
    }
    
    try {
      const res = await fetch('https://backend.okdriver.in/api/company/vehicles', {
        headers: {
          'Content-Type': 'application/json',
          ...(typeof window !== 'undefined' && localStorage.getItem('companyToken') ? 
            { Authorization: `Bearer ${localStorage.getItem('companyToken')}` } : {})
        }
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        console.error('Vehicle API error:', res.status, data);
        throw new Error(data?.message || `Failed to load vehicles (${res.status})`);
      }
      
      console.log('API Response:', data);
      
      // Handle both wrapped and unwrapped response formats
      let vehicleData = data;
      if (data.data) {
        vehicleData = data.data;
      }
      
      // Map API response to UI format and fetch locations
      const mappedVehicles = await Promise.all(
        Array.isArray(vehicleData) ? vehicleData.map(async (v) => {
          let location = 'N/A';
          try {
            const locationRes = await fetch(`https://backend.okdriver.in/api/company/vehicles/location/${encodeURIComponent(v.vehicleNumber)}`);
            if (locationRes.ok) {
              const locationData = await locationRes.json();
              if (locationData.location) {
                location = `${locationData.location.lat.toFixed(4)}, ${locationData.location.lng.toFixed(4)}`;
              }
            }
          } catch (_) {
            // Keep N/A if location fetch fails
          }
          
          return {
            id: v.id,
            name: v.vehicleNumber,
            driver: 'N/A',
            status: v.status === 'ACTIVE' ? 'Active' : 'Inactive',
            location,
            client: 'N/A',
            model: v.model || 'N/A',
            type: v.type || 'N/A',
            createdAt: v.createdAt ? new Date(v.createdAt).toLocaleDateString() : 'N/A'
          };
        }) : []
      );
      
      console.log('Mapped Vehicles:', mappedVehicles);
      setVehicles(mappedVehicles);
      
      // Reload assignments to get updated client list data
      await loadAssignments();
      
    } catch (err) {
      console.error('Load vehicles error:', err);
      
      // Check if it's a JSON parsing error (HTML response)
      if (err.message.includes('Unexpected token') && err.message.includes('<!DOCTYPE')) {
        setVehiclesError('Server returned HTML instead of JSON. Please check authentication or server status.');
      } else {
        setVehiclesError('Failed to load vehicles: ' + err.message);
      }
    } finally {
      setVehiclesLoading(false);
    }
  };

  // Load Vehicle Assignments
  const loadAssignments = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('companyToken') : '';
      if (!token) return;
      
      console.log('🔗 Loading vehicle assignments...');
      const res = await fetch('https://backend.okdriver.in/api/company/clients/vehicles-list-assignments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await res.json();
      console.log('📋 Assignments data:', data);
      
      if (Array.isArray(data)) {
        setAssignments(data);
        console.log('✅ Assignments loaded:', data.length, 'assignments');
      } else {
        console.log('❌ Assignments data is not an array:', data);
      }
    } catch (e) {
      console.error('❌ Failed to load assignments:', e);
    }
  };

  // UseEffect hooks for initial data loading
  useEffect(() => {
    loadVehicles();
  }, []);

  useEffect(() => { 
    loadAssignments(); 
  }, []);

  // Dashboard Stats Calculation
  const dashboardStats = {
    totalVehicles: vehiclesLoading ? '...' : vehicles.length,
    activeChats: chatRooms.filter(c => c.status === 'active').length,
    totalClients: assignments.reduce((sum, assignment) => sum + (assignment.listNames?.length || 0), 0),
    locations: vehicles.filter(v => v.location && v.location !== 'N/A').length
  };

  // Try to prefill companyId from JWT (if payload has id)
  useEffect(() => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('companyToken') : null;
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1] || ''));
        if (payload?.id && !vehicleForm.companyId) {
          setVehicleForm(prev => ({ ...prev, companyId: String(payload.id) }));
        }
      }
    } catch (err) {
      console.log('Token decode error:', err);
      // ignore decode errors
    }
  }, []);

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleForm(prev => ({ ...prev, [name]: value }));
  };

  const generateRandomPassword = () => {
    const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@$%!';
    let pwd = '';
    for (let i = 0; i < 10; i++) {
      pwd += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setVehicleForm(prev => ({ ...prev, password: pwd }));
  };

  // Get vehicle limit functions
  const { canAddVehicle, getPlanDetails } = useVehicleLimit();

  const submitVehicle = async () => {
    setVehicleMsg('');
    const { vehicleNumber, password } = vehicleForm;
    if (!vehicleNumber || !password) {
      setVehicleMsg('vehicleNumber and password are required');
      return;
    }
    
    // Check if adding a vehicle would exceed the limit
    if (!canAddVehicle()) {
      const planDetails = getPlanDetails();
      setVehicleMsg(`Vehicle limit reached. Your current plan allows a maximum of ${planDetails?.maxVehicles || 0} vehicles. Please upgrade your plan to add more vehicles.`);
      return;
    }
    
    setVehicleSubmitting(true);
    try {
      const payload = {
        vehicleNumber: vehicleForm.vehicleNumber,
        password: vehicleForm.password
      };
      
      // Only add model and type if they have values
      if (vehicleForm.model.trim()) {
        payload.model = vehicleForm.model;
      }
      if (vehicleForm.type) {
        payload.type = vehicleForm.type;
      }
      
      console.log('Submitting vehicle:', payload);
      
      const res = await fetch('https://backend.okdriver.in/api/company/vehicles', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(typeof window !== 'undefined' && localStorage.getItem('companyToken') ? 
            { Authorization: `Bearer ${localStorage.getItem('companyToken')}` } : {})
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('Add vehicle API error:', res.status, data);
        throw new Error(data?.message || `Failed to add vehicle (${res.status})`);
      }
      setVehicleMsg('Vehicle added successfully');
      setVehicleForm(prev => ({ ...prev, vehicleNumber: '', password: '', model: '', type: '' }));
      // Reload vehicles list after adding
      await loadVehicles();
    } catch (err) {
      console.error('Submit vehicle error:', err);
      setVehicleMsg(err.message || 'Error adding vehicle');
    } finally {
      setVehicleSubmitting(false);
    }
  };

  // Render the appropriate content based on activeSection
  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <VehicleLimitWarning />
            <DashboardStats stats={dashboardStats} />
            <VehicleList 
              vehicles={vehicles} 
              assignments={assignments} 
              vehiclesLoading={vehiclesLoading} 
              vehiclesError={vehiclesError} 
              loadVehicles={loadVehicles} 
              setDetailVehicleId={setDetailVehicleId} 
            />
            {detailVehicleId && (
              <VehicleDetail 
                vehicleId={detailVehicleId} 
                companyToken={typeof window !== 'undefined' ? localStorage.getItem('companyToken') : ''} 
                onClose={() => setDetailVehicleId(null)} 
              />
            )}
          </div>
        );
      case 'vehicles':
        return (
          <div className="space-y-6">
            <VehicleLimitWarning />
            <AddVehicleForm 
              vehicleForm={vehicleForm} 
              handleVehicleChange={handleVehicleChange} 
              generateRandomPassword={generateRandomPassword} 
              submitVehicle={submitVehicle} 
              vehicleSubmitting={vehicleSubmitting} 
              vehicleMsg={vehicleMsg} 
            />
          </div>
        );
      case 'clients':
        return (
          <ClientManager companyToken={typeof window !== 'undefined' ? localStorage.getItem('companyToken') : ''} />
        );
      case 'api-keys':
        return <ApiKeysView />;
      case 'locations':
        return <LocationsView vehicles={vehicles} />;
      case 'report':
        return <ReportSection />;
      case 'chat':
        return <ChatSection chatRooms={chatRooms} />;
      case 'help':
        return <HelpSupportView />;
      case 'settings':
        return <SettingsView />;
      case 'profile':
        return <ProfileView />;
      default:
        return (
          <div className="space-y-6">
            <DashboardStats stats={dashboardStats} />
            <VehicleList 
              vehicles={vehicles} 
              assignments={assignments} 
              vehiclesLoading={vehiclesLoading} 
              vehiclesError={vehiclesError} 
              loadVehicles={loadVehicles} 
              setDetailVehicleId={setDetailVehicleId} 
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          sidebarOpen={sidebarOpen} 
        />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}