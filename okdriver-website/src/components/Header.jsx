'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import logo_white from '../../public/assets/OKDriverWhite_logo.png'; 
import logo_text_white from '../../public/assets/OkD- white_text.png'; 
import logo_text_black from '../../public/assets/okdriver_logo_text_black.png'; 
import logo_black from '../../public/assets/okdriverblack_logo.png'; 
import Image from 'next/image';
import { ChevronDown, LogIn } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const headerRef = useRef(null);
  const moreRef = useRef(null);
  const loginRef = useRef(null);
  const pathname = usePathname();

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
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setIsLoginOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to check if current page is active
  const isActivePage = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  // More dropdown items (Terms, Privacy, Careers)
  const moreDropdown = [
    { 
      href: '/terms', 
      label: 'Terms & Conditions',
      description: 'Our terms of service',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    { 
      href: '/privacy', 
      label: 'Privacy Policy',
      description: 'How we protect your data',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
    },
    { 
      href: '/careers', 
      label: 'Careers',
      description: 'Join our team',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0h-8m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6h12z'
    }
  ];

  // Login dropdown items
  const loginDropdown = [
    { 
      href: '/company/login', 
      label: 'Fleet Operator Login',
      description: 'For fleet managers',
      icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0'
    },
    { 
      href: '/user/login', 
      label: 'API Platform',
      description: 'Developer access',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
    }
  ];

  // Navigation items
  const navItems = [
    { href: '/', label: 'HOME', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/about', label: 'ABOUT US', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { href: '/services', label: 'SERVICES', icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' },
    { href: '/developer', label: 'DEVELOPER API', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { href: '/contact', label: 'CONTACT US', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
  ];

  return (
    <motion.header 
      ref={headerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 z-[100] w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-black/10 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-black shadow-lg' 
                    : 'bg-white/20 backdrop-blur-md border border-white/30 shadow-lg'
                }`}>
                  <Image 
                    src={isScrolled ? logo_white : logo_white} 
                    alt="OKDriver" 
                    width={40} 
                    height={40} 
                  />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
              </div>
              <span className={`ml-3 text-2xl font-bold tracking-tight transition-colors duration-300`}>
                <Image 
                  src={isScrolled ? logo_text_black : logo_text_white} 
                  alt="OKDriver" 
                  width={100} 
                  height={40} 
                />
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = isActivePage(item.href);
              
              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`px-4 py-2 font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                    isActive 
                      ? (isScrolled 
                          ? 'text-white bg-black rounded-full shadow-lg' 
                          : 'text-black bg-white/90 backdrop-blur-md rounded-full shadow-lg'
                        )
                      : (isScrolled 
                          ? 'text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg hover:shadow-md' 
                          : 'text-white hover:text-gray-200 hover:bg-white/10 backdrop-blur-md rounded-lg hover:shadow-md'
                        )
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div 
              ref={moreRef}
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button
                className={`px-4 py-2 font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center gap-1 ${
                  isActivePage('/terms') || isActivePage('/privacy') || isActivePage('/careers')
                    ? (isScrolled 
                        ? 'text-white bg-black rounded-full shadow-lg' 
                        : 'text-black bg-white/90 backdrop-blur-md rounded-full shadow-lg'
                      )
                    : (isScrolled 
                        ? 'text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg hover:shadow-md' 
                        : 'text-white hover:text-gray-200 hover:bg-white/10 backdrop-blur-md rounded-lg hover:shadow-md'
                      )
                }`}
              >
                MORE
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
                  >
                    {moreDropdown.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${
                          index !== moreDropdown.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                        onClick={() => setIsMoreOpen(false)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0">
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 mb-1">{item.label}</div>
                            <div className="text-sm text-gray-600">{item.description}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Login Button with Dropdown */}
          <div className="hidden lg:block">
            <div 
              ref={loginRef}
              className="relative"
              onMouseEnter={() => setIsLoginOpen(true)}
              onMouseLeave={() => setIsLoginOpen(false)}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 overflow-hidden hover:shadow-lg flex items-center gap-2 ${
                  isScrolled 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-white text-black hover:bg-gray-100 backdrop-blur-md'
                }`}
              >
                Login
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLoginOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isLoginOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
                  >
                    {loginDropdown.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${
                          index !== loginDropdown.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                        onClick={() => setIsLoginOpen(false)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0">
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 mb-1">{item.label}</div>
                            <div className="text-sm text-gray-600">{item.description}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
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
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 lg:hidden z-40 backdrop-blur-sm"
                onClick={closeMenu}
              />
              
              {/* Mobile Menu */}
              <motion.div 
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl lg:hidden z-50 overflow-y-auto max-h-[80vh] rounded-b-2xl"
              >
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/80 to-white/80">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-black tracking-tight">
                      Menu
                    </span>
                  </div>
                  <button 
                    onClick={closeMenu}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <nav className="py-4 px-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {navItems.map((item) => {
                    const isActive = isActivePage(item.href);
                    
                    return (
                      <Link 
                        key={item.href}
                        href={item.href} 
                        className={`block px-4 py-3 rounded-lg font-medium flex items-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-black text-white shadow-lg' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={closeMenu}
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                        {item.label}
                      </Link>
                    );
                  })}

                  {/* Mobile More Section */}
                  <div className="md:col-span-2 border-t border-gray-200 pt-3 mt-2">
                    <p className="px-4 text-xs font-semibold text-gray-500 mb-2">MORE</p>
                    {moreDropdown.map((item) => {
                      const isActive = isActivePage(item.href);
                      return (
                        <Link 
                          key={item.href}
                          href={item.href} 
                          className={`block px-4 py-3 rounded-lg mb-2 transition-all duration-300 ${
                            isActive 
                              ? 'bg-black text-white shadow-lg' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={closeMenu}
                        >
                          <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            <div>
                              <div className="font-medium">{item.label}</div>
                              <div className={`text-xs mt-1 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mobile Login Section */}
                  <div className="md:col-span-2 border-t border-gray-200 pt-3 mt-2">
                    <p className="px-4 text-xs font-semibold text-gray-500 mb-2">LOGIN</p>
                    {loginDropdown.map((item) => (
                      <Link 
                        key={item.href}
                        href={item.href} 
                        className="block px-4 py-3 rounded-lg mb-2 text-gray-700 hover:bg-gray-50 transition-all duration-300"
                        onClick={closeMenu}
                      >
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                          </svg>
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs mt-1 text-gray-500">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}