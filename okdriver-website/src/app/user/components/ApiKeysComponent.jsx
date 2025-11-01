'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Plus, Copy, Trash2, Eye, EyeOff, Check, X } from 'lucide-react';

export default function ApiKeysComponent({ 
  apiKeys, 
  setApiKeys, 
  session, 
  hasActiveSubscription 
}) {
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [creatingKey, setCreatingKey] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState({});
  const [copiedKey, setCopiedKey] = useState(null);
  const [error, setError] = useState(null);

  const handleCreateKey = async (e) => {
    e.preventDefault();
    
    if (!hasActiveSubscription) {
      setError('You need an active subscription to create API keys');
      return;
    }
    
    if (!newKeyName.trim()) {
      setError('Please enter a name for your API key');
      return;
    }
    
    setCreatingKey(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:5000/api/user/api-key/${session.user.backendId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyName: newKeyName
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Add the new key to the list and show it
        setApiKeys([data.apiKey, ...apiKeys]);
        setVisibleKeys(prev => ({ ...prev, [data.apiKey.id]: true }));
        setNewKeyName('');
        setShowCreateKey(false);
      } else {
        setError(data.message || 'Failed to create API key');
      }
    } catch (error) {
      console.error('Error creating API key:', error);
      setError('An error occurred while creating the API key');
    } finally {
      setCreatingKey(false);
    }
  };

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = (text, keyId) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRevokeKey = async (keyId) => {
    if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/user/api-key/${session.user.backendId}/${keyId}/deactivate`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update the key in the list
        setApiKeys(apiKeys.map(key => 
          key.id === keyId ? { ...key, revoked: true, isActive: false } : key
        ));
      } else {
        setError(data.message || 'Failed to revoke API key');
      }
    } catch (error) {
      console.error('Error revoking API key:', error);
      setError('An error occurred while revoking the API key');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-black text-white p-3 rounded-full mr-4">
            <Key size={24} />
          </div>
          <h2 className="text-2xl font-bold">API Keys</h2>
        </div>
        <button
          onClick={() => {
            if (!hasActiveSubscription) {
              setError('You need an active subscription to create API keys');
              return;
            }
            setShowCreateKey(!showCreateKey);
            setError(null);
          }}
          className="flex items-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Create New Key
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <div className="flex items-center">
            <X size={18} className="text-red-600 mr-2" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {!hasActiveSubscription && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <p className="font-medium text-yellow-800">
            You need an active subscription to create and use API keys.
          </p>
          <p className="text-sm text-yellow-700 mt-1">
            Please purchase a plan from the Billing tab.
          </p>
        </div>
      )}

      {showCreateKey && (
        <div className="mb-6 bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-3">Create New API Key</h3>
          <form onSubmit={handleCreateKey}>
            <div className="mb-4">
              <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 mb-1">
                Key Name
              </label>
              <input
                type="text"
                id="keyName"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Development, Production, Testing"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowCreateKey(false);
                  setNewKeyName('');
                  setError(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creatingKey || !newKeyName.trim()}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400"
              >
                {creatingKey ? 'Creating...' : 'Create Key'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        {apiKeys.length > 0 ? (
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <div
                key={key.id}
                className={`border rounded-md p-4 ${
                  key.revoked || !key.isActive
                    ? 'border-red-200 bg-red-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{key.keyName}</h4>
                    <div className="flex items-center mt-1">
                      <div className="flex-1 relative">
                        <div className="flex items-center">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-2 overflow-hidden">
                            {visibleKeys[key.id] ? key.apiKey : '•'.repeat(20)}
                          </code>
                          <button
                            onClick={() => toggleKeyVisibility(key.id)}
                            className="text-gray-500 hover:text-gray-700"
                            title={visibleKeys[key.id] ? 'Hide key' : 'Show key'}
                          >
                            {visibleKeys[key.id] ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                          <button
                            onClick={() => copyToClipboard(key.apiKey, key.id)}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                            title="Copy to clipboard"
                          >
                            {copiedKey === key.id ? (
                              <Check size={18} className="text-green-600" />
                            ) : (
                              <Copy size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Created: {new Date(key.createdAt).toLocaleDateString()}
                      {key.lastUsedAt && (
                        <span className="ml-4">
                          Last used: {new Date(key.lastUsedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {key.revoked || !key.isActive ? (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                        Revoked
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRevokeKey(key.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Revoke key"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No API keys found. Create your first key to get started.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}