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

  const handlePartnerClick = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="relative min-h-screen md:py-5 bg-gradient-to-br from-black via-gray-500 to-black overflow-hidden">
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
      <div className="absolute inset-0 hidden md:block">
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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 min-h-screen flex items-center py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Content */}
          <div className={`space-y-4 lg:space-y-6 order-2 lg:order-1 lg:mt-[15%] transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            
            {/* Brand Badge */}
            <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 lg:px-4 lg:py-2 rounded-full border border-gray-600/50">
              <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-gray-300" />
              <span className="text-gray-200 text-xs lg:text-sm font-medium">Built for Indian Roads</span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
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
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mt-4 lg:mt-6">
                An AI-powered co-pilot that transforms your smartphone into an intelligent dashcam. 
                Get real-time fatigue alerts, emergency SOS, voice assistance, and advanced safety 
                features designed specifically for Indian driving conditions.
              </p>
            </div>

        {/* Animated Features */}
<div className="grid grid-cols-2 grid-rows-2 gap-3  p-3">
  {features.map((Feature, index) => (
    <div
      key={index}
      className={`flex items-center space-x-2 lg:space-x-3 transition-all duration-500 ${
        currentFeature === index ? 'scale-105 text-white' : 'text-gray-700'
      }`}
    >
      <Feature.icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
      <span className="text-xs lg:text-sm font-medium whitespace-nowrap">
        {Feature.text}
      </span>
    </div>
  ))}
</div>


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 pt-4">
              <a 
                href="https://play.google.com/store/apps/details?id=app.dash.okDriver&pli=1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-semibold text-base lg:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 border border-gray-600"
              >
                <Play className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform" />
                <span>Download App</span>
              </a>
              
              <button 
                onClick={handlePartnerClick}
                className="border-2 border-gray-600 text-gray-200 hover:bg-gray-800/30 px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-semibold text-base lg:text-lg transition-all duration-300 backdrop-blur-sm"
              >
                Partner with us
              </button>
            </div>
          </div>

          {/* Right Side - Enhanced Visual */}
          <div className={`relative order-1 mt-[10%] lg:order-2 flex justify-center lg:justify-end transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            
            {/* Phone Mockup with Dashboard */}
            <div className="relative  md:p-8 max-w-xs sm:max-w-sm lg:max-w-md">
              
              {/* Floating Cards - Hidden on mobile for better layout */}
              <div className="hidden sm:block absolute -top-4 -left-4 lg:-left-8 bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-md border border-gray-500/50 rounded-xl p-3 lg:p-4 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 lg:w-3 lg:h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="text-gray-200 text-xs lg:text-sm font-medium">Driver Alert</span>
                </div>
              </div>

              <div className="hidden sm:block absolute -top-2 -right-8 lg:-right-12 bg-gradient-to-r from-gray-700/70 to-gray-600/70 backdrop-blur-md border border-gray-500/50 rounded-xl p-3 lg:p-4 transform -rotate-2 hover:-rotate-3 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-3 h-3 lg:w-4 lg:h-4 text-gray-300" />
                  <span className="text-gray-200 text-xs lg:text-sm font-medium">SOS Ready</span>
                </div>
              </div>

              {/* Main Phone Container */}
           <div className="relative rounded-3xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.4)] bg-black">
  
    <div className="relative w-64 h-96 sm:w-72 sm:h-[28rem] lg:w-80 lg:h-[32rem] flex items-center justify-center">
      <Image
        src={HomeScreen}
        alt="OkDriver App"
        fill
        style={{ objectFit: "contain" }}
        className="rounded-xl shadow-lg"
      />
    
  </div>
  <div className="absolute -z-10 inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-3xl"></div>
</div>


              {/* Floating Bottom Card */}
              <div className="absolute -bottom-4 lg:-bottom-6 left-2 right-2 lg:left-4 lg:right-4 bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-md border border-gray-500/50 rounded-xl p-3 lg:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-xs lg:text-sm font-medium">OkDriver Assistant</div>
                    <div className="text-gray-400 text-xs">How can I assist you?</div>
                  </div>
                  <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <Mic className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-20 lg:h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default OkDriverHero;