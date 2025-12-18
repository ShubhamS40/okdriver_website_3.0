'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Shield, 
  Zap, 
  Users, 
  ArrowRight, 
  Award, 
  Target, 
  Heart,
  Star,
  CheckCircle,
  ArrowUp,
  ExternalLink,
  Mail,
  Linkedin,
  Twitter,
  Play,
  Clock
} from 'lucide-react';

import ceo from './../../../public/assets/about_image/ceo_passport_photo.png';
import cto from './../../../public/assets/about_image/cto_passport_photo.png';
import company_image from './../../../public/assets/about_image/company_image.jpg';

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeValue, setActiveValue] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const coreValues = [
    {
      id: 'security',
      icon: Shield,
      title: "Security",
      description: "We prioritize the security of your data and ensure that all information is protected with the highest standards of encryption and security protocols.",
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
      features: [
        'End-to-end encryption for all data',
        'ISO 27001 certified security standards',
        'Regular security audits and monitoring',
        '24/7 threat detection systems'
      ]
    },
    {
      id: 'efficiency',
      icon: Zap,
      title: "Efficiency", 
      description: "Our platform is designed to streamline your operations, saving you time and resources while providing comprehensive driver management solutions.",
      color: "from-yellow-500 to-orange-600",
      bgColor: "from-yellow-50 to-orange-50",
      features: [
        'Automated workflow management',
        'Real-time performance analytics',
        'Streamlined administrative processes',
        'Intelligent resource optimization'
      ]
    },
    {
      id: 'support',
      icon: Heart,
      title: "Support",
      description: "We offer dedicated support to ensure that your experience with our platform is seamless and any issues are resolved promptly.",
      color: "from-pink-500 to-red-600",
      bgColor: "from-pink-50 to-red-50",
      features: [
        '24/7 dedicated customer support',
        'Multi-channel support system',
        'Expert technical assistance',
        'Proactive issue resolution'
      ]
    }
  ];

  const achievements = [
    { number: "100+", label: "Active Drivers", icon: Users },
    { number: "99.9%", label: "Uptime", icon: CheckCircle },
    { number: "24/7", label: "Support", icon: Heart },
    { number: "5+", label: "Companies", icon: Award }
  ];

  const teamMembers = [
    {
      name: "Tushit Gupta",
      role: "Chief Executive Officer (Managing Director)",
      image: ceo,
      color: "from-blue-500 to-purple-600",
      bgColor: "from-blue-100 via-purple-50 to-pink-100",
      description: "Visionary leader with extensive experience in technology and business operations. Leading innovation in driver management solutions.",
      link: "/about/ceo",
      badge: "CEO & Managing Director"
    },
    {
      name: "Shubham Singh",
      role: "Software Developer",
      image: cto,
      color: "from-green-500 to-teal-600",
      bgColor: "from-green-100 via-teal-50 to-blue-100",
      description: "Software developer building the app's brains (AI and backend). Expert in mobile development and AI integration.",
      link: "/about/cto",
      badge: "Software Developer"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:bg-gray-200 transform hover:scale-110 transition-all duration-300"
        >
          <ArrowUp size={20} />
        </button>
      )}

     <section className="container-custom py-24">
  <div className="text-center">
    <h1 className="text-5xl md:text-6xl font-bold mb-6">
      About OKDriver
    </h1>
    <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-400 leading-relaxed">
      OKDriver turns your smartphone into an AI-powered safety companion — with dashcam, fatigue alerts, SOS, 
      and voice assistance. Built for Indian roads, no hardware needed.
    </p>
  </div>
</section>


    {/* Company Overview Section */} 
<section className="bg-gray-50 py-5">
  <div className="container-custom">
    <div className="grid lg:grid-cols-2 gap-16 items-center mb-4">
      
      {/* Left Content */}
      <div className="space-y-8">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-black rounded-lg mr-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-semibold text-black uppercase tracking-wide">What We Do Best</span>
        </div>
        
        <h2 className="text-4xl font-bold mb-6 text-black">
          AI-Powered Safety & Driver Insights
        </h2>
        
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            OKDriver transforms smartphones into smart driving companions — enabling live tracking, 
            pothole detection, fatigue alerts, and SOS support, all without external hardware.
          </p>
          
          <p>
            We help fleet operators, enterprises, and individuals boost safety, reduce risks, 
            and improve the driving experience using powerful AI — all through a single platform.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-sm text-gray-600 font-medium">Active Users</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
            <div className="text-sm text-gray-600 font-medium">System Uptime</div>
          </div>
        </div>

        <Link href="/services" className="inline-flex items-center px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
          <span>Explore Our Services</span>
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
      
      {/* Right Graphic Section */}
      <div className="relative">
        <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-2xl">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center relative">
            <div className="text-center z-10">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <Target className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">okDriver Smart Dashcams Private Limited</h3>
              <p className="text-gray-600 font-medium">Driving Smarter, Safer Journeys</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-800 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Platform</span>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  </div>
</section>


      {/* Core Values Section */}
      <section className="py-2 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The fundamental principles that drive our innovation and guide every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              const isHovered = hoveredCard === value.id;
              
              return (
                <div
                  key={value.id}
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 ${
                    isHovered ? 'ring-4 ring-black/10' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard(value.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setSelectedValue(selectedValue === value.id ? null : value.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} mb-6 transform transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {value.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {value.description}
                    </p>

                    <button className="inline-flex items-center space-x-2 text-black font-semibold hover:text-gray-700 transition-colors">
                      <span>Learn More</span>
                      <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Value Details Modal */}
          {selectedValue && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {(() => {
                  const value = coreValues.find(v => v.id === selectedValue);
                  const Icon = value.icon;
                  
                  return (
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${value.color}`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-3xl font-bold text-gray-900">{value.title}</h3>
                        </div>
                        <button
                          onClick={() => setSelectedValue(null)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <p className="text-lg text-gray-600 mb-8">{value.description}</p>

                      <div className="mb-8">
                        <h4 className="text-xl font-semibold mb-4">How We Deliver</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {value.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <span className="text-gray-800">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={() => setSelectedValue(null)}
                          className={`px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r ${value.color} hover:opacity-90 transition-opacity`}
                        >
                          Got it
                        </button>
                        <Link href="/contact" className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors text-center">
                          Learn More
                        </Link>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </section>

 {/* Team Section */}
<section className="bg-gray-50 py-20">
  <div className="container-custom">
    <div className="text-center mb-16">
      <div className="flex items-center justify-center mb-4">
        <div className="p-2 bg-black rounded-lg mr-4">
          <Users className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm font-semibold text-black uppercase tracking-wide">Meet The Team</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
        Our Leadership Excellence
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Meet the visionary leaders driving innovation in driver management technology
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {teamMembers.map((member, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-500 group">
          <div className={`relative h-80 bg-gradient-to-br ${member.bgColor} overflow-hidden`}>
            <div className="w-full h-full flex items-center justify-center relative">
              <div className={`w-48 h-48 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center shadow-2xl`}>
                <Image src={member.image} alt={`${member.name} Image`} className="w-48 h-48 rounded-full object-cover" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-800 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{member.badge}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
            <p className="text-gray-600 font-semibold mb-4">
              {member.role === "Founder" ? "Managing Director" : member.role}
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {member.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                {/* Email */}
                <a
                  href="mailto:tushitgupta@gmail.com"
                  className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white transition-all duration-300"
                >
                  <Mail size={16} />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/tushit-gupta-705453146/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white transition-all duration-300"
                >
                  <Linkedin size={16} />
                </a>
              </div>

              <Link
                href={member.link}
                className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${member.color} text-white rounded-lg font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg`}
              >
                <span>Read More</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-black to-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-6 text-white">
              Our Achievements
            </h3>
            <p className="text-xl text-gray-300 font-medium">Numbers that speak for our excellence</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:scale-110 transform transition-all duration-300">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300 text-white">
                    {achievement.number}
                  </div>
                  <div className="text-gray-400 font-medium">{achievement.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default About;