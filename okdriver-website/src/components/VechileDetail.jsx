import React, { useEffect, useMemo, useState } from 'react';

export default function VehicleDetail({ vehicleId, companyToken, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [chatInput, setChatInput] = useState('');

  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    ...(companyToken ? { Authorization: `Bearer ${companyToken}` } : {})
  }), [companyToken]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/api/company/clients/vehicle/${vehicleId}/details`, { headers });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || 'Failed to load');
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [vehicleId]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-5xl rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold text-black">Vehicle Details</h3>
          <button onClick={onClose} className="text-sm underline">Close</button>
        </div>
        {loading ? (
          <div className="p-6">Loading...</div>
        ) : error ? (
          <div className="p-6 text-red-600">{error}</div>
        ) : data ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            <div className="lg:col-span-2">
              <div className="h-80 w-full border rounded" id="mapPlaceholder">
                <div className="p-4 text-gray-600 text-sm">Map placeholder (OpenStreetMap can be integrated here).<br/>Lat/Lng: {data.latestLocation ? `${data.latestLocation.lat}, ${data.latestLocation.lng}` : 'N/A'}</div>
              </div>
              <div className="mt-3 text-sm text-gray-700">
                <div><span className="font-medium text-black">Vehicle:</span> {data.vehicle.vehicleNumber} ({data.vehicle.model || 'N/A'})</div>
                <div><span className="font-medium text-black">Client lists:</span> {data.listNames.length ? data.listNames.join(', ') : 'None'}</div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="border rounded h-80 flex flex-col">
                <div className="px-3 py-2 border-b font-medium text-black">Chat</div>
                <div className="flex-1 overflow-auto p-3 space-y-2">
                  {(data.chats || []).map((c, idx) => (
                    <div key={idx} className="text-sm">
                      <span className="font-medium">{c.senderType}</span>: {c.message}
                    </div>
                  ))}
                  {(!data.chats || data.chats.length === 0) && <div className="text-gray-500 text-sm">No messages</div>}
                </div>
                <div className="p-2 border-t flex gap-2">
                  <input value={chatInput} onChange={e => setChatInput(e.target.value)} className="flex-1 border rounded px-2 py-1" placeholder="Type a message..." />
                  <button disabled className="bg-gray-300 text-white px-3 py-1 rounded">Send</button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
