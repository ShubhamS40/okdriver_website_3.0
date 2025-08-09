'use client'
import React, { useState } from 'react';
import { 
  Truck, Building2, User, MapPin, AlertTriangle, Eye, Camera, 
  Headphones, Phone, Cloud, BarChart3, Shield, CheckCircle, 
  ArrowRight, Play, Star, Users, Award, Smartphone, HardDrive,
  Navigation, Mic, Battery, Monitor, Wifi, Zap, X
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

const mobileFeatures = [
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Smart Dashcam Recording",
    description: "High-quality video recording with cloud storage and local backup options",
    color: "from-blue-500 to-blue-600",
    available: true
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Advanced Drowsiness Detection",
    description: "Real-time facial recognition to detect driver fatigue and prevent accidents",
    color: "from-purple-500 to-purple-600",
    available: true
  },
  {
    icon: <Mic className="w-8 h-8" />,
    title: "OKDriver Voice Assistant",
    description: "AI-powered driver companion for navigation, alerts, and hands-free operation",
    color: "from-green-500 to-green-600",
    available: true
  },
  {
    icon: <AlertTriangle className="w-8 h-8" />,
    title: "SOS & Emergency Alerts",
    description: "Automatic accident detection with instant family and emergency service notifications",
    color: "from-red-500 to-red-600",
    available: true
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Face Recognition Security",
    description: "Authorized driver verification and anti-theft protection",
    color: "from-orange-500 to-orange-600",
    available: true
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Cloud Sync & Storage",
    description: "Secure cloud backup of recordings and driving data across devices",
    color: "from-cyan-500 to-cyan-600",
    available: true
  },
  // Features not available in mobile app
  {
    icon: <HardDrive className="w-8 h-8" />,
    title: "Dual Dashcam System",
    description: "Front and rear camera setup with 4K recording capability",
    color: "from-gray-400 to-gray-500",
    available: false
  },
  {
    icon: <Monitor className="w-8 h-8" />,
    title: "Camera-based Distraction Monitoring",
    description: "Real-time detection of phone usage, smoking, and other distractions",
    color: "from-gray-400 to-gray-500",
    available: false
  },
  {
    icon: <Navigation className="w-8 h-8" />,
    title: "Real-Time GPS Tracking",
    description: "Precise vehicle location monitoring with geofencing capabilities",
    color: "from-gray-400 to-gray-500",
    available: false
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Fleet Dashboard & Analytics",
    description: "Centralized management system for fleet operators with detailed insights",
    color: "from-gray-400 to-gray-500",
    available: false
  }
];

const hardwareFeatures = [
  {
    icon: <HardDrive className="w-8 h-8" />,
    title: "Dual Dashcam System",
    description: "Front and rear camera setup with 4K recording capability",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "AI-Powered Drowsiness Detection",
    description: "Advanced ML algorithms for precise driver state monitoring",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: <Monitor className="w-8 h-8" />,
    title: "Camera-based Distraction Monitoring",
    description: "Real-time detection of phone usage, smoking, and other distractions",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: <Navigation className="w-8 h-8" />,
    title: "Real-Time GPS Tracking",
    description: "Precise vehicle location monitoring with geofencing capabilities",
    color: "from-green-500 to-green-600"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Comprehensive Driver Reports",
    description: "Detailed analytics on driving behavior, routes, and safety metrics",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Traffic Object Detection",
    description: "AI recognition of vehicles, pedestrians, traffic signs, and road conditions",
    color: "from-red-500 to-red-600"
  },
  {
    icon: <AlertTriangle className="w-8 h-8" />,
    title: "Pothole & Road Hazard Detection",
    description: "Advanced computer vision for road surface analysis and hazard alerts",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Fleet Dashboard & Analytics",
    description: "Centralized management system for fleet operators with detailed insights",
    color: "from-teal-500 to-teal-600"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Traffic Rules Violation Detection",
    description: "Automatic detection of speed limits, signal violations, and unsafe driving",
    color: "from-pink-500 to-pink-600"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Road Metrics Collection",
    description: "Data gathering on traffic patterns, road conditions, and infrastructure",
    color: "from-gray-500 to-gray-600"
  }
];

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [activeProductTab, setActiveProductTab] = useState('mobile');

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
              <h3 className="text-4xl font-bold mb-6 text-black">OKDriver Voice Assistant </h3>
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

      

      {/* Product Showcase Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Product Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive road safety solutions designed for individual drivers and fleet operators, 
              powered by advanced AI technology to reduce accidents and enhance driving experience.
            </p>
            
            <div className="inline-block bg-gray-100 text-gray-800 px-6 py-3 rounded-full text-lg font-bold">
              OKDriver's Product has Two Components
            </div>
          </div>

          {/* Product Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-2 rounded-2xl flex space-x-2">
              <button
                onClick={() => setActiveProductTab('mobile')}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center space-x-3 ${
                  activeProductTab === 'mobile'
                    ? 'bg-white text-black shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span>Mobile App Solution</span>
              </button>
              <button
                onClick={() => setActiveProductTab('hardware')}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center space-x-3 ${
                  activeProductTab === 'hardware'
                    ? 'bg-white text-black shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                <HardDrive className="w-5 h-5" />
                <span>Hardware + Cloud DMS</span>
              </button>
            </div>
          </div>

          {/* Product Comparison Table */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-16">
            <div className="grid lg:grid-cols-2">
              {/* Mobile App Side */}
              <div className={`p-8 transition-all duration-500 ${
                activeProductTab === 'mobile' ? 'bg-gradient-to-br from-blue-50 to-white' : 'bg-gray-50'
              }`}>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Smartphone className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-3">
                    OKDriver Mobile App
                  </h3>
                  <p className="text-lg text-gray-600 font-medium">
                    Individual Driver Solution
                  </p>
                  <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold mt-4">
                    Mobile-Only Version
                  </div>
                </div>

                <div className="space-y-4">
                  {mobileFeatures.map((feature, index) => (
                    <div key={index} className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 ${
                      feature.available 
                        ? 'hover:bg-white hover:shadow-lg' 
                        : 'opacity-60 hover:bg-red-50'
                    }`}>
                      <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg relative`}>
                        <div className="text-white">{feature.icon}</div>
                        {!feature.available && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <X className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold mb-2 ${feature.available ? 'text-gray-900' : 'text-gray-500'}`}>
                          {feature.title}
                        </h4>
                        <p className={`text-sm ${feature.available ? 'text-gray-600' : 'text-gray-400'}`}>
                          {feature.available ? feature.description : 'Not available in mobile app - Hardware device provides this benefit'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-white rounded-2xl border-2 border-blue-100">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    Perfect For:
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Individual drivers</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Personal vehicle safety</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Cost-effective solution</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Easy smartphone integration</li>
                  </ul>
                </div>
              </div>

              {/* Hardware Side */}
              <div className={`p-8 transition-all duration-500 border-l border-gray-200 ${
                activeProductTab === 'hardware' ? 'bg-gradient-to-br from-purple-50 to-white' : 'bg-gray-50'
              }`}>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <HardDrive className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-3">
                    OKDriver Hardware + Cloud DMS
                  </h3>
                  <p className="text-lg text-gray-600 font-medium">
                    Professional Fleet Solution
                  </p>
                  <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-bold mt-4">
                    For B2B Fleets
                  </div>
                </div>

                <div className="space-y-4">
                  {hardwareFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                      <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <div className="text-white text-sm">{feature.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">{feature.title}</h4>
                        <p className="text-gray-600 text-xs">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-white rounded-2xl border-2 border-purple-100">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Users className="w-5 h-5 text-purple-500 mr-2" />
                    Ideal For:
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Fleet operators</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Commercial vehicles</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Enterprise-grade monitoring</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Advanced analytics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Key Product Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl shadow-xl border border-red-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Accident Prevention</h3>
              <p className="text-gray-600">
                Advanced AI algorithms designed specifically to reduce road accidents in India through real-time monitoring and alerts.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-xl border border-blue-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Monitoring</h3>
              <p className="text-gray-600">
                Continuous surveillance of driver behavior, vehicle performance, and road conditions for maximum safety.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl shadow-xl border border-green-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Data-Driven Insights</h3>
              <p className="text-gray-600">
                Comprehensive analytics and reporting to improve driving habits and optimize fleet operations.
              </p>
            </div>
          </div>
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
              <span className="text-sm">100+ Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-sm">Industry Leader</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-black px-10 py-5 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Smartphone className="w-5 h-5 mr-2" />
              Download Mobile App
            </button>
            <button className="border-2 border-white text-white px-10 py-5 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-colors flex items-center justify-center">
              <HardDrive className="w-5 h-5 mr-2" />
              Get Hardware Solution
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}