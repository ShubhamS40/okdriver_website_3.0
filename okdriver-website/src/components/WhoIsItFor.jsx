'use client';
import React, { useState } from 'react';
import { Car, Truck, UserCheck, MapPin, GraduationCap, Shield } from 'lucide-react';

const WhoIsItFor = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      id: 'cab-auto',
      icon: Car,
      title: 'Cab & Auto Drivers',
      color: 'from-blue-500 to-cyan-400',
      borderColor: 'border-blue-500',
      shadowColor: 'shadow-blue-500/20'
    },
    {
      id: 'truck-delivery',
      icon: Truck,
      title: 'Truck & Delivery Fleets',
      color: 'from-green-500 to-emerald-400',
      borderColor: 'border-green-500',
      shadowColor: 'shadow-green-500/20'
    },
    {
      id: 'daily-commuters',
      icon: UserCheck,
      title: 'Daily Commuters',
      color: 'from-purple-500 to-pink-400',
      borderColor: 'border-purple-500',
      shadowColor: 'shadow-purple-500/20'
    },
    {
      id: 'solo-trippers',
      icon: MapPin,
      title: 'Solo Road-Trippers',
      color: 'from-orange-500 to-red-400',
      borderColor: 'border-orange-500',
      shadowColor: 'shadow-orange-500/20'
    },
    {
      id: 'school-transport',
      icon: GraduationCap,
      title: 'School Transport',
      color: 'from-yellow-500 to-orange-400',
      borderColor: 'border-yellow-500',
      shadowColor: 'shadow-yellow-500/20'
    },
    {
      id: 'safety-conscious',
      icon: Shield,
      title: 'Safety-Conscious Drivers',
      color: 'from-indigo-500 to-blue-400',
      borderColor: 'border-indigo-500',
      shadowColor: 'shadow-indigo-500/20'
    }
  ];

  return (
    <div className="bg-black text-white py-5 px-6 ">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Who Is It For?
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <div
                key={category.id}
                className={`group relative cursor-pointer transition-all duration-500 transform ${
                  isActive ? 'scale-105' : 'hover:scale-102'
                }`}
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className={`relative p-6 rounded-2xl border-2 transition-all duration-500 overflow-hidden ${
                  isActive 
                    ? `${category.borderColor} shadow-2xl ${category.shadowColor} bg-gradient-to-br from-gray-900/90 to-gray-800/90` 
                    : 'border-gray-800 bg-gray-900/60 hover:border-gray-600'
                }`}>
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity duration-500 ${
                    isActive ? 'opacity-5' : ''
                  }`}></div>
                  
                  {/* Icon Container */}
                  <div className={`relative transition-all duration-500 ${
                    isActive ? 'transform -translate-y-1' : ''
                  }`}>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} p-3 transition-all duration-500 ${
                      isActive ? 'shadow-xl scale-110' : 'group-hover:scale-105'
                    }`}>
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg font-bold transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {category.title}
                  </h3>

                  {/* Animated Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 transition-opacity duration-500 ${
                    isActive ? 'opacity-30' : ''
                  }`} style={{
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    padding: '2px'
                  }}></div>

                  {/* Ripple Effect */}
                  {isActive && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className={`absolute inset-2 rounded-xl bg-gradient-to-br ${category.color} opacity-10 animate-pulse`}></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      

     
      </div>
    </div>
  );
};

export default WhoIsItFor;