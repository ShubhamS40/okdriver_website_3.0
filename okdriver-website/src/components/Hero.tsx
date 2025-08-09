'use client'

import React, { useState, useEffect } from 'react';
import { Play, Shield, Smartphone, AlertTriangle, Mic, MapPin } from 'lucide-react';
import HomeScreen from '../../public/assets/home_screen.jpeg'
import Image from 'next/image';

const OkDriverHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: Shield, text: "AI-Powered Safety" },
    { icon: Smartphone, text: "Smart Dashcam" },
    { icon: AlertTriangle, text: "Fatigue Detection" },
    { icon: Mic, text: "Voice Assistant" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[110vh] bg-gradient-to-br from-black via-gray-500 to-black overflow-hidden">
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px'
          }}
        />
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0">
        <div className="grid grid-cols-12 grid-rows-8 h-full opacity-10">
          {Array.from({ length: 96 }).map((_, i) => (
            <div
              key={i}
              className="border border-white/20 animate-pulse"
              style={{
                animationDelay: `${(i % 12) * 0.1}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }} />
        <div className="absolute top-3/4 left-3/4 w-3 h-3 bg-gray-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-gray-200 rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 h-[100vh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content */}
          <div className={`space-y-4 mt-[15%] transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            
            {/* Brand Badge */}
            <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-600/50">
              <MapPin className="w-4 h-4 text-gray-300" />
              <span className="text-gray-200 text-sm font-medium">Built for Indian Roads</span>
            </div>

            {/* Main Heading */}
            <div >
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Drive Safe.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  Drive Smart.
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              
                  With okDriver.
                </span>
             
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                An AI-powered co-pilot that transforms your smartphone into an intelligent dashcam. 
                Get real-time fatigue alerts, emergency SOS, voice assistance, and advanced safety 
                features designed specifically for Indian driving conditions.
              </p>
            </div>

            {/* Animated Features */}
            <div className="flex flex-wrap  items-center  space-x-24">
              {features.map((Feature, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 transition-all duration-500 ${
                    currentFeature === index ? 'scale-110 text-white' : 'text-gray-400'
                  }`}
                >
                  <Feature.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{Feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="group bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3 border border-gray-600">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Download App</span>
              </button>
              
              <button className="border-2 border-gray-600 text-gray-200 hover:bg-gray-800/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                Partner with us
              </button>
            </div>

                    </div>

          {/* Right Side - Enhanced Visual */}
          <div className={`relative transform m-[10%]  p-[10%] transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            
            {/* Phone Mockup with Dashboard */}
            <div className="relative mt-[15%] p-[10%] max-w-md">
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-8 bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-md border border-gray-500/50 rounded-xl p-4 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="text-gray-200 text-sm font-medium">Driver Alert</span>
                </div>
              </div>

              <div className="absolute -top-2 -right-12 bg-gradient-to-r from-gray-700/70 to-gray-600/70 backdrop-blur-md border border-gray-500/50 rounded-xl p-4 transform -rotate-2 hover:-rotate-3 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-gray-300" />
                  <span className="text-gray-200 text-sm font-medium">SOS Ready</span>
                </div>
              </div>

              {/* Main Phone Container */}
              <div className="relative bg-gray-900 rounded-3xl p-3 shadow-2xl border border-gray-700">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
                  
                  <Image
                    src={HomeScreen}
                    alt="okDriver Dashboard"
                    className="w-[40vw] h-[65vh] rounded-2xl"
                    style={{ objectFit: 'fill' }}
                  />
                  </div>
</div>
              {/* Floating Bottom Card */}
             <div className="absolute -bottom-6 left-4 right-4 bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-md border border-gray-500/50 rounded-xl p-4">
  <div className="flex items-center justify-between">
    <div>
      <div className="text-white text-sm font-medium">OkDriver Assistant</div>
      <div className="text-gray-400 text-xs">How can I assist you?</div>
    </div>
    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
      <Mic className="w-4 h-4 text-white" />
    </button>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default OkDriverHero;