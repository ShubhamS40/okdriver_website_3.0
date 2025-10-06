'use client';
import React from 'react';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      {/* Main Content */}
      <div className="text-center z-10">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-wide mb-4 bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent animate-pulse">
          Coming Soon
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto">
          We’re working hard to bring you something amazing. Stay tuned!
        </p>
      </div>

      {/* Simple Glow Animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
