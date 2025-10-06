'use client'
import React from 'react';
import { Eye } from 'lucide-react';

const VehicleList = ({ 
  vehicles, 
  assignments, 
  vehiclesLoading, 
  vehiclesError, 
  loadVehicles, 
  setDetailVehicleId 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-black">Vehicle List</h3>
        <div className="flex gap-2">
          <button 
            onClick={loadVehicles}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors"
          >
            Refresh
          </button>
          <button 
            onClick={async () => {
              try {
                const res = await fetch('https://backend.okdriver.in:5000/');
                const text = await res.text();
                alert(`Backend is running: ${text}`);
              } catch (e) {
                alert(`Backend error: ${e.message}`);
              }
            }}
            className="text-sm bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded transition-colors"
          >
            Test Backend
          </button>
          <button 
            onClick={() => {
              console.log('🔍 Current assignments:', assignments);
              console.log('🔍 Current vehicles:', vehicles);
              alert(`Assignments: ${assignments.length}\nVehicles: ${vehicles.length}\nCheck console for details`);
            }}
            className="text-sm bg-green-100 hover:bg-green-200 px-3 py-1 rounded transition-colors"
          >
            Debug Data
          </button>
        </div>
      </div>
      {vehiclesError && (
        <div className="p-4 text-red-600 bg-red-50 border-b border-red-200">
          {vehiclesError}
          <button 
            onClick={loadVehicles}
            className="ml-2 text-sm underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}
      {vehiclesLoading ? (
        <div className="p-8 text-center text-gray-500">Loading vehicles...</div>
      ) : (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Lists</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vehicles.length > 0 ? vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-black">{vehicle.name}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    vehicle.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{vehicle.location}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {(() => {
                    const assignment = assignments.find(a => a.vehicleId === vehicle.id);
                    if (assignment && assignment.listNames && assignment.listNames.length > 0) {
                      return assignment.listNames.join(', ');
                    }
                    return '—';
                  })()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{vehicle.model}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{vehicle.type}</td>
                <td className="px-6 py-4">
                  <button onClick={() => setDetailVehicleId(vehicle.id)} className="text-black hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  No vehicles found. Add your first vehicle using the "Add Vehicle" option.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default VehicleList;