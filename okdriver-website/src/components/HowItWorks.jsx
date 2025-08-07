'use client';
import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Play, Shield, Star, ArrowRight, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      id: 1,
      icon: Download,
      title: 'Download the App',
      description: 'Get okDriver from the Play Store on your Android phone.',
      color: 'from-blue-500 to-cyan-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500'
    },
    {
      id: 2,
      icon: Smartphone,
      title: 'Mount the Phone',
      description: 'Place your phone on the dashboard facing forward (like a dashcam).',
      color: 'from-green-500 to-emerald-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500'
    },
    {
      id: 3,
      icon: Play,
      title: 'Hit Start',
      description: 'Open okDriver and press "Start" – your co-pilot is now on duty.',
      color: 'from-purple-500 to-pink-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500'
    },
    {
      id: 4,
      icon: Shield,
      title: 'Drive with Support',
      description: 'The app records video and monitors you; you get real-time safety alerts, voice assistant help, and recordings.',
      color: 'from-orange-500 to-red-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveStep((prev) => (prev === 4 ? 1 : prev + 1));
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            How It Works
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Steps Container */}
        <div className="relative mb-16">
          {/* Progress Line */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-0.5 bg-gray-800 hidden md:block">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-green-500 via-purple-500 to-orange-500 transition-all duration-1000 ease-in-out"
              style={{ width: `${((activeStep - 1) / 3) * 100}%` }}
            ></div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = activeStep === step.id;
              const isPassed = activeStep > step.id;
              
              return (
                <div
                  key={step.id}
                  className={`group cursor-pointer transition-all duration-500 transform ${
                    isActive 
                      ? 'scale-105' 
                      : isAnimating && activeStep === step.id 
                        ? 'scale-95' 
                        : 'hover:scale-102'
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  {/* Step Card */}
                  <div className={`relative p-6 rounded-2xl border-2 transition-all duration-500 overflow-hidden ${
                    isActive 
                      ? `${step.borderColor} shadow-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90` 
                      : isPassed
                        ? 'border-gray-600 bg-gray-900/80'
                        : 'border-gray-800 bg-gray-900/60 hover:border-gray-600'
                  }`}>
                    {/* Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 transition-opacity duration-500 ${
                      isActive ? 'opacity-5' : ''
                    }`}></div>
                    
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-center mb-4">
                      <div className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? `bg-gradient-to-br ${step.color} shadow-xl` 
                          : isPassed
                            ? 'bg-gray-700'
                            : 'bg-gray-800 group-hover:bg-gray-700'
                      }`}>
                        {isPassed && !isActive ? (
                          <CheckCircle className="w-8 h-8 text-green-400" />
                        ) : (
                          <IconComponent className={`w-8 h-8 transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-gray-400'
                          }`} />
                        )}
                        
                        {/* Step Number */}
                        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-white text-black' 
                            : isPassed
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-700 text-gray-300'
                        }`}>
                          {step.id}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 ${
                        isActive ? 'text-white' : isPassed ? 'text-gray-200' : 'text-gray-300'
                      }`}>
                        {step.title}
                      </h3>
                      
                      <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                        isActive ? 'text-gray-200' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className={`absolute inset-2 rounded-xl bg-gradient-to-br ${step.color} opacity-10 animate-pulse`}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                      </div>
                    )}

                    {/* Arrow for desktop */}
                    {index < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-gray-600">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="relative">
          {/* Upgrade CTA */}
          <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-3xl p-8 border border-green-500/20 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Want more? <span className="text-blue-400">Upgrade to Premium</span> or try our <span className="text-green-400">hardware device</span> for full protection.
                </h3>
                <p className="text-gray-300 text-sm">
                  No expensive hardware. No complex setup.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
              <h4 className="text-lg font-semibold text-white mb-4">Key Benefits</h4>
              <ul className="space-y-3">
                {[
                  'Real-time safety monitoring',
                  'Voice assistant integration', 
                  'Automatic incident recording',
                  'Fleet management tools'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
              <h4 className="text-lg font-semibold text-white mb-4">Compatible Devices</h4>
              <ul className="space-y-3">
                {[
                  'Android smartphones (5.0+)',
                  'Works with any vehicle type',
                  'No additional hardware required',
                  'Cloud & offline capabilities'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;