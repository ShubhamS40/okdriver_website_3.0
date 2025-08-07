'use client'
import React, { useState, useEffect } from 'react';
import { Camera, AlertTriangle, Eye, Activity, MapPin, Zap, Play, Pause } from 'lucide-react';

const Hardware = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [isDeviceActive, setIsDeviceActive] = useState(false);
  const [animationState, setAnimationState] = useState('idle');

  const features = [
    {
      id: 'dashcam',
      icon: Camera,
      title: 'Dual Dashcam',
      description: 'Front and rear camera support in one compact unit',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'sos',
      icon: AlertTriangle,
      title: 'Real-Time SOS Button',
      description: 'One-tap emergency button for instant alerts',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'assistant',
      icon: Eye,
      title: 'Integrated okDriver Assistant',
      description: 'Voice assistant built into the device with onboard speaker',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'monitoring',
      icon: Activity,
      title: 'Driver Monitoring System',
      description: 'Works 24/7 to detect fatigue and distraction',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'detection',
      icon: MapPin,
      title: 'Pothole & Road Detection',
      description: 'Monitor road quality and alert fleet managers',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'alerts',
      icon: Zap,
      title: 'Traffic Violation Alerts',
      description: 'Notices if driver runs red light or speeds',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isDeviceActive) {
        setAnimationState(prev => prev === 'pulse' ? 'glow' : 'pulse');
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isDeviceActive]);

  const toggleDevice = () => {
    setIsDeviceActive(!isDeviceActive);
    if (!isDeviceActive) {
      setAnimationState('pulse');
    } else {
      setAnimationState('idle');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          okDriver Hardware Device
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          For larger fleets and advanced users, okDriver is developing a plug-and-play hardware device with edge-cloud capabilities.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Features Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-8">Hardware Features</h2>
          
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isActive = activeFeature === feature.id;
            
            return (
              <div
                key={feature.id}
                className={`group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  isActive ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
                onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
              >
                <div className={`p-6 rounded-xl border transition-all duration-300 ${
                  isActive 
                    ? 'border-white bg-gradient-to-r ' + feature.color + ' shadow-2xl' 
                    : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg transition-all duration-300 ${
                      isActive ? 'bg-white/20' : 'bg-gray-800'
                    }`}>
                      <IconComponent className={`w-6 h-6 transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-300'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm transition-all duration-300 ${
                        isActive ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Data Processing Info */}
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <h3 className="font-semibold text-white">Data Processing</h3>
            </div>
            <p className="text-gray-400 text-sm">
              All data is processed on device for instant alerts and securely in the cloud for analytics and integrations.
            </p>
          </div>
        </div>

        {/* Device Visualization */}
        <div className="flex flex-col items-center space-y-8">
          <div className="relative">
            {/* Device Frame */}
            <div className={`relative w-80 h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 transition-all duration-500 ${
              isDeviceActive ? 'border-blue-400 shadow-2xl shadow-blue-400/20' : 'border-gray-600'
            }`}>
              {/* Status LEDs */}
              <div className="absolute top-4 left-4 flex space-x-2">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isDeviceActive ? 'bg-red-500 animate-pulse' : 'bg-gray-600'
                }`}></div>
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isDeviceActive ? 'bg-green-500' : 'bg-gray-600'
                }`}></div>
              </div>

              {/* Brand Label */}
              <div className="absolute top-4 right-4 text-xs text-gray-400">
                okDriver Pro
              </div>

              {/* Main Screen */}
              <div className="absolute inset-6 top-12 bg-black rounded-lg border border-gray-700 overflow-hidden">
                <div className={`w-full h-full flex items-center justify-center transition-all duration-500 ${
                  animationState === 'pulse' ? 'animate-pulse' : 
                  animationState === 'glow' ? 'shadow-inner shadow-blue-400/30' : ''
                }`}>
                  {isDeviceActive ? (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center animate-spin">
                        <Activity className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-green-400 text-sm font-mono">MONITORING ACTIVE</div>
                    </div>
                  ) : (
                    <Camera className="w-12 h-12 text-gray-600" />
                  )}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="absolute bottom-4 left-6 right-6 flex justify-between">
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-all duration-200 transform hover:scale-105">
                  DMS
                </button>
                <button 
                  onClick={toggleDevice}
                  className={`px-6 py-2 rounded transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 ${
                    isDeviceActive 
                      ? 'bg-red-600 hover:bg-red-500 text-white' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {isDeviceActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span className="text-xs">{isDeviceActive ? 'STOP' : 'START'}</span>
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-all duration-200 transform hover:scale-105">
                  SOS
                </button>
              </div>

              {/* Device Label */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="bg-white text-black px-4 py-1 rounded text-xs font-semibold">
                  Professional Hardware Device
                </div>
              </div>
            </div>
          </div>

          {/* Pilot Program Button */}
          <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <span>Join the Pilot Program</span>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            </div>
          </button>

          {/* Status Indicator */}
          <div className={`flex items-center space-x-3 transition-all duration-300 ${
            isDeviceActive ? 'opacity-100' : 'opacity-50'
          }`}>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              isDeviceActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
            }`}></div>
            <span className="text-sm text-gray-400">
              Device Status: {isDeviceActive ? 'Active' : 'Standby'}
            </span>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="mt-16 text-center">
        <div className="inline-block p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold mb-2 text-white">Ready for Fleet Integration</h3>
          <p className="text-gray-400 text-sm max-w-md">
            Designed for seamless integration with existing fleet management systems and scalable deployment across vehicle fleets of any size.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hardware;