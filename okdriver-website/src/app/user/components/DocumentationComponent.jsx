'use client'
import React, { useState, useEffect } from 'react';
import { BookOpen, Copy, Check, Sparkles } from 'lucide-react';

export default function DocumentationComponent({ hasActiveSubscription = true }) {
  const [docTab, setDocTab] = useState('dms');
  const [copied, setCopied] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied({ [id]: true });
    setShowCopied(true);
    setTimeout(() => {
      setCopied({ [id]: false });
      setShowCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Cursor Glow Effect */}
      <div 
        className="fixed pointer-events-none z-50 transition-opacity duration-300"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Copied Toast */}
      {showCopied && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-8 py-4 shadow-2xl flex items-center space-x-3">
            <Check className="w-6 h-6 text-green-400 animate-pulse" />
            <span className="text-white font-semibold text-lg">Copied to clipboard!</span>
          </div>
        </div>
      )}

      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl max-w-7xl mx-auto my-8">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-br from-white to-gray-400 p-4 rounded-2xl mr-4 transform transition-all duration-300 hover:scale-110 hover:rotate-12">
            <BookOpen size={28} className="text-black" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            API Documentation
          </h2>
        </div>

        {!hasActiveSubscription && (
          <div className="backdrop-blur-xl bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-8">
            <p className="font-semibold text-yellow-300 text-lg">
              ⚠️ You need an active subscription to access the API.
            </p>
            <p className="text-sm text-yellow-200 mt-2">
              Please purchase a plan from the Billing tab.
            </p>
          </div>
        )}

        <div className="mb-8">
          <div className="flex backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-2">
            <button
              onClick={() => setDocTab('dms')}
              className={`flex-1 py-3 px-6 font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
                docTab === 'dms'
                  ? 'bg-white text-black shadow-lg scale-105'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Drowsiness Monitoring
            </button>
            <button
              onClick={() => setDocTab('assistant')}
              className={`flex-1 py-3 px-6 font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
                docTab === 'assistant'
                  ? 'bg-white text-black shadow-lg scale-105'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              OkDriver Assistant
            </button>
          </div>
        </div>

        {docTab === 'dms' ? (
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Sparkles className="w-8 h-8 mr-3 text-yellow-400" />
              Drowsiness Monitoring System (DMS) API
            </h3>
            
            {/* Authentication */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-white flex items-center">
                🔐 Authentication
              </h4>
              <p className="text-gray-300 mb-4">
                All API requests require authentication. Include your API key using one of these methods:
              </p>
              <div className="relative">
                <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-xl text-green-400 overflow-x-auto text-sm">
                  <code>
{`// Method 1: Authorization header (Bearer token)
Authorization: Bearer YOUR_API_KEY

// Method 2: Custom header
x-api-key: YOUR_API_KEY`}
                  </code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(`// Method 1: Authorization header (Bearer token)
Authorization: Bearer YOUR_API_KEY

// Method 2: Custom header
x-api-key: YOUR_API_KEY`, 'auth-methods')}
                  className="absolute top-3 right-3 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied['auth-methods'] ? 
                    <Check size={18} className="text-green-400" /> : 
                    <Copy size={18} className="text-white" />
                  }
                </button>
              </div>
            </div>

            {/* REST API Endpoint 1: Image Upload */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-white flex items-center">
                📤 Endpoint 1: Image Upload Detection
              </h4>
              <p className="text-gray-300 mb-2">
                <span className="font-bold text-blue-400">POST</span>{' '}
                <code className="backdrop-blur-xl bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-white">
                  /api/detect-image
                </code>
              </p>
              <p className="text-gray-300 mb-4">Upload an image file for drowsiness detection. Supports JPG, PNG, WebP formats.</p>
              
              <p className="text-gray-300 mb-2 font-semibold">Request:</p>
              <div className="relative mb-4">
                <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-xl text-green-400 overflow-x-auto text-sm">
                  <code>
{`// Using multipart/form-data
Content-Type: multipart/form-data

FormData:
- file: [Image file]`}
                  </code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(`// Using multipart/form-data
Content-Type: multipart/form-data

FormData:
- file: [Image file]`, 'image-upload')}
                  className="absolute top-3 right-3 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied['image-upload'] ? 
                    <Check size={18} className="text-green-400" /> : 
                    <Copy size={18} className="text-white" />
                  }
                </button>
              </div>

              <p className="text-gray-300 mb-2 font-semibold">Example using JavaScript Fetch:</p>
              <div className="relative">
                <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-xl text-green-400 overflow-x-auto text-sm">
                  <code>
{`const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch('https://api.okdriver.com/api/detect-image', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const result = await response.json();
console.log(result);`}
                  </code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(`const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch('https://api.okdriver.com/api/detect-image', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const result = await response.json();
console.log(result);`, 'image-upload-example')}
                  className="absolute top-3 right-3 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied['image-upload-example'] ? 
                    <Check size={18} className="text-green-400" /> : 
                    <Copy size={18} className="text-white" />
                  }
                </button>
              </div>
            </div>

            {/* REST API Endpoint 2: Base64 */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-white flex items-center">
                📤 Endpoint 2: Base64 Image Detection
              </h4>
              <p className="text-gray-300 mb-2">
                <span className="font-bold text-blue-400">POST</span>{' '}
                <code className="backdrop-blur-xl bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-white">
                  /api/detect-base64
                </code>
              </p>
              <p className="text-gray-300 mb-4">Send a base64 encoded image for drowsiness detection.</p>
              
              <p className="text-gray-300 mb-2 font-semibold">Request Body:</p>
              <div className="relative mb-4">
                <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-xl text-green-400 overflow-x-auto text-sm">
                  <code>
{`{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..." // or just base64 string
}`}
                  </code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(`{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}`, 'base64-request')}
                  className="absolute top-3 right-3 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied['base64-request'] ? 
                    <Check size={18} className="text-green-400" /> : 
                    <Copy size={18} className="text-white" />
                  }
                </button>
              </div>

              <p className="text-gray-300 mb-2 font-semibold">Example using JavaScript Fetch:</p>
              <div className="relative">
                <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-xl text-green-400 overflow-x-auto text-sm">
                  <code>
{`const imageBase64 = canvas.toDataURL('image/jpeg', 0.7);

const response = await fetch('https://api.okdriver.com/api/detect-base64', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image: imageBase64
  })
});

const result = await response.json();
console.log(result);`}
                  </code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(`const imageBase64 = canvas.toDataURL('image/jpeg', 0.7);

const response = await fetch('https://api.okdriver.com/api/detect-base64', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image: imageBase64
  })
});

const result = await response.json();
console.log(result);`, 'base64-example')}
                  className="absolute top-3 right-3 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied['base64-example'] ? 
                    <Check size={18} className="text-green-400" /> : 
                    <Copy size={18} className="text-white" />
                  }
                </button>
              </div>
            </div>

            {/* Response Format */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-white flex items-center">
                📋 Response Format
              </h4>
              <p className="text-gray-300 mb-4">Successful detection response:</p>
              <div className="relative">
                <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-xl text-green-400 overflow-x-auto text-sm">
                  <code>
{`{
  "success": true,
  "face_detected": true,
  "status": "ALERT" | "YAWNING" | "DROWSY" | "CRITICAL",
  "alert_level": 0-4,
  "message": "User is alert",
  "metrics": {
    "ear": 0.350,
    "mar": 0.250,
    "cnn_confidence": 0.95,
    "cnn_prediction": "alert" | "drowsy",
    "rf_prediction": "alert" | "drowsy"
  },
  "analysis": {
    "eyes_closed": false,
    "mouth_open": false,
    "ear_threshold": 0.25,
    "mar_threshold": 0.5
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}`}
                  </code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(`{
  "success": true,
  "face_detected": true,
  "status": "ALERT" | "YAWNING" | "DROWSY" | "CRITICAL",
  "alert_level": 0-4,
  "message": "User is alert",
  "metrics": {
    "ear": 0.350,
    "mar": 0.250,
    "cnn_confidence": 0.95,
    "cnn_prediction": "alert" | "drowsy",
    "rf_prediction": "alert" | "drowsy"
  },
  "analysis": {
    "eyes_closed": false,
    "mouth_open": false,
    "ear_threshold": 0.25,
    "mar_threshold": 0.5
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}`, 'response-format')}
                  className="absolute top-3 right-3 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied['response-format'] ? 
                    <Check size={18} className="text-green-400" /> : 
                    <Copy size={18} className="text-white" />
                  }
                </button>
              </div>
            </div>

            {/* WebSocket Connection */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-white flex items-center">
                🔌 WebSocket: Real-time Detection
              </h4>
              <p className="text-gray-300 mb-2">
                <span className="font-bold text-purple-400">WebSocket</span>{' '}
                <code className="backdrop-blur-xl bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-white">
                  /ws
                </code>
              </p>
              <p className="text-gray-300 mb-4">Connect via WebSocket for continuous real-time frame detection with state tracking.</p>
              
              <p className="text-gray-300 mb-2 font-semibold mt-4">Connection URL:</p>
              <div className="relative mb-4">
                <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-xl text-green-400 overflow-x-auto text-sm">
                  <code>
{`// Include API key in query parameter
ws://localhost:8001/ws?api_key=YOUR_API_KEY

// Or using headers (if supported by your WebSocket library)
ws://localhost:8001/ws
Headers: {
  "x-api-key": "YOUR_API_KEY"
  // or
  "Authorization": "Bearer YOUR_API_KEY"
}`}
                  </code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(`ws://localhost:8001/ws?api_key=YOUR_API_KEY`, 'ws-url')}
                  className="absolute top-3 right-3 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied['ws-url'] ? 
                    <Check size={18} className="text-green-400" /> : 
                    <Copy size={18} className="text-white" />
                  }
                </button>
              </div>

              <p className="text-gray-300 mb-2 font-semibold">Complete WebSocket Example:</p>
              <div className="relative">
                <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-xl text-green-400 overflow-x-auto text-sm max-h-96">
                  <code>
{`// Connect to WebSocket with API key
const API_KEY = 'your_api_key_here';
const ws = new WebSocket(\`ws://localhost:8001/ws?api_key=\${API_KEY}\`);

// Connection opened
ws.onopen = function() {
  console.log('✅ Connected and authenticated');
  
  setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      const frameData = captureFrameFromCamera();
      ws.send(JSON.stringify({
        type: 'frame',
        data: frameData
      }));
    }
  }, 200);
};

// Receive detection results
ws.onmessage = function(event) {
  const message = JSON.parse(event.data);
  
  if (message.type === 'detection_result') {
    const result = message.data;
    console.log('Status:', result.status);
    console.log('EAR:', result.metrics.ear);
    console.log('Alert Level:', result.alert_level);
    
    if (result.alert_level >= 3) {
      alert('Drowsiness detected!');
    }
  }
};

ws.onerror = function(error) {
  console.error('WebSocket error:', error);
};

ws.onclose = function(event) {
  console.log('Disconnected:', event.code);
};`}
                  </code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(`const API_KEY = 'your_api_key_here';
const ws = new WebSocket(\`ws://localhost:8001/ws?api_key=\${API_KEY}\`);

ws.onopen = function() {
  console.log('✅ Connected and authenticated');
  
  setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      const frameData = captureFrameFromCamera();
      ws.send(JSON.stringify({
        type: 'frame',
        data: frameData
      }));
    }
  }, 200);
};

ws.onmessage = function(event) {
  const message = JSON.parse(event.data);
  
  if (message.type === 'detection_result') {
    const result = message.data;
    console.log('Status:', result.status);
  }
};`, 'websocket-complete')}
                  className="absolute top-3 right-3 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied['websocket-complete'] ? 
                    <Check size={18} className="text-green-400" /> : 
                    <Copy size={18} className="text-white" />
                  }
                </button>
              </div>
            </div>

            {/* Health Check */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-white flex items-center">
                🏥 Health Check
              </h4>
              <p className="text-gray-300 mb-2">
                <span className="font-bold text-green-400">GET</span>{' '}
                <code className="backdrop-blur-xl bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-white">
                  /health
                </code>
              </p>
              <p className="text-gray-300 mb-4">Check API status and model availability (no authentication required).</p>
              <div className="relative">
                <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-xl text-green-400 overflow-x-auto text-sm">
                  <code>
{`fetch('https://api.okdriver.com/health')
  .then(res => res.json())
  .then(data => console.log(data));

// Response:
{
  "status": "healthy",
  "port": 8001,
  "models": {
    "tflite": true,
    "random_forest": true,
    "mediapipe": true
  }
}`}
                  </code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(`fetch('https://api.okdriver.com/health')
  .then(res => res.json())
  .then(data => console.log(data));`, 'health-check')}
                  className="absolute top-3 right-3 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied['health-check'] ? 
                    <Check size={18} className="text-green-400" /> : 
                    <Copy size={18} className="text-white" />
                  }
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Sparkles className="w-8 h-8 mr-3 text-blue-400" />
              OkDriver Assistant API
            </h3>
            
            {/* Authentication */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-white flex items-center">
                🔐 Authentication
              </h4>
              <p className="text-gray-300 mb-4">
                All API requests require authentication. Include your API key using one of these methods:
              </p>
              <div className="relative">
                <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-xl text-green-400 overflow-x-auto text-sm">
                  <code>
{`// Method 1: Authorization header (Bearer token)
Authorization: Bearer YOUR_API_KEY

// Method 2: Custom header
x-api-key: YOUR_API_KEY`}
                  </code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(`// Method 1: Authorization header (Bearer token)
Authorization: Bearer YOUR_API_KEY

// Method 2: Custom header
x-api-key: YOUR_API_KEY`, 'assistant-auth')}
                  className="absolute top-3 right-3 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied['assistant-auth'] ? 
                    <Check size={18} className="text-green-400" /> : 
                    <Copy size={18} className="text-white" />
                  }
                </button>
              </div>
            </div>

            {/* Chat Endpoint */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-white flex items-center">
                💬 Endpoint: Chat with OkDriver Assistant
              </h4>
              <p className="text-gray-300 mb-2">
                <span className="font-bold text-blue-400">POST</span>{' '}
                <code className="backdrop-blur-xl bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-white">
                  /api/chat
                </code>
              </p>
              <p className="text-gray-300 mb-4">Send a message to the OkDriver Assistant and get an AI-powered response with text-to-speech audio.</p>
              
              <p className="text-gray-300 mb-2 font-semibold">Request Body:</p>
              <div className="relative mb-4">
                <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-xl text-green-400 overflow-x-auto text-sm">
                  <code>
{`{
  "message": "What's the weather like today?"
}`}
                  </code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(`{
  "message": "What's the weather like today?"
}`, 'assistant-request')}
                  className="absolute top-3 right-3 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied['assistant-request'] ? 
                    <Check size={18} className="text-green-400" /> : 
                    <Copy size={18} className="text-white" />
                  }
                </button>
              </div>

              <p className="text-gray-300 mb-2 font-semibold">Example using JavaScript Fetch:</p>
              <div className="relative mb-4">
                <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-xl text-green-400 overflow-x-auto text-sm">
                  <code>
{`const response = await fetch('https://api.okdriver.com/api/chat', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: 'What\\'s the weather like today?'
  })
});

const result = await response.json();
console.log('Reply:', result.reply);
console.log('Audio URL:', result.audioUrl);`}
                  </code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(`const response = await fetch('https://api.okdriver.com/api/chat', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: 'What\\'s the weather like today?'
  })
});

const result = await response.json();
console.log('Reply:', result.reply);
console.log('Audio URL:', result.audioUrl);`, 'assistant-example')}
                  className="absolute top-3 right-3 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied['assistant-example'] ? 
                    <Check size={18} className="text-green-400" /> : 
                    <Copy size={18} className="text-white" />
                  }
                </button>
              </div>

              <p className="text-gray-300 mb-2 font-semibold">Response Format:</p>
              <div className="relative">
                <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-xl text-green-400 overflow-x-auto text-sm">
                  <code>
{`{
  "reply": "Bro, aaj weather bahut accha hai! ☀️ Clear skies hai...",
  "audioUrl": "https://api.okdriver.com/uploads/reply_1234567890.mp3"
}`}
                  </code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(`{
  "reply": "Bro, aaj weather bahut accha hai! ☀️ Clear skies hai...",
  "audioUrl": "https://api.okdriver.com/uploads/reply_1234567890.mp3"
}`, 'assistant-response')}
                  className="absolute top-3 right-3 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied['assistant-response'] ? 
                    <Check size={18} className="text-green-400" /> : 
                    <Copy size={18} className="text-white" />
                  }
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-white flex items-center">
                ✨ Features
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">●</span>
                  <div>
                    <strong className="text-white">AI-Powered Responses:</strong> Uses advanced LLM for intelligent, contextual replies
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">●</span>
                  <div>
                    <strong className="text-white">Hinglish Support:</strong> Understands and responds in Hindi-English mix
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">●</span>
                  <div>
                    <strong className="text-white">Text-to-Speech:</strong> Automatically generates MP3 audio file for each response
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">●</span>
                  <div>
                    <strong className="text-white">Friendly Personality:</strong> Casual, supportive, and motivational responses
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">●</span>
                  <div>
                    <strong className="text-white">Multiple Capabilities:</strong> Driving, navigation, vehicle care, food stops, safety, emergencies
                  </div>
                </li>
              </ul>
            </div>

            {/* Example Use Cases */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-white flex items-center">
                📝 Example Use Cases
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2 text-white">1. Navigation Query:</p>
                  <div className="relative">
                    <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-3 rounded-xl text-green-400 overflow-x-auto text-sm">
                      <code>
{`{
  "message": "Where is the nearest petrol pump?"
}`}
                      </code>
                    </pre>
                    <button 
                      onClick={() => copyToClipboard(`{
  "message": "Where is the nearest petrol pump?"
}`, 'use-case-1')}
                      className="absolute top-2 right-2 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                      title="Copy to clipboard"
                    >
                      {copied['use-case-1'] ? 
                        <Check size={16} className="text-green-400" /> : 
                        <Copy size={16} className="text-white" />
                      }
                    </button>
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-2 text-white">2. Vehicle Care:</p>
                  <div className="relative">
                    <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-3 rounded-xl text-green-400 overflow-x-auto text-sm">
                      <code>
{`{
  "message": "When should I get my vehicle serviced?"
}`}
                      </code>
                    </pre>
                    <button 
                      onClick={() => copyToClipboard(`{
  "message": "When should I get my vehicle serviced?"
}`, 'use-case-2')}
                      className="absolute top-2 right-2 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                      title="Copy to clipboard"
                    >
                      {copied['use-case-2'] ? 
                        <Check size={16} className="text-green-400" /> : 
                        <Copy size={16} className="text-white" />
                      }
                    </button>
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-2 text-white">3. Safety Alert:</p>
                  <div className="relative">
                    <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-3 rounded-xl text-green-400 overflow-x-auto text-sm">
                      <code>
{`{
  "message": "I'm feeling sleepy, what should I do?"
}`}
                      </code>
                    </pre>
                    <button 
                      onClick={() => copyToClipboard(`{
  "message": "I'm feeling sleepy, what should I do?"
}`, 'use-case-3')}
                      className="absolute top-2 right-2 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                      title="Copy to clipboard"
                    >
                      {copied['use-case-3'] ? 
                        <Check size={16} className="text-green-400" /> : 
                        <Copy size={16} className="text-white" />
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Example with Audio Playback */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-white flex items-center">
                🎵 Complete Example with Audio Playback
              </h4>
              <div className="relative">
                <pre className="backdrop-blur-xl bg-black/50 border border-white/10 p-4 rounded-xl text-green-400 overflow-x-auto text-sm max-h-96">
                  <code>
{`async function chatWithOkDriver(message) {
  const response = await fetch('https://api.okdriver.com/api/chat', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    throw new Error('Chat request failed');
  }

  const data = await response.json();
  
  // Display text reply
  console.log('OkDriver says:', data.reply);
  
  // Play audio response
  const audio = new Audio(data.audioUrl);
  audio.play().catch(err => {
    console.error('Error playing audio:', err);
  });
  
  return data;
}

// Usage
chatWithOkDriver('Kya weather acha hai aaj?')
  .then(data => {
    console.log('Audio playing from:', data.audioUrl);
  })
  .catch(error => {
    console.error('Error:', error);
  });`}
                  </code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(`async function chatWithOkDriver(message) {
  const response = await fetch('https://api.okdriver.com/api/chat', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  console.log('OkDriver says:', data.reply);
  
  const audio = new Audio(data.audioUrl);
  audio.play();
  
  return data;
}`, 'assistant-complete')}
                  className="absolute top-3 right-3 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied['assistant-complete'] ? 
                    <Check size={18} className="text-green-400" /> : 
                    <Copy size={18} className="text-white" />
                  }
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -100%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}