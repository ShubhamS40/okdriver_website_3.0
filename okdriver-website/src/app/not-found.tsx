'use client'
import { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft, Car, MapPin, Phone, Mail } from 'lucide-react';

// Note: In a real Next.js project, you would import images like this:
import logo_white from '../../public/assets/OKDriverWhite_logo.png'; 
import logo_text_white from '../../public/assets/OkD- white_text.png'; 

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGoHome = () => {
    // Replace with your actual home route
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const quickLinks = [
    { name: 'Book a Ride', path: '/book', icon: Car },
    { name: 'Track Location', path: '/track', icon: MapPin },
    { name: 'Contact Us', path: '/contact', icon: Phone },
    { name: 'Support', path: '/support', icon: Mail }
  ];

  return (
    <div className="min-h-screen pt-25 bg-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Moving gradient orbs */}
        <div 
          className="absolute w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-white opacity-3 rounded-full blur-2xl top-1/2 right-1/4 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`
          }}
        />
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Logo/Brand Area */}
        <div className="mb-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-4 mb-4">
            <img 
              src="/assets/OKDriverWhite_logo.png" 
              alt="OKDriver Logo"
              className="h-16 w-16 object-contain"
            />
            <img 
              src="/assets/OkD- white_text.png" 
              alt="OKDriver Text"
              className="h-12 object-contain"
            />
          </div>
        </div>

        {/* 404 Animation */}
        <div className="text-center mb-8">
          <div className="relative">
            <h2 className="text-8xl md:text-9xl font-black mb-4 relative">
              <span className="inline-block animate-bounce" style={{animationDelay: '0s'}}>4</span>
              <span className="inline-block animate-bounce mx-4" style={{animationDelay: '0.1s'}}>0</span>
              <span className="inline-block animate-bounce" style={{animationDelay: '0.2s'}}>4</span>
            </h2>
            <div className="absolute inset-0 text-8xl md:text-9xl font-black text-white opacity-20 blur-sm">
              <span className="inline-block">4</span>
              <span className="inline-block mx-4">0</span>
              <span className="inline-block">4</span>
            </div>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Route Not Found
          </h3>
          
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
            Looks like you've taken a wrong turn. Don't worry, even the best drivers need directions sometimes!
          </p>
        </div>

        {/* Interactive Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={handleGoHome}
            className="group flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-2xl transform"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span>Go Home</span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="group flex items-center space-x-3 border-2 border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 transform"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Go Back</span>
          </button>
        </div>

        </div>

   



      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        /* Hover effect for the entire page */
        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}