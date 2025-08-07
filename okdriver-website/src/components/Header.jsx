'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);

  // Handle scroll effect with proper hydration
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Set initial state
    setIsScrolled(window.scrollY > 50);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  // Enhanced dropdown menu items
  const servicesItems = [
    { name: 'Driver Training', href: '/services/training', icon: '🚗', desc: 'Professional driving courses' },
    { name: 'Vehicle Inspection', href: '/services/inspection', icon: '🔍', desc: 'Complete vehicle safety checks' },
    { name: 'Road Safety Monitoring', href: '/services/monitoring', icon: '📡', desc: 'Real-time safety tracking' },
    { name: 'Fleet Management', href: '/services/fleet', icon: '🚛', desc: 'Manage your vehicle fleet' },
    { name: 'Emergency Response', href: '/services/emergency', icon: '🚨', desc: '24/7 emergency assistance' },
    { name: 'Insurance Services', href: '/services/insurance', icon: '🛡️', desc: 'Vehicle insurance solutions' }
  ];

  const aboutItems = [
    { name: 'Our Story', href: '/about/story', icon: '📖', desc: 'How we started' },
    { name: 'Team', href: '/about/team', icon: '👥', desc: 'Meet our experts' },
    { name: 'Founder', href: '/about/founder', highlight: true, icon: '⭐', desc: 'Visionary leader' },
    { name: 'Awards', href: '/about/awards', icon: '🏆', desc: 'Recognition & achievements' },
    { name: 'Careers', href: '/about/careers', icon: '💼', desc: 'Join our team' }
  ];

  const contactItems = [
    { name: 'Get in Touch', href: '/contact', icon: '📞', desc: 'Reach out to us' },
    { name: 'Support', href: '/contact/support', icon: '🎧', desc: '24/7 customer support' },
    { name: 'Locations', href: '/contact/locations', icon: '📍', desc: 'Find us near you' },
    { name: 'Live Chat', href: '/contact/chat', icon: '💬', desc: 'Instant assistance' }
  ];

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg mx-auto px-4 md:px-8 lg:px-12 rounded-b-2xl border-b border-gray-200 max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mt-2' 
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Logo - Enhanced for hero section visibility */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-black shadow-lg' 
                    : 'bg-white/20 backdrop-blur-md border border-white/30 shadow-lg'
                }`}>
                  <span className={`font-bold text-lg transition-colors duration-300 ${
                    isScrolled ? 'text-white' : 'text-white'
                  }`}>
                    OK
                  </span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
              </div>
              <span className={`ml-3 text-2xl font-bold tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-white drop-shadow-lg'
              }`}>
                OKDriver
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Color adaptive */}
          <nav className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
            
            {/* Home */}
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                isScrolled 
                  ? 'text-white bg-black hover:bg-gray-800' 
                  : 'text-black bg-white/90 backdrop-blur-md hover:bg-white shadow-lg'
              }`}
            >
              HOME
            </Link>

            {/* About Us Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('about')}
                className={`px-4 py-2 font-medium flex items-center transition-all duration-300 rounded-lg hover:shadow-md ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-black hover:bg-gray-50' 
                    : 'text-white hover:text-gray-200 hover:bg-white/10 backdrop-blur-md'
                }`}
              >
                ABOUT US
                <svg 
                  className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${
                    activeDropdown === 'about' ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-4 border border-gray-200/50 animate-in slide-in-from-top-2 duration-200 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 mb-2">
                    <h3 className="text-sm font-semibold text-gray-900">About OKDriver</h3>
                  </div>
                  {aboutItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm transition-all duration-200 hover:bg-gray-50 mx-2 rounded-xl group ${
                        item.highlight 
                          ? 'text-amber-600 hover:text-amber-700 bg-amber-50' 
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                      </div>
                      {item.highlight && (
                        <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">VIP</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('services')}
                className={`px-4 py-2 font-medium flex items-center transition-all duration-300 rounded-lg hover:shadow-md ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-black hover:bg-gray-50' 
                    : 'text-white hover:text-gray-200 hover:bg-white/10 backdrop-blur-md'
                }`}
              >
                SERVICES
                <svg 
                  className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${
                    activeDropdown === 'services' ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-3 w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-4 border border-gray-200/50 animate-in slide-in-from-top-2 duration-200 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 mb-2">
                    <h3 className="text-sm font-semibold text-gray-900">Our Services</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-1 px-2">
                    {servicesItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex flex-col p-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 rounded-xl group hover:shadow-md"
                      >
                        <div className="flex items-center mb-2">
                          <span className="mr-2 text-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                          <div className="font-medium text-gray-900">{item.name}</div>
                        </div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Regular Links */}
            <Link 
              href="/terms" 
              className={`px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:shadow-md ${
                isScrolled 
                  ? 'text-gray-700 hover:text-black hover:bg-gray-50' 
                  : 'text-white hover:text-gray-200 hover:bg-white/10 backdrop-blur-md'
              }`}
            >
              TERMS
            </Link>
            <Link 
              href="/privacy" 
              className={`px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:shadow-md ${
                isScrolled 
                  ? 'text-gray-700 hover:text-black hover:bg-gray-50' 
                  : 'text-white hover:text-gray-200 hover:bg-white/10 backdrop-blur-md'
              }`}
            >
              PRIVACY
            </Link>

            {/* Contact Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('contact')}
                className={`px-4 py-2 font-medium flex items-center transition-all duration-300 rounded-lg hover:shadow-md ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-black hover:bg-gray-50' 
                    : 'text-white hover:text-gray-200 hover:bg-white/10 backdrop-blur-md'
                }`}
              >
                CONTACT US
                <svg 
                  className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${
                    activeDropdown === 'contact' ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'contact' && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-4 border border-gray-200/50 animate-in slide-in-from-top-2 duration-200 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 mb-2">
                    <h3 className="text-sm font-semibold text-gray-900">Get in Touch</h3>
                  </div>
                  {contactItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 mx-2 rounded-xl group hover:shadow-md"
                    >
                      <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* CTA Button - Enhanced for hero section */}
          <div className="hidden lg:block">
            <Link 
              href="/admin/login" 
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 group overflow-hidden hover:shadow-lg transform hover:scale-105 ${
                isScrolled 
                  ? 'border-2 border-gray-300 text-gray-700 hover:border-black hover:text-white' 
                  : 'border-2 border-white/50 text-white hover:border-white backdrop-blur-md bg-white/10'
              }`}
            >
              <span className="relative z-10 transition-colors duration-300">GET STARTED</span>
              <div className={`absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                isScrolled ? 'bg-black' : 'bg-white'
              }`}></div>
              <span className={`absolute inset-0 flex items-center justify-center font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isScrolled ? 'text-white' : 'text-black'
              }`}>
                GET STARTED
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button - Color adaptive */}
          <button 
            className={`lg:hidden p-2 rounded-md transition-all duration-200 ${
              isScrolled 
                ? 'hover:bg-gray-100' 
                : 'hover:bg-white/10 backdrop-blur-md'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span 
                className={`absolute block w-full h-0.5 rounded-full top-3 origin-center transform transition-all duration-300 ${
                  isScrolled ? 'bg-black' : 'bg-white'
                } ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}
              />
              <span 
                className={`absolute block w-full h-0.5 rounded-full top-3 origin-center transform transition-all duration-300 ${
                  isScrolled ? 'bg-black' : 'bg-white'
                } ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span 
                className={`absolute block w-full h-0.5 rounded-full top-3 origin-center transform transition-all duration-300 ${
                  isScrolled ? 'bg-black' : 'bg-white'
                } ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation - Enhanced */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/60 lg:hidden z-40 backdrop-blur-sm"
              onClick={closeMenu}
            />
            
            {/* Sliding Menu */}
            <div 
              className={`fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl lg:hidden z-50 overflow-y-auto transform transition-transform duration-300 ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/80 to-white/80">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">OK</span>
                  </div>
                  <span className="ml-3 text-xl font-bold text-black tracking-tight">
                    OKDriver
                  </span>
                </div>
                <button 
                  onClick={closeMenu}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav className="py-6 px-4 space-y-3">
                {/* Home */}
                <Link 
                  href="/" 
                  className="block px-4 py-3 rounded-lg bg-black text-white font-medium flex items-center hover:bg-gray-800 transition-all duration-300 shadow-lg"
                  onClick={closeMenu}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  HOME
                </Link>
                
                {/* About Us */}
                <div className="space-y-1">
                  <button
                    onClick={() => handleDropdownToggle('mobile-about')}
                    className="w-full text-left px-4 py-3 text-gray-700 font-medium flex items-center justify-between hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ABOUT US
                    </div>
                    <svg className={`w-4 h-4 transform transition-transform duration-300 ${
                      activeDropdown === 'mobile-about' ? 'rotate-180' : ''
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'mobile-about' && (
                    <div className="ml-4 space-y-1 animate-in slide-in-from-top-1 duration-200">
                      {aboutItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-200 ml-8 ${
                            item.highlight 
                              ? 'text-amber-600 hover:text-amber-700 bg-amber-50 border-l-2 border-amber-400' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          onClick={closeMenu}
                        >
                          <span className="mr-2 text-base">{item.icon}</span>
                          {item.name}
                          {item.highlight && <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">VIP</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Services */}
                <div className="space-y-1">
                  <button
                    onClick={() => handleDropdownToggle('mobile-services')}
                    className="w-full text-left px-4 py-3 text-gray-700 font-medium flex items-center justify-between hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      SERVICES
                    </div>
                    <svg className={`w-4 h-4 transform transition-transform duration-300 ${
                      activeDropdown === 'mobile-services' ? 'rotate-180' : ''
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'mobile-services' && (
                    <div className="ml-4 space-y-1 animate-in slide-in-from-top-1 duration-200">
                      {servicesItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 ml-8"
                          onClick={closeMenu}
                        >
                          <span className="mr-2 text-base">{item.icon}</span>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Terms */}
                <Link 
                  href="/terms" 
                  className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center"
                  onClick={closeMenu}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  TERMS
                </Link>

                {/* Privacy */}
                <Link 
                  href="/privacy" 
                  className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center"
                  onClick={closeMenu}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  PRIVACY
                </Link>

                {/* Contact Us */}
                <div className="space-y-1">
                  <button
                    onClick={() => handleDropdownToggle('mobile-contact')}
                    className="w-full text-left px-4 py-3 text-gray-700 font-medium flex items-center justify-between hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      CONTACT US
                    </div>
                    <svg className={`w-4 h-4 transform transition-transform duration-300 ${
                      activeDropdown === 'mobile-contact' ? 'rotate-180' : ''
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'mobile-contact' && (
                    <div className="ml-4 space-y-1 animate-in slide-in-from-top-1 duration-200">
                      {contactItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 ml-8"
                          onClick={closeMenu}
                        >
                          <span className="mr-2 text-base">{item.icon}</span>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile CTA Button */}
                <div className="pt-6 mt-6 border-t border-gray-200">
                  <Link 
                    href="/admin/login" 
                    className="block w-full px-4 py-3 bg-black text-white font-medium text-center rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg"
                    onClick={closeMenu}
                  >
                    GET STARTED
                  </Link>
                </div>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
} 