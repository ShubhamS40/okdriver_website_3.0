'use client';
import React, { useState, useEffect } from 'react';
import { Award, Globe, Heart, Target, Users, Lightbulb } from 'lucide-react';

const OurVision = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  const visionItems = [
    {
      id: 'affordable',
      icon: Award,
      title: 'Affordable',
      description: 'Road safety tech should be within everyone\'s reach.',
      gradient: 'from-blue-500 to-cyan-400',
      shadowColor: 'shadow-blue-500/20'
    },
    {
      id: 'accessible',
      icon: Globe,
      title: 'Accessible',
      description: 'Easy to use on any smartphone, for any driver.',
      gradient: 'from-purple-500 to-pink-400',
      shadowColor: 'shadow-purple-500/20'
    },
    {
      id: 'human-first',
      icon: Heart,
      title: 'Human-first',
      description: 'Designed with empathy; the co-pilot acts like a friendly companion.',
      gradient: 'from-green-500 to-emerald-400',
      shadowColor: 'shadow-green-500/20'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationTrigger(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white py-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Main Header */}
        <div className="text-center mb-20">
          <h1 className={`text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent transition-all duration-1000 ${
            animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Our Vision
          </h1>
          <div className={`w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 mx-auto rounded-full transition-all duration-1000 delay-200 ${
            animationTrigger ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}></div>
        </div>

        {/* Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {visionItems.map((item, index) => {
            const IconComponent = item.icon;
            const isHovered = hoveredCard === item.id;
            
            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden transition-all duration-700 transform ${
                  animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${
                  isHovered ? 'scale-105' : 'hover:scale-102'
                }`}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                {/* Card Container */}
                <div className={`relative p-8 rounded-3xl border-2 transition-all duration-500 h-full ${
                  isHovered 
                    ? `border-white/30 shadow-2xl ${item.shadowColor} bg-gradient-to-br from-gray-900/90 to-gray-800/90` 
                    : 'border-gray-800 bg-gray-900/60 hover:border-gray-600'
                }`}>
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-500 rounded-3xl ${
                    isHovered ? 'opacity-5' : ''
                  }`}></div>
                  
                  {/* Icon Container */}
                  <div className={`relative mb-8 transition-all duration-500 ${
                    isHovered ? 'transform -translate-y-2' : ''
                  }`}>
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${item.gradient} p-5 transition-all duration-500 ${
                      isHovered ? 'shadow-2xl scale-110 rotate-3' : 'group-hover:scale-105'
                    }`}>
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`text-center transition-all duration-500 ${
                    isHovered ? 'transform translate-y-1' : ''
                  }`}>
                    <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                      isHovered ? 'text-white' : 'text-gray-200'
                    }`}>
                      {item.title}
                    </h3>
                    
                    <p className={`text-base leading-relaxed transition-colors duration-300 ${
                      isHovered ? 'text-gray-200' : 'text-gray-400'
                    }`}>
                      {item.description}
                    </p>
                  </div>

                  {/* Floating Elements */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
                      <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    </div>
                  )}

                  {/* Animated Border */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.gradient} opacity-0 transition-opacity duration-500 ${
                    isHovered ? 'opacity-20' : ''
                  }`} style={{
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    padding: '2px'
                  }}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission Statement Section */}
        <div className={`relative transition-all duration-1000 delay-500 ${
          animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              Mission Statement
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>

          {/* Mission Content */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/50 shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-green-500 to-blue-500 rounded-full blur-3xl"></div>
              </div>

              {/* Mission Text */}
              <div className="relative z-10">
                <p className="text-lg md:text-xl leading-relaxed text-gray-300 text-center mb-8">
                  We're a small team with a big mission — to empower every driver in India with smart, simple tech that protects 
                  lives and builds good habits. Our founder is a techie and innovator (with IoT patents and an AI background) who 
                  believes every road trip should be safe and connected.
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center group">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                      <Target className="w-12 h-12 text-blue-400 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                      <h4 className="text-2xl font-bold text-white mb-2">Smart Tech</h4>
                      <p className="text-gray-400 text-sm">AI-powered safety solutions</p>
                    </div>
                  </div>

                  <div className="text-center group">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                      <Users className="w-12 h-12 text-green-400 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                      <h4 className="text-2xl font-bold text-white mb-2">Every Driver</h4>
                      <p className="text-gray-400 text-sm">Accessible to all in India</p>
                    </div>
                  </div>

                  <div className="text-center group">
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                      <Lightbulb className="w-12 h-12 text-purple-400 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                      <h4 className="text-2xl font-bold text-white mb-2">Innovation</h4>
                      <p className="text-gray-400 text-sm">IoT patents & AI expertise</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-700 ${
          animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-block relative">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 p-1 rounded-2xl">
              <div className="bg-black rounded-2xl px-8 py-4">
                <p className="text-lg text-white font-medium">
                  Building the future of road safety, one driver at a time
                </p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurVision;