'use client'
import React, { useState, useEffect } from 'react';
import { ChevronRight, Award, Users, Target, Lightbulb, ArrowUp, Mail, Linkedin, Twitter } from 'lucide-react';
import ceo from './../../../../public/assets/about_image/ceo.png';
import { Import } from 'lucide-react';
import Image from 'next/image';
// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const FounderProfile = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-gray-800 transform hover:scale-110 transition-all duration-300"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Enhanced Header Section */}
      <div 
        className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white py-16 md:py-24 px-4 overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-90"></div>
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Enhanced Breadcrumb */}
    
          
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-pulse">
              CEO & FOUNDER
            </h1>
            <div className="flex justify-center items-center space-x-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-white via-transparent to-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="bg-white shadow-2xl border border-gray-100 overflow-hidden  backdrop-blur-sm">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Enhanced Image Section */}
            <div className="relative group">
              <div className="aspect-square lg:aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                {/* Placeholder for CEO image with enhanced styling */}
                <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center relative">
                   <Image src={ceo} alt="CEO Image" className="object-cover w-full h-full " />
                
                  
                  {/* Enhanced floating badge */}
                  <div className="absolute bottom-6 left-6 bg-white border-2 border-gray-100 px-6 py-3 rounded-full text-sm font-bold text-black shadow-2xl backdrop-blur-sm transform group-hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>CEO & Founder</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Content Section */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p className="text-black font-bold text-lg opacity-80">CEO & Founder, OKDriver Technologies</p>
                </div>
                <h2 className="text-4xl lg:text-6xl font-black text-black mb-6 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
                  TUSHIT GUPTA
                </h2>
                
                {/* Social Links */}
                <div className="flex space-x-4 mb-6">
                  <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-blue-600 transform hover:scale-110 transition-all duration-300">
                    <Mail size={16} />
                  </button>
                  <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-blue-700 transform hover:scale-110 transition-all duration-300">
                    <Linkedin size={16} />
                  </button>
                  <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-blue-400 transform hover:scale-110 transition-all duration-300">
                    <Twitter size={16} />
                  </button>
                </div>
              </div>

              {/* Enhanced Bio Content */}
              <div className="space-y-8 text-gray-700 leading-relaxed">
                <p className="text-lg font-medium">
                  He is the CEO & Founder of OKDriver Technologies. Before founding this innovative company, 
                  he gained extensive experience working with leading organizations including 
                  <span className="font-bold text-black px-2 py-1 bg-yellow-100 rounded ml-1"> TCS (Tata Consultancy Services)</span> and 
                  <span className="font-bold text-black px-2 py-1 bg-blue-100 rounded ml-1"> Tikona Digital Networks</span>, bringing over 
                  <span className="font-bold text-red-600"> 5+ years of industry expertise</span> in technology and business operations.
                </p>

                {/* Enhanced Quote Section */}
                <div className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white p-8 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  <div className="absolute top-4 left-6 text-6xl text-white opacity-20 font-serif">"</div>
                  <p className="italic font-medium text-lg leading-relaxed relative z-10 pt-4">
                    Revolutionizing road safety through cutting-edge technology isn't just our mission—it's our 
                    commitment to creating safer roads for everyone. Together, we're building a future where 
                    technology and responsibility drive hand in hand.
                  </p>
                  <div className="absolute bottom-4 right-6 text-6xl text-white opacity-20 font-serif rotate-180">"</div>
                </div>

                <div className="space-y-6">
                  <p className="font-medium">
                    Tushit Gupta is the visionary CEO and Founder of OKDriver Technologies. He holds a 
                    <span className="font-bold text-green-700 px-2 py-1 bg-green-50 rounded ml-1"> Bachelor's degree in Electronics & Communication Engineering (B.Tech ECE)</span> from 
                    <span className="font-bold text-blue-700 px-2 py-1 bg-blue-50 rounded ml-1"> Galgotias University</span>. His diverse educational background 
                    in engineering combined with his practical industry experience has positioned him as a leader 
                    in the intersection of technology and transportation safety.
                  </p>

                  <p>
                    With his extensive experience at multinational corporations and his deep understanding of 
                    technology systems, Tushit has successfully led OKDriver Technologies to become a pioneering 
                    force in the road safety and driver training industry. His leadership continues to drive 
                    innovation and excellence in developing solutions that make roads safer for everyone.
                  </p>
                </div>
              </div>

              {/* Enhanced Achievement Stats */}
              <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t-2 border-gray-200">
                <div className="text-center group">
                  <div className="text-4xl font-black text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">5+</div>
                  <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">Years Experience</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black text-black mb-3 group-hover:text-green-600 transition-colors duration-300">B.Tech</div>
                  <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">ECE Graduate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Vision & Innovation Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="text-white" size={28} />
              </div>
              <h3 className="text-3xl font-bold text-black">Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg font-medium">
              To create a world where road safety is powered by intelligent technology, 
              ensuring every journey is safe, secure, and efficient for drivers everywhere.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="text-white" size={28} />
              </div>
              <h3 className="text-3xl font-bold text-black">Innovation</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg font-medium">
              Leveraging cutting-edge technology and industry expertise to revolutionize 
              driver training, vehicle inspection, and road safety monitoring systems.
            </p>
          </div>
        </div>

        {/* Enhanced Leadership Excellence Section */}
        <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl text-white p-12 lg:p-16 mt-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="text-center mb-16 relative z-10">
            <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Leadership Excellence
            </h3>
            <div className="flex justify-center items-center space-x-4">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-12 h-1 bg-gradient-to-r from-white via-transparent to-white rounded-full"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 relative z-10">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transform transition-all duration-300">
                <Award size={32} className="text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 group-hover:text-blue-300 transition-colors duration-300">Technical Expertise</h4>
              <p className="text-gray-300 leading-relaxed font-medium">
                Deep technical knowledge in ECE and extensive experience in technology implementations.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transform transition-all duration-300">
                <Users size={32} className="text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 group-hover:text-green-300 transition-colors duration-300">Industry Experience</h4>
              <p className="text-gray-300 leading-relaxed font-medium">
                5+ years of valuable experience with leading companies like TCS and Tikona.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transform transition-all duration-300">
                <Target size={32} className="text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 group-hover:text-orange-300 transition-colors duration-300">Visionary Leadership</h4>
              <p className="text-gray-300 leading-relaxed font-medium">
                Leading OKDriver Technologies towards innovative solutions in road safety.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-black to-gray-800 text-white rounded-full font-bold hover:from-gray-800 hover:to-black transform hover:scale-105 transition-all duration-300 shadow-2xl">
            <span>Back to About</span>
            <ChevronRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FounderProfile;