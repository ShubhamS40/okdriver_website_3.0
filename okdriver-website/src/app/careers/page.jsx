'use client'
import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, Users, TrendingUp, Heart, Star, ArrowRight, Filter, Search, Sparkles } from 'lucide-react';
import { color } from 'framer-motion';

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showComingSoon, setShowComingSoon] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleComingSoon = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 3000);
  };

  const departments = [
    { id: 'all', label: 'All Departments' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'product', label: 'Product' },
    { id: 'design', label: 'Design' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'sales', label: 'Sales' },
    { id: 'operations', label: 'Operations' }
  ];

  const locations = [
    { id: 'all', label: 'All Locations' },
    { id: 'remote', label: 'Remote' },
    { id: 'new-york', label: 'New York' },
    { id: 'san-francisco', label: 'San Francisco' },
    { id: 'london', label: 'London' },
    { id: 'singapore', label: 'Singapore' }
  ];

  // Empty job openings array - no positions available
  const jobOpenings = [];

  const companyStats = [
    { label: 'Team Members', value: '5+', icon: Users },
    { label: 'Countries', value: '6+', icon: MapPin },
    { label: 'Year Founded', value: '2025', icon: TrendingUp },
    { label: 'Employee Satisfaction', value: '4.8/5', icon: Star }
  ];

  const cultureValues = [
    {
      title: 'Innovation First',
      description: 'We encourage creative thinking and embrace new technologies to solve complex problems.',
      icon: '💡'
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and cross-functional collaboration.',
      icon: '🤝'
    },
    {
      title: 'Growth Mindset',
      description: 'We invest in our people\'s development and provide opportunities for continuous learning.',
      icon: '📈'
    },
    {
      title: 'Work-Life Balance',
      description: 'We support flexible working arrangements and prioritize employee well-being.',
      icon: '⚖️'
    }
  ];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Cursor Glow Effect */}
      <div 
        className="fixed pointer-events-none z-50 transition-opacity duration-300"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Coming Soon Toast */}
      {showComingSoon && (
       <div  
  className="fixed top-5 left-1/2 transform -translate-x-1/2 animate-slideDown"
  style={{ zIndex: 9999 }}
>
  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-8 py-4 shadow-2xl flex items-center space-x-3">
    <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
    <span className="text-white font-semibold text-lg">Coming Soon!</span>
  </div>
</div>

      )}

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center transform transition-all duration-1000" style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
          }}>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-pulse">
              Join Our <span className="text-white">Team</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Build the future of driver management with us. We're looking for passionate individuals to join our mission.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={handleComingSoon}
                className="group relative bg-white text-black px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                  View Open Positions
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button 
                onClick={handleComingSoon}
                className="group relative border-2 border-white/20 backdrop-blur-md bg-white/5 text-white px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  <Heart className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                  Learn About Culture
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-white/10 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 border border-white/10 rounded-lg animate-spin" style={{ animationDuration: '10s' }}></div>
      </section>

      {/* Company Stats */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 transform transition-all duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Work at OKDriver?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We're building the future of driver management technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyStats.map((stat, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/30 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 cursor-pointer"
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <stat.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 transition-colors">
                    {stat.value}
                  </h3>
                  <p className="text-gray-400 transition-colors group-hover:text-gray-300">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Values */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Culture & Values
            </h2>
            <p className="text-xl text-gray-400">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureValues.map((value, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/30 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 cursor-pointer"
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-6 transform transition-all duration-500 group-hover:scale-125">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 transition-colors group-hover:text-gray-300">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-400">
              Find your next opportunity with us
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all cursor-pointer"
                />
              </div>

              {/* Department Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-white/30 focus:border-white/30 appearance-none transition-all cursor-pointer"
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id} className="bg-black">
                      {dept.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-white/30 focus:border-white/30 appearance-none transition-all cursor-pointer"
                >
                  {locations.map((location) => (
                    <option key={location.id} value={location.id} className="bg-black">
                      {location.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* No Jobs Available Message */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-16 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <Briefcase className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                No Current Openings
              </h3>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                We don't have any open positions at the moment, but we're always looking for talented individuals. Submit your resume and we'll reach out when the right opportunity comes along.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={handleComingSoon}
                  className="group relative bg-white text-black px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center">
                    <Heart className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                    Submit Resume
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button 
                  onClick={handleComingSoon}
                  className="group relative border-2 border-white/20 backdrop-blur-md bg-white/5 text-white px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center">
                    <Star className="w-5 h-5 mr-2 transition-transform group-hover:rotate-180" />
                    Join Talent Pool
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Stay Connected
            </h2>
            <p className="text-xl mb-10 text-gray-400 max-w-2xl mx-auto">
              Don't miss out on future opportunities. Follow us on social media and be the first to know when new positions open up.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={handleComingSoon}
                className="group relative bg-white text-black px-10 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                  Get Job Alerts
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
                </span>
              </button>
              <button 
                onClick={handleComingSoon}
                className="group relative border-2 border-white/20 backdrop-blur-md bg-white/5 text-white px-10 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  <Heart className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                  Follow Us
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -100%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}