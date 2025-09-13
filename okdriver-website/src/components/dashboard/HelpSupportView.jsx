'use client'
import React, { useState } from 'react';

const priorities = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' }
];

export default function HelpSupportView() {
  const [form, setForm] = useState({ subject: '', priority: 'Medium', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!form.subject.trim() || !form.description.trim()) {
      setMessage('Please fill subject and description');
      return;
    }
    setSubmitting(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('companyToken') : '';
      const res = await fetch('http://localhost:5000/api/company/help-support/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          subject: form.subject,
          description: form.description,
          priority: form.priority
        })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || 'Failed to create ticket');
      }
      setMessage('Ticket created successfully');
      setForm({ subject: '', priority: 'Medium', description: '' });
      await loadTickets();
    } catch (e) {
      setMessage(e.message || 'Failed to create ticket');
    } finally {
      setSubmitting(false);
    }
  };

  const loadTickets = async () => {
    setLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('companyToken') : '';
      const res = await fetch('http://localhost:5000/api/company/help-support/tickets', {
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || 'Failed');
      setList(Array.isArray(json?.data) ? json.data : []);
    } catch (_) {}
    setLoading(false);
  };

  React.useEffect(() => { loadTickets(); }, []);

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
      <p className="text-sm text-gray-600 mb-6">Create a support ticket for any issue related to your company account, vehicles, billing, or product usage.</p>
      {message && (
        <div className={`mb-4 rounded border px-3 py-2 text-sm ${message.includes('success') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            type="text"
            placeholder="Brief summary of the issue"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            {priorities.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={6}
            placeholder="Explain the issue in detail. Include steps, screenshots/IDs if relevant."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="submit"
            disabled={submitting}
            className={`px-4 py-2 rounded-lg text-white ${submitting ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'}`}
          >
            {submitting ? 'Submitting...' : 'Create Ticket'}
          </button>
          <span className="text-xs text-gray-500">Our team will respond via email within 24 hours.</span>
        </div>
      </form>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3">Your Tickets</h3>
        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {list.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-900">{t.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{t.subject}
                      {t.adminResponse && (
                        <div className="text-xs text-gray-600 mt-1">
                          <span className="font-semibold">Admin response:</span> {t.adminResponse}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${t.status === 'CLOSED' ? 'bg-green-100 text-green-800' : t.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {t.status === 'IN_PROGRESS' ? 'In Progress' : t.status.charAt(0) + t.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">{new Date(t.updatedAt).toISOString().slice(0,10)}</td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr><td colSpan="4" className="px-4 py-4 text-sm text-gray-500">No tickets yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


