'use client'
import React, { useState, useEffect } from 'react';
import { Camera, Mic, Eye, AlertTriangle, Wifi, WifiOff, RotateCcw, Cloud, Zap, Shield, Phone, MapPin } from 'lucide-react';

const FeaturesComponent = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedElements, setAnimatedElements] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setAnimatedElements(new Set([0, 1, 2, 3]));
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      id: 0,
      title: "Smart Dashcam",
      icon: <Camera className="w-8 h-8" />,
      bgColor: "bg-blue-50",
      iconColor: "bg-blue-100",
      accentColor: "border-blue-200",
      illustration: (
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 bg-black rounded-lg transform rotate-3 opacity-20"></div>
          <div className="relative bg-black rounded-lg p-3 transform -rotate-1">
            <Camera className="w-10 h-10 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      ),
      features: [
        { text: "Turns any smartphone into a dashcam", icon: <Phone className="w-4 h-4" /> },
        { text: "Works offline — no internet required", icon: <WifiOff className="w-4 h-4" /> },
        { text: "Switch between front or back camera", icon: <RotateCcw className="w-4 h-4" /> },
        { text: "(Future) External Wi-Fi camera support", icon: <Wifi className="w-4 h-4" /> },
        { text: "Free version available (basic), Premium plan for cloud storage", icon: <Cloud className="w-4 h-4" />, highlight: true }
      ]
    },
    {
      id: 1,
      title: "okDriver Assistant",
      icon: <Mic className="w-8 h-8" />,
      bgColor: "bg-green-50",
      iconColor: "bg-green-100",
      accentColor: "border-green-200",
      illustration: (
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="bg-black rounded-full p-4 relative">
            <Mic className="w-8 h-8 text-white" />
            <div className="absolute -inset-2 border-2 border-black rounded-full animate-ping opacity-20"></div>
            <div className="absolute top-1 right-1 flex space-x-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      ),
      features: [
        { text: "Voice-activated AI co-pilot that speaks like a buddy", icon: <Mic className="w-4 h-4" /> },
        { text: "Wake word: &quot;OkDriver&quot; (call to action by voice)", icon: <Zap className="w-4 h-4" /> },
        { text: "Provides traffic updates, nearby fuel stations, jokes, life advice", icon: <MapPin className="w-4 h-4" /> },
        { text: "Keeps drivers alert, engaged, and supported", icon: <Shield className="w-4 h-4" /> }
      ]
    },
    {
      id: 2,
      title: "Driver Monitoring System",
      icon: <Eye className="w-8 h-8" />,
      bgColor: "bg-yellow-50",
      iconColor: "bg-yellow-100",
      accentColor: "border-yellow-200",
      illustration: (
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="bg-black rounded-lg p-3">
            <Eye className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -inset-1 border-2 border-dashed border-black rounded-lg animate-pulse opacity-30"></div>
          <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
            <AlertTriangle className="w-3 h-3 text-black" />
          </div>
        </div>
      ),
      features: [
        { text: "Detects driver drowsiness, phone distraction", icon: <Eye className="w-4 h-4" /> },
        { text: "Monitors inattentive driving patterns", icon: <AlertTriangle className="w-4 h-4" /> },
        { text: "Sends real-time alerts to the driver", icon: <Zap className="w-4 h-4" />, highlight: true },
        { text: "Helps prevent fatigue-related accidents", icon: <Shield className="w-4 h-4" /> }
      ]
    },
    {
      id: 3,
      title: "SOS Emergency Alert",
      icon: <AlertTriangle className="w-8 h-8" />,
      bgColor: "bg-red-50",
      iconColor: "bg-red-100",
      accentColor: "border-red-200",
      illustration: (
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="bg-black rounded-full p-4 relative">
            <AlertTriangle className="w-8 h-8 text-white" />
            <div className="absolute -inset-3 border-4 border-red-500 rounded-full animate-ping"></div>
            <div className="absolute -inset-1 border-2 border-red-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      ),
      features: [
        { text: "Send alerts to emergency contacts immediately", icon: <Phone className="w-4 h-4" /> },
        { text: "Automatic SOS if fatigue or collision detected", icon: <Zap className="w-4 h-4" /> },
        { text: "Provides peace of mind and faster response", icon: <Shield className="w-4 h-4" /> },
        { text: "Works even when driver is unconscious", icon: <AlertTriangle className="w-4 h-4" />, highlight: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-5xl font-bold text-black mb-6">
            Powerful Features for
            <span className="relative ml-3">
              Safer Driving
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-black transform origin-left transition-all duration-1000 delay-500 scale-x-0"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI-powered safety features designed specifically for Indian roads and driving conditions
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform border-2 ${feature.accentColor} ${
                animatedElements.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${
                hoveredCard === feature.id ? 'scale-105 -translate-y-2' : 'hover:scale-102'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-4 right-4 w-20 h-20 border border-black rounded-full transform rotate-12"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 border border-black rounded-lg transform -rotate-12"></div>
              </div>

              {/* Illustration */}
              <div className={`transition-all duration-500 transform ${
                hoveredCard === feature.id ? 'scale-110 -rotate-3' : ''
              }`}>
                {feature.illustration}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-black mb-6 text-center group-hover:text-black transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Features List */}
              <div className="space-y-4">
                {feature.features.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 transform ${
                      hoveredCard === feature.id ? 'translate-x-2' : ''
                    } ${
                      item.highlight ? 'bg-black text-white' : 'hover:bg-gray-50'
                    }`}
                    style={{ transitionDelay: `${idx * 50}ms` }}
                  >
                    <div className={`p-2 rounded-full flex-shrink-0 transition-all duration-300 ${
                      item.highlight 
                        ? 'bg-white text-black' 
                        : hoveredCard === feature.id 
                          ? 'bg-black text-white' 
                          : 'bg-gray-100'
                    }`}>
                      {item.icon}
                    </div>
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      item.highlight ? 'text-white' : 'text-gray-700'
                    }`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-black rounded-3xl transition-all duration-300 pointer-events-none ${
                hoveredCard === feature.id ? 'opacity-5' : 'opacity-0'
              }`}></div>

              {/* Corner Animation */}
              <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-black rounded-tr-3xl transition-all duration-300 ${
                hoveredCard === feature.id ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center mt-20 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="bg-black rounded-3xl p-12 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-lg animate-bounce" style={{ animationDuration: '3s' }}></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white rounded-full animate-pulse"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Experience Safer Driving?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of drivers who trust okDriver to keep them safe on Indian roads
              </p>
              <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Get Started Now
              </button>
            </div>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-black rounded-full animate-float opacity-20" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-gray-400 rounded-full animate-float opacity-30" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
          <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-black rounded-full animate-float opacity-25" style={{ animationDelay: '4s', animationDuration: '7s' }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(20px) rotate(240deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FeaturesComponent;