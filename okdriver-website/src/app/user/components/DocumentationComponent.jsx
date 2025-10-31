'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function DocumentationComponent({ hasActiveSubscription }) {
  const [docTab, setDocTab] = useState('dms');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex items-center mb-6">
        <div className="bg-black text-white p-3 rounded-full mr-4">
          <BookOpen size={24} />
        </div>
        <h2 className="text-2xl font-bold">API Documentation</h2>
      </div>

      {!hasActiveSubscription && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <p className="font-medium text-yellow-800">
            You need an active subscription to access the API.
          </p>
          <p className="text-sm text-yellow-700 mt-1">
            Please purchase a plan from the Billing tab.
          </p>
        </div>
      )}

      <div className="mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setDocTab('dms')}
            className={`py-2 px-4 font-medium ${
              docTab === 'dms'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500'
            }`}
          >
            Drowsiness Monitoring
          </button>
          <button
            onClick={() => setDocTab('assistant')}
            className={`py-2 px-4 font-medium ${
              docTab === 'assistant'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500'
            }`}
          >
            OkDriver Assistant
          </button>
        </div>
      </div>

      {docTab === 'dms' ? (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Drowsiness Monitoring API</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Authentication</h4>
            <p className="text-sm mb-2">
              Include your API key in all requests using one of these methods:
            </p>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
              <code>
                {`// Method 1: Authorization header
Authorization: Bearer YOUR_API_KEY

// Method 2: Custom header
x-api-key: YOUR_API_KEY`}
              </code>
            </pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Endpoint: Drowsiness Detection</h4>
            <p className="text-sm mb-2">POST /api/v1/detect-drowsiness</p>
            <p className="text-sm mb-2">Request body:</p>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
              <code>
                {`{
  "image": "base64_encoded_image_data",
  "userId": "optional_user_identifier"
}`}
              </code>
            </pre>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">OkDriver Assistant API</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Authentication</h4>
            <p className="text-sm mb-2">
              Include your API key in all requests using one of these methods:
            </p>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
              <code>
                {`// Method 1: Authorization header
Authorization: Bearer YOUR_API_KEY

// Method 2: Custom header
x-api-key: YOUR_API_KEY`}
              </code>
            </pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Endpoint: Voice Assistant</h4>
            <p className="text-sm mb-2">POST /api/v1/assistant/query</p>
            <p className="text-sm mb-2">Request body:</p>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
              <code>
                {`{
  "query": "text_query_or_command",
  "sessionId": "optional_session_identifier"
}`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </motion.div>
  );
}