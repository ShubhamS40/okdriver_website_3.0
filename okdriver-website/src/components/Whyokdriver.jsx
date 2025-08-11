'use client'
import React, { useState, useEffect } from 'react';
import { Check, Car, Truck, Mic, Settings, Smartphone, Users, Phone } from 'lucide-react';
import saftey_luxry from './../../public/assets/saftey_should_not_beluxry.jpeg'
import Image from 'next/image';
import Link from 'next/link';

const WhyOkDriver = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
     
      text: "No expensive setup — just your phone",
      delay: "0ms"
    },
    {
 
      text: "Made for Indian roads and local driving behavior",
      delay: "100ms"
    },
    {
  
      text: "Human-like co-pilot with voice support",
      delay: "200ms"
    },
    {
 
      text: "Built for both B2B fleets and B2C users",
      delay: "300ms"
    },
    {
      
      text: "OEM and logistics pilot ready",
      delay: "400ms"
    }
  ];

  const userTypes = [
    {
      icon: <Car className="w-12 h-12" />,
      title: "Cab Drivers",
      subtitle: "Safe long trips with AI support",
      color: "bg-gray-100",
      hoverColor: "hover:bg-gray-200"
    },
    {
      icon: <Truck className="w-12 h-12" />,
      title: "Delivery Riders",
      subtitle: "Protection for every delivery",
      color: "bg-black",
      textColor: "text-white",
      hoverColor: "hover:bg-gray-800"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
          "SAFETY” Shouldn't Be a “LUXURY"
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Every day, thousands of road accidents happen due to drowsy driving, distractions, or simply lack of 
            awareness. High-end vehicles have safety tech — but what about the rest of us? That's where{' '}
            <span className="font-semibold text-black">okDriver</span> steps in — designed for Indian roads, drivers, and conditions.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-700 transform hover:scale-105 hover:bg-gray-50 cursor-pointer ${
                  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`}
                style={{ transitionDelay: feature.delay }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`p-3 rounded-full transition-all duration-300 ${
                  activeCard === index ? 'bg-black text-white' : 'bg-gray-100'
                }`}>
                  <Check className="w-6 h-6" />
                </div>
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`transition-all duration-300 ${
                    activeCard === index ? 'text-black scale-110' : 'text-gray-600'
                  }`}>
                    {feature.icon}
                  </div>
                  <span className={`text-lg transition-all duration-300 ${
                    activeCard === index ? 'font-semibold' : 'font-medium'
                  }`}>
                    {feature.text}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* User Type Cards */}
          <div className="space-y-6 bg-green-600">
           <Image src={saftey_luxry} alt="User Type" className="w-full h-auto rounded-lg" />
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '1000ms' }}>
          <div className="inline-block relative group cursor-pointer">
            <div className="absolute inset-0 bg-black rounded-full blur opacity-25 group-hover:opacity-75 transition-all duration-500 transform group-hover:scale-110"></div>
           <Link href="/services">
        <button className="relative cursor-pointer bg-black text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              Explore okDriver Services
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-all duration-300"></div>
            </button>
           </Link>
          </div>
          
          <p className="mt-6 text-gray-500 text-lg">
            Join thousands of drivers making Indian roads safer, one trip at a time.
          </p>
        </div>

        {/* Floating Animation Elements */}
        <div className="fixed top-20 right-20 w-4 h-4 bg-black rounded-full animate-bounce opacity-20" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="fixed bottom-20 left-20 w-3 h-3 bg-gray-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '1s', animationDuration: '2s' }}></div>
        <div className="fixed top-1/3 left-10 w-2 h-2 bg-black rounded-full animate-pulse opacity-25"></div>
        <div className="fixed bottom-1/3 right-10 w-2 h-2 bg-gray-600 rounded-full animate-pulse opacity-25" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
};

export default WhyOkDriver;