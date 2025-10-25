import React, { useState } from 'react';
import { Plus, Copy, Trash2, Eye, EyeOff, Check } from 'lucide-react';

export default function APIKeysManager() {
  const [keys, setKeys] = useState([
    {
      id: 1,
      name: 'Production API',
      secretKey: 'sk-okd-prod-a1b2c3d4e5f6g7h8i9j0',
      created: 'Oct 15, 2025',
      lastUsed: 'Oct 23, 2025',
      project: 'Main Dashboard',
      createdBy: 'Admin'
    },
    {
      id: 2,
      name: 'Development API',
      secretKey: 'sk-okd-dev-x9y8z7w6v5u4t3s2r1q0',
      created: 'Oct 10, 2025',
      lastUsed: 'Oct 22, 2025',
      project: 'Testing Environment',
      createdBy: 'Admin'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [newKey, setNewKey] = useState(null);
  const [visibleKeys, setVisibleKeys] = useState({});
  const [copiedKey, setCopiedKey] = useState(null);

  const generateRandomKey = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let key = 'sk-okd-';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  };

  const handleCreateKey = () => {
    if (!projectName.trim()) {
      alert('Please enter a project name');
      return;
    }

    const generatedKey = generateRandomKey();
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });

    const newApiKey = {
      id: keys.length + 1,
      name: projectName,
      secretKey: generatedKey,
      created: currentDate,
      lastUsed: currentDate,
      project: projectName,
      createdBy: 'Admin'
    };

    setKeys([newApiKey, ...keys]);
    setNewKey(generatedKey);
    setProjectName('');
    setShowModal(false);
    setShowSuccessModal(true);
  };

  const handleDeleteKey = (id) => {
    if (window.confirm('Are you sure you want to delete this API key?')) {
      setKeys(keys.filter(key => key.id !== id));
    }
  };

  const toggleKeyVisibility = (id) => {
    setVisibleKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const maskKey = (key) => {
    return key.substring(0, 12) + '...' + key.substring(key.length - 4);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">API keys</h1>
            <p className="text-gray-400">OkDriver Smart Dashcams Private Limited</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            <Plus size={20} />
            Create new secret key
          </button>
        </div>

        {/* Info Section */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6 space-y-4">
          <p className="text-gray-300">
            You have permission to view and manage all API keys in this organization.
          </p>
          <p className="text-gray-300">
            Do not share your API key with others or expose it in the browser or other client-side code. 
            To protect your account's security, OkDriver may automatically disable any API key that has leaked publicly.
          </p>
          <p className="text-gray-300">
            View usage per API key on the <span className="text-blue-400 underline cursor-pointer">Usage page</span>.
          </p>
        </div>

        {/* API Keys Table */}
        <div className="bg-[#2a2a2a] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#333333] border-b border-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">NAME</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">SECRET KEY</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">CREATED</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">LAST USED</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">PROJECT</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">CREATED BY</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key, index) => (
                <tr 
                  key={key.id} 
                  className={`border-b border-gray-700 hover:bg-[#333333] transition-colors ${
                    index === keys.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-gray-200">{key.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-gray-300 font-mono">
                        {visibleKeys[key.id] ? key.secretKey : maskKey(key.secretKey)}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {visibleKeys[key.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(key.secretKey, key.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {copiedKey === key.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{key.created}</td>
                  <td className="px-6 py-4 text-gray-300">{key.lastUsed}</td>
                  <td className="px-6 py-4 text-gray-300">{key.project}</td>
                  <td className="px-6 py-4 text-gray-300">{key.createdBy}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteKey(key.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create Key Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#2a2a2a] rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6">Create new secret key</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                  autoFocus
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setProjectName('');
                  }}
                  className="px-4 py-2 bg-[#3a3a3a] text-white rounded-lg hover:bg-[#4a4a4a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateKey}
                  className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Create secret key
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#2a2a2a] rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-green-500">API Key Created!</h2>
              
              <p className="text-gray-300 mb-4">
                Your new API key has been created. Please copy it now as you won't be able to see it again.
              </p>

              <div className="bg-[#1a1a1a] p-4 rounded-lg mb-6">
                <code className="text-sm text-green-400 font-mono break-all">
                  {newKey}
                </code>
              </div>

              <button
                onClick={() => {
                  copyToClipboard(newKey, 'new');
                }}
                className="w-full mb-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                {copiedKey === 'new' ? (
                  <>
                    <Check size={18} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy to Clipboard
                  </>
                )}
              </button>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-4 py-2 bg-[#3a3a3a] text-white rounded-lg hover:bg-[#4a4a4a] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}