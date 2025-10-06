"use client";
import React, { useEffect, useMemo, useState } from 'react';

export default function ClientManager({ companyToken }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newListName, setNewListName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [selectedListId, setSelectedListId] = useState(null);
  const [vehicleIdForAssign, setVehicleIdForAssign] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(false);

  const authHeaders = useMemo(() => {
    const headers = {
      "Content-Type": "application/json",
      ...(companyToken ? { Authorization: `Bearer ${companyToken}` } : {}),
    };
    console.log('🔑 Auth headers:', headers);
    return headers;
  }, [companyToken]);

  const loadLists = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://backend.okdriver.in/api/company/clients/lists", { headers: authHeaders });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to load lists");
      setLists(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadLists(); }, []);

  // Load vehicles for dropdown
  const loadVehicles = async () => {
    try {
      setVehiclesLoading(true);
      console.log('🚗 Loading vehicles...');
      
      const res = await fetch('https://backend.okdriver.in/api/company/vehicles', {
        headers: authHeaders
      });
      
      console.log('📡 Vehicle response status:', res.status);
      const data = await res.json();
      console.log('📡 Vehicle response data:', data);
      
      // Support both {data:[...]} and [...] shapes
      const arr = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
      console.log('📋 Processed vehicle array:', arr);
      
      const mapped = arr.map(v => ({ 
        id: v.id, 
        label: v.vehicleNumber || v.name || `Vehicle #${v.id}` 
      }));
      
      console.log('🗺️ Mapped vehicles:', mapped);
      setVehicles(mapped);
    } catch (e) {
      console.error('❌ Failed to load vehicles', e);
      setError(`Failed to load vehicles: ${e.message}`);
    } finally {
      setVehiclesLoading(false);
    }
  };

  useEffect(() => { loadVehicles(); }, [authHeaders]);

  const createList = async () => {
    if (!newListName.trim()) return;
    try {
      const res = await fetch("https://backend.okdriver.in/api/company/clients/lists", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ name: newListName.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to create list");
      setNewListName("");
      await loadLists();
    } catch (e) {
      setError(e.message);
    }
  };

  const addEmailToSelectedList = async () => {
    if (!selectedListId || !emailInput.trim()) return;
    try {
      const res = await fetch(`https://backend.okdriver.in/api/company/clients/lists/${selectedListId}/members`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ email: emailInput.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to add email");
      setEmailInput("");
      await loadLists();
    } catch (e) {
      setError(e.message);
    }
  };

  const removeMember = async (listId, clientId) => {
    try {
      const res = await fetch(`https://backend.okdriver.in/api/company/clients/lists/${listId}/members/${clientId}`, {
        method: "DELETE",
        headers: authHeaders
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to remove member");
      await loadLists();
    } catch (e) {
      setError(e.message);
    }
  };

  const assignListToVehicle = async () => {
    if (!selectedListId || !vehicleIdForAssign) {
      setError("Please select both a list and a vehicle");
      return;
    }
    
    console.log('🔗 Attempting to assign list', selectedListId, 'to vehicle', vehicleIdForAssign);
    
    try {
      setError("");
      const res = await fetch(`https://backend.okdriver.in/api/company/clients/lists/${selectedListId}/assign/${Number(vehicleIdForAssign)}`, {
        method: "POST",
        headers: authHeaders
      });
      
      console.log('📡 Response status:', res.status);
      const data = await res.json();
      console.log('📡 Response data:', data);
      
      if (!res.ok) {
        throw new Error(data?.message || `Failed to assign (${res.status})`);
      }
      
      setVehicleIdForAssign("");
      alert(`Successfully assigned list to vehicle! ${data.assignedCount || 0} clients now have access.`);
    } catch (e) {
      console.error('❌ Assignment error:', e);
      setError(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-black mb-3">Create Client List</h3>
        <div className="flex gap-2">
          <input value={newListName} onChange={e => setNewListName(e.target.value)} placeholder="List name (e.g., Testers)" className="border border-gray-300 rounded px-3 py-2 flex-1" />
          <button onClick={createList} className="bg-black text-white px-4 py-2 rounded">Create</button>
        </div>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-black mb-3">Add Emails to List</h3>
        <div className="flex gap-2 mb-3">
          <select value={selectedListId || ""} onChange={e => setSelectedListId(e.target.value ? Number(e.target.value) : null)} className="border border-gray-300 rounded px-3 py-2">
            <option value="">Select List</option>
            {lists.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
          <input value={emailInput} onChange={e => setEmailInput(e.target.value)} placeholder="email@example.com" className="border border-gray-300 rounded px-3 py-2 flex-1" />
          <button onClick={addEmailToSelectedList} className="bg-black text-white px-4 py-2 rounded">Add</button>
        </div>

        <div className="space-y-4">
          {lists.map(list => (
            <div key={list.id} className="border border-gray-200 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-black">{list.name}</h4>
              </div>
              <div className="space-y-1">
                {(list.members || []).map(m => (
                  <div key={m.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-800">{m.client?.email}</span>
                    <button onClick={() => removeMember(list.id, m.clientId)} className="text-red-600">Remove</button>
                  </div>
                ))}
                {(!list.members || list.members.length === 0) && (
                  <p className="text-gray-500 text-sm">No members yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-black mb-3">Assign List to Vehicle</h3>
        <div className="flex gap-2">
          <select value={selectedListId || ""} onChange={e => setSelectedListId(e.target.value ? Number(e.target.value) : null)} className="border border-gray-300 rounded px-3 py-2">
            <option value="">Select List</option>
            {lists.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
          <select value={vehicleIdForAssign} onChange={e => setVehicleIdForAssign(e.target.value)} className="border border-gray-300 rounded px-3 py-2 min-w-[220px]">
            <option value="">{vehiclesLoading ? 'Loading vehicles...' : 'Select Vehicle'}</option>
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>{v.label}</option>
            ))}
          </select>
          <button onClick={assignListToVehicle} className="bg-black text-white px-4 py-2 rounded">Assign</button>
        </div>
        <div className="mt-2 flex gap-2">
          <button onClick={loadVehicles} className="text-sm underline">Refresh vehicles</button>
          <button 
            onClick={() => {
              console.log('🔍 Current vehicles state:', vehicles);
              console.log('🔍 Current vehicles loading state:', vehiclesLoading);
              alert(`Current vehicles: ${vehicles.length}\nLoading: ${vehiclesLoading}\nVehicles: ${JSON.stringify(vehicles, null, 2)}`);
            }} 
            className="text-sm underline text-purple-600"
          >
            Check State
          </button>
          <button 
            onClick={async () => {
              try {
                const res = await fetch('https://backend.okdriver.in/api/company/vehicles/debug', {
                  headers: authHeaders
                });
                const data = await res.json();
                console.log('Auth debug response:', data);
                alert(`Auth test: ${JSON.stringify(data, null, 2)}`);
              } catch (e) {
                console.error('Auth test failed:', e);
                alert(`Auth test failed: ${e.message}`);
              }
            }} 
            className="text-sm underline text-green-600"
          >
            Test Auth
          </button>
          <button 
            onClick={async () => {
              if (!selectedListId || !vehicleIdForAssign) {
                alert('Please select both list and vehicle first');
                return;
              }
              try {
                const res = await fetch(`https://backend.okdriver.in/api/company/clients/test-assignment/${selectedListId}/${vehicleIdForAssign}`, {
                  headers: authHeaders
                });
                const data = await res.json();
                console.log('Test assignment response:', data);
                alert(`Test successful: ${JSON.stringify(data, null, 2)}`);
              } catch (e) {
                console.error('Test failed:', e);
                alert(`Test failed: ${e.message}`);
              }
            }} 
            className="text-sm underline text-blue-600"
          >
            Test Assignment
          </button>
        </div>
        
        {/* Debug section */}
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
          <p><strong>Debug Info:</strong></p>
          <p>Vehicles loaded: {vehicles.length}</p>
          <p>Selected vehicle: {vehicleIdForAssign || 'None'}</p>
          <p>Loading: {vehiclesLoading ? 'Yes' : 'No'}</p>
          {vehicles.length > 0 && (
            <div>
              <p><strong>Available vehicles:</strong></p>
              <ul className="list-disc list-inside">
                {vehicles.map(v => (
                  <li key={v.id}>{v.label} (ID: {v.id})</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


