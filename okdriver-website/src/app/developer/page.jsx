'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Code, BookOpen, Zap, Shield, Globe, Smartphone, Database, Cloud, Terminal, Users, Settings, BarChart3, ArrowRight } from 'lucide-react';

export default function DeveloperPage() {
  const [activeTab, setActiveTab] = useState('dms');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const documentationRef = useRef(null);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGetApiKey = () => {
    window.location.href = '/user/login';
  };

  const handleViewDocumentation = () => {
    documentationRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const apiTabs = [
    { id: 'dms', label: 'DMS API', icon: Database },
    { id: 'assistant', label: 'OKDriver Assistant', icon: Users },
    { id: 'integration', label: 'Integration Guide', icon: Settings }
  ];

  const dmsEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/detect-image',
      description: 'Upload an image file for drowsiness detection. Supports JPG, PNG, WebP formats.',
      params: ['file (multipart/form-data)'],
      example: {
        file: '[Image file via FormData]'
      }
    },
    {
      method: 'POST',
      endpoint: '/api/detect-base64',
      description: 'Send base64 encoded image for drowsiness detection',
      params: ['image (base64 string)'],
      example: {
        image: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'
      }
    },
    {
      method: 'WebSocket',
      endpoint: '/ws',
      description: 'Real-time continuous frame detection with state tracking. Send frames for continuous monitoring.',
      params: ['api_key (query param or header)'],
      example: {
        connection: 'ws://localhost:8001/ws?api_key=YOUR_API_KEY',
        messageTypes: ['frame', 'ping', 'reset']
      }
    },
    {
      method: 'GET',
      endpoint: '/health',
      description: 'Check API health and model availability (no authentication required)',
      params: [],
      example: {}
    }
  ];

  const assistantEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/chat',
      description: 'Chat with OkDriver Assistant. Get AI-powered responses with text-to-speech audio. Supports Hinglish (Hindi-English).',
      params: ['message'],
      example: {
        message: 'What\'s the weather like today?'
      }
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'API Key Authentication',
      description: 'Secure API key-based authentication with subscription validation'
    },
    {
      icon: Zap,
      title: 'Real-time WebSocket',
      description: 'WebSocket support for continuous real-time drowsiness detection with state tracking'
    },
    {
      icon: Globe,
      title: 'RESTful API',
      description: 'Standard REST endpoints for image upload and base64 detection'
    },
    {
      icon: Smartphone,
      title: 'AI Assistant',
      description: 'OkDriver Assistant with Hinglish support and text-to-speech audio responses'
    }
  ];

  const integrationLanguages = [
    {
      name: 'JavaScript',
      description: 'Easy integration with modern web applications using Fetch API or Axios',
      icon: '🟨',
      difficulty: 'Easy'
    },
    {
      name: 'Python',
      description: 'Simple integration with requests library for backend applications',
      icon: '🐍',
      difficulty: 'Easy'
    },
    {
      name: 'Java',
      description: 'Integrate using HttpClient or OkHttp for enterprise applications',
      icon: '☕',
      difficulty: 'Medium'
    }
  ];

  const codeExample = `// Example: Integrating DMS API
const API_BASE_URL = 'https://api.okdriver.com';
const API_KEY = 'your_api_key_here';

// 1. Image Upload Detection
const detectDrowsinessImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  
  const response = await fetch(\`\${API_BASE_URL}/api/detect-image\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`
    },
    body: formData
  });
  
  const result = await response.json();
  console.log('Detection result:', result);
  return result;
};

// 2. Base64 Image Detection
const detectDrowsinessBase64 = async (base64Image) => {
  const response = await fetch(\`\${API_BASE_URL}/api/detect-base64\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image: base64Image })
  });
  
  const result = await response.json();
  return result;
};

// 3. WebSocket Real-time Detection
const connectWebSocket = () => {
  const ws = new WebSocket(\`ws://localhost:8001/ws?api_key=\${API_KEY}\`);
  
  ws.onopen = () => {
    console.log('Connected to WebSocket');
    // Send frames every 200ms
    setInterval(() => {
      const frame = captureCameraFrame(); // base64 image
      ws.send(JSON.stringify({ type: 'frame', data: frame }));
    }, 200);
  };
  
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'detection_result') {
      console.log('Status:', message.data.status);
      if (message.data.alert_level >= 3) {
        alert('Drowsiness detected!');
      }
    }
  };
  
  return ws;
};

// 4. OkDriver Assistant Chat
const chatWithAssistant = async (message) => {
  const response = await fetch(\`\${API_BASE_URL}/api/chat\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });
  
  const data = await response.json();
  console.log('Reply:', data.reply);
  
  // Play audio response
  const audio = new Audio(data.audioUrl);
  audio.play();
  
  return data;
};`;

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

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center transform transition-all duration-1000" style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
          }}>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-pulse">
              Developer <span className="text-white">Portal</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Integrate OKDriver's powerful APIs into your applications. Build amazing driver management and assistant features.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={handleGetApiKey}
                className="group relative bg-white text-black px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  <Code className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                  Get API Key
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button 
                onClick={handleViewDocumentation}
                className="group relative border-2 border-white/20 backdrop-blur-md bg-white/5 text-white px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                  View Documentation
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-white/10 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 border border-white/10 rounded-lg animate-spin" style={{ animationDuration: '10s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 transform transition-all duration-700" style={{
            opacity: isLoaded ? 1 : 0,
          }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful API Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to build comprehensive driver management solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/30 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 cursor-pointer"
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <feature.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 transition-colors group-hover:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Documentation Section */}
      <section ref={documentationRef} className="py-20 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              API Documentation
            </h2>
            <p className="text-xl text-gray-400">
              Explore our comprehensive API endpoints and integration guides
            </p>
          </div>

          {/* API Tabs - Glass Effect */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="border-b border-white/10">
              <nav className="flex">
                {apiTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-5 text-sm font-medium transition-all duration-300 cursor-pointer ${
                      activeTab === tab.id
                        ? 'text-white bg-white/10 border-b-2 border-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className={`w-5 h-5 inline mr-2 transition-transform ${activeTab === tab.id ? 'scale-110' : ''}`} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-8">
              {/* DMS API Tab */}
              {activeTab === 'dms' && (
                <div className="animate-fadeIn">
                  <h3 className="text-3xl font-bold text-white mb-8">DMS API Endpoints</h3>
                  <div className="space-y-6">
                    {dmsEndpoints.map((endpoint, index) => (
                      <div key={index} className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] cursor-pointer">
                        <div className="flex items-center mb-4">
                          <span className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                            endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            endpoint.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            endpoint.method === 'WebSocket' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                            'bg-red-500/20 text-red-400 border border-red-500/30'
                          } group-hover:scale-110`}>
                            {endpoint.method}
                          </span>
                          <code className="ml-4 text-lg font-mono text-white group-hover:text-gray-200 transition-colors">
                            {endpoint.endpoint}
                          </code>
                        </div>
                        <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">{endpoint.description}</p>
                        <div className="mb-4">
                          <h4 className="font-semibold text-white mb-3">Parameters:</h4>
                          <div className="flex flex-wrap gap-2">
                            {endpoint.params.map((param, paramIndex) => (
                              <span key={paramIndex} className="px-3 py-1 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-lg text-sm hover:bg-white/20 transition-all cursor-pointer">
                                {param}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-3">Example Request:</h4>
                          <pre className="backdrop-blur-xl bg-black/50 border border-white/10 text-green-400 p-4 rounded-xl overflow-x-auto hover:border-white/30 transition-all">
                            <code>{JSON.stringify(endpoint.example, null, 2)}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assistant API Tab */}
              {activeTab === 'assistant' && (
                <div className="animate-fadeIn">
                  <h3 className="text-3xl font-bold text-white mb-8">OKDriver Assistant API</h3>
                  <div className="space-y-6">
                    {assistantEndpoints.map((endpoint, index) => (
                      <div key={index} className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] cursor-pointer">
                        <div className="flex items-center mb-4">
                          <span className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                            endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          } group-hover:scale-110`}>
                            {endpoint.method}
                          </span>
                          <code className="ml-4 text-lg font-mono text-white group-hover:text-gray-200 transition-colors">
                            {endpoint.endpoint}
                          </code>
                        </div>
                        <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">{endpoint.description}</p>
                        <div className="mb-4">
                          <h4 className="font-semibold text-white mb-3">Parameters:</h4>
                          <div className="flex flex-wrap gap-2">
                            {endpoint.params.map((param, paramIndex) => (
                              <span key={paramIndex} className="px-3 py-1 backdrop-blur-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-lg text-sm hover:bg-purple-500/20 transition-all cursor-pointer">
                                {param}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-3">Example Request:</h4>
                          <pre className="backdrop-blur-xl bg-black/50 border border-white/10 text-green-400 p-4 rounded-xl overflow-x-auto hover:border-white/30 transition-all">
                            <code>{JSON.stringify(endpoint.example, null, 2)}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Integration Guide Tab */}
              {activeTab === 'integration' && (
                <div className="animate-fadeIn">
                  <h3 className="text-3xl font-bold text-white mb-8">Integration Guide</h3>
                  <div className="space-y-6">
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
                      <h4 className="text-2xl font-semibold text-white mb-6 flex items-center">
                        <Zap className="w-6 h-6 mr-3 text-yellow-400" />
                        Quick Start
                      </h4>
                      <ol className="space-y-4 text-gray-300">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-3 font-bold">1</span>
                          <span>Register for an API key at our developer portal</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-3 font-bold">2</span>
                          <span>Choose your preferred programming language</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-3 font-bold">3</span>
                          <span>Authenticate using your API key</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-3 font-bold">4</span>
                          <span>Start making API calls to integrate driver management</span>
                        </li>
                      </ol>
                    </div>
                    
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                      <h4 className="text-2xl font-semibold text-white mb-6 flex items-center">
                        <Code className="w-6 h-6 mr-3 text-blue-400" />
                        Code Example
                      </h4>
                      <pre className="backdrop-blur-xl bg-black/50 border border-white/10 text-green-400 p-6 rounded-xl overflow-x-auto hover:border-white/30 transition-all">
                        <code>{codeExample}</code>
                      </pre>
                    </div>

                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                      <h4 className="text-2xl font-semibold text-white mb-6 flex items-center">
                        <Globe className="w-6 h-6 mr-3 text-green-400" />
                        Language Support
                      </h4>
                      <p className="text-gray-300 mb-6">
                        OKDriver API can be easily integrated with any programming language that supports HTTP requests. Here are the most common languages:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {integrationLanguages.map((lang, i) => (
                          <div key={i} className="group backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                            <div className="text-5xl mb-4 text-center">{lang.icon}</div>
                            <h5 className="font-semibold text-white text-xl mb-2 text-center">{lang.name}</h5>
                            <p className="text-sm text-gray-400 mb-3 text-center group-hover:text-gray-300 transition-colors">
                              {lang.description}
                            </p>
                            <div className="flex justify-center">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                lang.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                              }`}>
                                {lang.difficulty}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-10 text-gray-400 max-w-2xl mx-auto">
              Join thousands of developers building amazing driver management solutions with OKDriver APIs
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={handleGetApiKey}
                className="group relative bg-white text-black px-10 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  <Cloud className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                  Start Building
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
                </span>
              </button>
              <button className="group relative border-2 border-white/20 backdrop-blur-md bg-white/5 text-white px-10 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 cursor-pointer">
                <span className="relative z-10 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                  View Analytics
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}