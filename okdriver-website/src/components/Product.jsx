'use client'
import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  HardDrive, 
  Eye, 
  Camera, 
  Shield, 
  Navigation, 
  BarChart3, 
  AlertTriangle, 
  Map, 
  Mic, 
  Cloud, 
  Users, 
  Car,
  Monitor,
  Wifi,
  Battery,
  ArrowRight,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react';

const Product = () => {
  const [activeTab, setActiveTab] = useState('mobile');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mobileFeatures = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Smart Dashcam Recording",
      description: "High-quality video recording with cloud storage and local backup options",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Advanced Drowsiness Detection",
      description: "Real-time facial recognition to detect driver fatigue and prevent accidents",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "OKDriver Voice Assistant",
      description: "AI-powered driver companion for navigation, alerts, and hands-free operation",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "SOS & Emergency Alerts",
      description: "Automatic accident detection with instant family and emergency service notifications",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Face Recognition Security",
      description: "Authorized driver verification and anti-theft protection",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Sync & Storage",
      description: "Secure cloud backup of recordings and driving data across devices",
      color: "from-cyan-500 to-cyan-600"
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
      icon: <Car className="w-8 h-8" />,
      title: "Traffic Object Detection",
      description: "AI recognition of vehicles, pedestrians, traffic signs, and road conditions",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Map className="w-8 h-8" />,
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
      icon: <AlertTriangle className="w-8 h-8" />,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            PRODUCT
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-300 mb-8 max-w-4xl mx-auto">
            Revolutionizing road safety through cutting-edge AI technology and comprehensive monitoring solutions
          </p>
          
          <div className="flex justify-center items-center space-x-4">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-white via-transparent to-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Product Overview */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            OKDriver's Product has <span className="text-blue-600">Two Components</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive road safety solutions designed for individual drivers and fleet operators, 
            powered by advanced AI technology to reduce accidents and enhance driving experience.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-2 rounded-2xl flex space-x-2">
            <button
              onClick={() => setActiveTab('mobile')}
              className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center space-x-3 ${
                activeTab === 'mobile'
                  ? 'bg-white text-black shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span>Mobile App Solution</span>
            </button>
            <button
              onClick={() => setActiveTab('hardware')}
              className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center space-x-3 ${
                activeTab === 'hardware'
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
            <div className={`p-12 transition-all duration-500 ${
              activeTab === 'mobile' ? 'bg-gradient-to-br from-blue-50 to-white' : 'bg-gray-50'
            }`}>
              <div className="text-center mb-10">
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

              <div className="space-y-6">
                {mobileFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
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
            <div className={`p-12 transition-all duration-500 border-l border-gray-200 ${
              activeTab === 'hardware' ? 'bg-gradient-to-br from-purple-50 to-white' : 'bg-gray-50'
            }`}>
              <div className="text-center mb-10">
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

              <div className="space-y-4 max-h-96 overflow-y-auto">
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

        {/* Key Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Accident Prevention</h3>
            <p className="text-gray-600">
              Advanced AI algorithms designed specifically to reduce road accidents in India through real-time monitoring and alerts.
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Monitoring</h3>
            <p className="text-gray-600">
              Continuous surveillance of driver behavior, vehicle performance, and road conditions for maximum safety.
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Data-Driven Insights</h3>
            <p className="text-gray-600">
              Comprehensive analytics and reporting to improve driving habits and optimize fleet operations.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-black via-gray-900 to-black rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <h3 className="text-4xl font-black mb-6">Ready to Make Roads Safer?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of drivers and fleet operators who trust OKDriver for their road safety needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <Smartphone className="w-5 h-5 mr-2" />
                Download Mobile App
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <HardDrive className="w-5 h-5 mr-2" />
                Get Hardware Solution
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;