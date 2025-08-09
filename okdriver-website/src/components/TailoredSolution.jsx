'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { 
  Truck, Building2, User, MapPin, AlertTriangle, Eye, Camera, 
  Headphones, Phone, Cloud, BarChart3, Shield, CheckCircle, 
  ArrowRight, Play, Star, Users, Award 
} from 'lucide-react';

function TailoredSolution() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      icon: Truck,
      title: 'Fleet Management',
      description: 'Comprehensive AI-driven fleet tracking and safety monitoring.',
      color: 'from-blue-500 to-indigo-500',
      benefits: [
        'Real-time tracking',
        'Driver behavior monitoring',
        'Reduced accidents'
      ],
      features: [
        { icon: MapPin, text: 'Live GPS tracking' },
        { icon: AlertTriangle, text: 'Instant alerts' },
        { icon: BarChart3, text: 'Performance analytics' }
      ]
    },
    {
      id: 2,
      icon: Shield,
      title: 'Driver Safety',
      description: 'Advanced AI safety systems to protect drivers and assets.',
      color: 'from-green-500 to-emerald-500',
      benefits: [
        'Collision prevention',
        'Fatigue detection',
        'Compliance assurance'
      ],
      features: [
        { icon: Eye, text: 'AI vision monitoring' },
        { icon: Camera, text: 'Cabin cameras' },
        { icon: CheckCircle, text: 'Regulatory compliance' }
      ]
    },
    {
      id: 3,
      icon: Building2,
      title: 'Enterprise Solutions',
      description: 'Custom integrations and AI safety solutions for enterprises.',
      color: 'from-purple-500 to-pink-500',
      benefits: [
        'Scalable deployment',
        'Custom reporting',
        'High security'
      ],
      features: [
        { icon: Cloud, text: 'Cloud integration' },
        { icon: Users, text: 'Team management' },
        { icon: Award, text: 'ISO-certified systems' }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tailored <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Smart driving safety solutions designed for your unique needs, powered by AI and built for real-world impact.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === service.id;

            return (
              <div
                key={service.id}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 ${
                  isHovered ? 'ring-4 ring-black/10' : ''
                }`}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Card Content */}
                <div className="relative p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} mb-6 transform transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2 mb-6">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="inline-flex items-center space-x-2 text-black font-semibold hover:text-gray-700 transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {(() => {
                const service = services.find(s => s.id === selectedService);
                const Icon = service.icon;

                return (
                  <div className="p-8">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color}`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">{service.title}</h3>
                      </div>
                      <button
                        onClick={() => setSelectedService(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Modal Description */}
                    <p className="text-lg text-gray-600 mb-8">{service.description}</p>

                    {/* Features & Benefits */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h4 className="text-xl font-semibold mb-4">Key Features</h4>
                        <div className="space-y-3">
                          {service.features.map((feature, idx) => {
                            const FeatureIcon = feature.icon;
                            return (
                              <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <FeatureIcon className="w-5 h-5 text-gray-700" />
                                <span className="text-gray-800">{feature.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold mb-4">Benefits</h4>
                        <div className="space-y-3">
                          {service.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="text-gray-800 font-medium">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Modal CTA */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className={`px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity`}>
                        Get Started
                      </button>
                      <button className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                        Schedule Demo
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TailoredSolution;
