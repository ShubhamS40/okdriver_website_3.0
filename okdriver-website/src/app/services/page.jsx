'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { 
  Truck, Building2, User, MapPin, AlertTriangle, Eye, Camera, 
  Headphones, Phone, Cloud, BarChart3, Shield, CheckCircle, 
  ArrowRight, Play, Star, Users, Award 
} from 'lucide-react';

const services = [
  {
    id: 'fleet',
    title: 'Fleet Operators',
    icon: Truck,
    description: 'Complete fleet management solutions with AI-powered monitoring and real-time insights for enhanced safety and operational efficiency.',
    features: [
      { icon: MapPin, text: 'Live vehicle & driver tracking' },
      { icon: AlertTriangle, text: 'Pothole & hazard detection' },
      { icon: Eye, text: 'Driver monitoring system (DMS)' },
      { icon: Camera, text: 'Mobile-based dashcam recording' },
      { icon: BarChart3, text: 'Central fleet dashboard' }
    ],
    benefits: ['Reduce accidents by 40%', 'Lower fuel costs', 'Improve driver accountability'],
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 'enterprise',
    title: 'Enterprises & Mobility',
    icon: Building2,
    description: 'Scalable safety solutions for logistics companies, ride-hailing platforms, and OEMs with enterprise-grade compliance and monitoring.',
    features: [
      { icon: MapPin, text: 'Real-time delivery tracking' },
      { icon: Headphones, text: 'AI voice assistant integration' },
      { icon: Phone, text: 'Emergency SOS alerts' },
      { icon: Camera, text: 'Plug-and-play AI camera' },
      { icon: Shield, text: 'Compliance management' }
    ],
    benefits: ['Stay compliant', 'Reduce operational risks', 'Scale across operations'],
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 'individual',
    title: 'Individual Drivers',
    icon: User,
    description: 'Your personal AI co-pilot for everyday driving with smart safety features, emergency protection, and no additional hardware required.',
    features: [
      { icon: Camera, text: 'Phone-based smart dashcam' },
      { icon: Eye, text: 'Drowsiness & distraction alerts' },
      { icon: Headphones, text: 'Conversational AI assistant' },
      { icon: Phone, text: 'Automatic SOS protection' },
      { icon: Cloud, text: 'Secure cloud backup' }
    ],
    benefits: ['Peace of mind driving', 'Emergency protection', 'Affordable safety'],
    color: 'from-green-600 to-green-800'
  }
];

const featureChecklist = [
  'Real-time fatigue and drowsiness detection using phone or AI camera',
  'Instant audio-visual alerts to wake distracted or sleepy drivers',
  'Supports both smartphone-based detection and plug-and-play hardware',
  'Improves long-distance driving safety and reduces accident risks'
];

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">

      <section className="container-custom py-24">
        <div className="text-center ">
          <h1 className="text-5xl md:text-6xl font-bold mb-6  ">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-400 leading-relaxed">
            Explore the comprehensive range of AI-powered services offered by OKDriver to revolutionize your driving experience and fleet management.
          </p>
          
        
        </div>
      </section>

      {/* Core Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          
          {/* Drowsiness Monitoring System */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 md:order-1">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-black rounded-lg mr-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-black uppercase tracking-wide">AI-Powered Safety</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-black">Drowsiness Monitoring System</h2>
              <p className="text-lg mb-8 text-gray-700 leading-relaxed">
                OKDriver's AI-powered Drowsiness Monitoring System helps prevent accidents by detecting signs of driver fatigue, distraction, and inattention in real-time. Built for Indian roads and driving patterns, it ensures safety for individual drivers and fleet operations alike.
              </p>
              <ul className="space-y-4 mb-8">
                {featureChecklist.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center">
                <Play className="w-5 h-5 mr-2" />
                See Demo
              </button>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/assets/service_image/dms-clip.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Driver & Road Condition Monitoring */}
          <div id="driver-management" className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative">
              <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/assets/service_image/pithole-image.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="p-2 bg-black rounded-lg mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-black uppercase tracking-wide">Smart Detection</span>
              </div>
              <h3 className="text-4xl font-bold mb-6 text-black">Driver & Road Condition Monitoring</h3>
              <p className="text-lg mb-8 text-gray-700 leading-relaxed">
                Our comprehensive monitoring system tracks both driver behavior and road conditions in real-time. We automatically detect potholes, unsafe surfaces, and manage driver profiles to help you maintain a safer, more efficient fleet operation.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Automatically detects potholes and poor road surfaces using AI</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Total registered driver tracking with detailed profile insights</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Manage, update, or delete driver accounts as needed</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Assign and track subscription plans with ease</span>
                </li>
              </ul>
              <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Traffic Rule Compliance */}
          <div id="traffic-compliance" className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 md:order-1">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-black rounded-lg mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-black uppercase tracking-wide">Compliance Monitoring</span>
              </div>
              <h3 className="text-4xl font-bold mb-6 text-black">Traffic Rule Compliance & Smart Alerts</h3>
              <p className="text-lg mb-8 text-gray-700 leading-relaxed">
                OKDriver uses AI vision to detect traffic signs and monitor compliance with speed limits and other road rules. This helps drivers stay informed, avoid violations, and promotes safer driving behavior across individual and fleet usage.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Detects speed limit signs and regulatory boards using real-time video</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Provides audio-visual alerts when driver exceeds detected speed limit</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Supports dynamic traffic conditions and changing speed zones</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Reduces risk of traffic violations and improves compliance</span>
                </li>
              </ul>
              <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Explore Features
              </button>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/service_image/traffic-rules.jpg"
                  alt="Traffic Rules Detection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Voice Assistant */}
          <div id="voice-assistant" className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative">
              <div className="relative h-96 w-full rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <Headphones className="w-16 h-16 text-white" />
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="p-2 bg-black rounded-lg mr-4">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-black uppercase tracking-wide">AI Assistant</span>
              </div>
              <h3 className="text-4xl font-bold mb-6 text-black">OKDriver Voice Assistant (Convo AI)</h3>
              <p className="text-lg mb-8 text-gray-700 leading-relaxed">
                Our smart voice assistant enhances your driving experience by delivering real-time assistance. Whether you're looking for nearby locations or need help with general queries, OKDriver is always ready to guide you. In critical situations, the assistant can instantly contact emergency contacts or nearby hospitals.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Voice-enabled assistant for navigation, search, and queries</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Real-time conversation support to improve driver focus</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Emergency response system — auto-calls to relatives or hospitals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Contextual voice feedback to reduce driver distraction</span>
                </li>
              </ul>
              <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center">
                <Headphones className="w-5 h-5 mr-2" />
                Try Voice Demo
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tailored <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Smart driving safety solutions designed for your unique needs, powered by AI and built for real-world impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => {
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
                  {/* Gradient Background Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Main Content */}
                  <div className="relative p-8">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} mb-6 transform transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Benefits Preview */}
                    <div className="space-y-2 mb-6">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Expand Button */}
                    <button className="inline-flex items-center space-x-2 text-black font-semibold hover:text-gray-700 transition-colors">
                      <span>Learn More</span>
                      <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </button>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-300 ${
                    isHovered ? 'border-black/20' : ''
                  }`} />
                </div>
              );
            })}
          </div>

          {/* Expanded Details Modal */}
          {selectedService && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {(() => {
                  const service = services.find(s => s.id === selectedService);
                  const Icon = service.icon;
                  
                  return (
                    <div className="p-8">
                      {/* Header */}
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

                      {/* Description */}
                      <p className="text-lg text-gray-600 mb-8">{service.description}</p>

                      {/* Features Grid */}
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

                      {/* CTA */}
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

      {/* Final CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Driving Experience?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-300">
            Join thousands of drivers, fleet operators, and enterprises who trust OKDriver for their safety needs. Start your journey to safer, smarter driving today.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-8 mb-12">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">4.8/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-sm">10K+ Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-sm">Industry Leader</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-black px-10 py-5 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-10 py-5 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}