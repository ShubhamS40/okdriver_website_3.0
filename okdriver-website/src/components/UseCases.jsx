'use client';
import React, { useState } from 'react';
import { Car, Users, Truck, Globe, User } from 'lucide-react';

const UseCases = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const useCases = [
    {
      id: 'cab-drivers',
      icon: Car,
      title: 'Cab Drivers & Ride-sharing',
      description: 'Dashcam for safety on long trips, plus an AI co-pilot assistant to provide directions, alerts, and even entertainment on the go.',
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      id: 'fleet-operators',
      icon: Users,
      title: 'Fleet Operators',
      description: 'Track driver behavior, get alerts on unsafe driving, and review performance history for each driver.',
      gradient: 'from-purple-600 to-pink-500'
    },
    {
      id: 'logistics',
      icon: Truck,
      title: 'Logistics Companies',
      description: 'Improve visibility of shipments and driver compliance; reduce liability with automatic recording and alerts.',
      gradient: 'from-green-600 to-teal-500'
    },
    {
      id: 'oems',
      icon: Globe,
      title: 'OEMs & Mobility Startups',
      description: 'Offer okDriver as an integrated safety feature in connected vehicles or new mobility products.',
      gradient: 'from-orange-600 to-red-500'
    },
    {
      id: 'commuters',
      icon: User,
      title: 'Individual Daily Commuters',
      description: 'Provide peace of mind with routine dashcam recording and safety monitoring on everyday drives.',
      gradient: 'from-indigo-600 to-purple-500'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-black via-gray-500 to-black text-white py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Use Cases
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            const isHovered = hoveredCard === useCase.id;
            
            return (
              <div
                key={useCase.id}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 transform ${
                  isHovered 
                    ? 'scale-105 border-white shadow-2xl shadow-white/10' 
                    : 'border-gray-800 hover:border-gray-600'
                }`}
                onMouseEnter={() => setHoveredCard(useCase.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 transition-opacity duration-500 ${
                  isHovered ? 'opacity-10' : ''
                }`}></div>
                
                {/* Card Content */}
                <div className="relative p-8 bg-gray-900/80 backdrop-blur-sm h-full">
                  {/* Icon */}
                  <div className={`mb-6 transition-all duration-500 ${
                    isHovered ? 'transform -translate-y-2' : ''
                  }`}>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${useCase.gradient} p-4 transition-all duration-500 ${
                      isHovered ? 'shadow-2xl scale-110' : ''
                    }`}>
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`transition-all duration-500 ${
                    isHovered ? 'transform translate-y-1' : ''
                  }`}>
                    <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                      isHovered ? 'text-white' : 'text-gray-200'
                    }`}>
                      {useCase.title}
                    </h3>
                    
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isHovered ? 'text-gray-200' : 'text-gray-400'
                    }`}>
                      {useCase.description}
                    </p>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${useCase.gradient} opacity-0 transition-opacity duration-500 ${
                    isHovered ? 'opacity-20' : ''
                  }`} style={{ 
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    padding: '2px'
                  }}></div>
                </div>

                {/* Floating particles effect */}
                {isHovered && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping opacity-70"></div>
                    <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block p-6 bg-gradient-to-r from-gray-900 to-black rounded-2xl border border-gray-800">
            <p className="text-gray-300 text-lg">
              Transforming road safety across multiple industries with AI-powered solutions
            </p>
            <div className="mt-4 w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCases;