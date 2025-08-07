'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
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

  // Navigation items
  const navItems = [
    { href: '/', label: 'HOME', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/about', label: 'ABOUT US', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { href: '/services', label: 'SERVICES', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { href: '/terms', label: 'TERMS', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { href: '/privacy', label: 'PRIVACY', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
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

          {/* Desktop Navigation - With Active State */}
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
          </nav>

          {/* CTA Button - Enhanced for hero section */}
          <div className="hidden lg:block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/admin/login" 
                className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 overflow-hidden hover:shadow-lg ${
                  isScrolled 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-white text-black hover:bg-gray-100 backdrop-blur-md'
                }`}
              >
                GET STARTED
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button - Color adaptive */}
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

        {/* Mobile Navigation - With Active State */}
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

                  {/* Mobile CTA Button */}
                  <div className="md:col-span-2 p-4 border-t border-gray-200">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link 
                        href="/admin/login" 
                        className="block w-full px-4 py-3 bg-black text-white font-medium text-center rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg"
                        onClick={closeMenu}
                      >
                        GET STARTED
                      </Link>
                    </motion.div>
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