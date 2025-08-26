// components/LoadingBar.js
'use client'

import { useState, useEffect } from 'react';

const LoadingBar = ({ isVisible = false, duration = 5000 }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading');

  // Animated loading text
  useEffect(() => {
    if (!isVisible) return;
    
    const texts = ['Loading', 'Loading.', 'Loading..', 'Loading...'];
    let textIndex = 0;
    
    const textInterval = setInterval(() => {
      setLoadingText(texts[textIndex]);
      textIndex = (textIndex + 1) % texts.length;
    }, 400);
    
    return () => clearInterval(textInterval);
  }, [isVisible]);

  // Progress animation based on duration
  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      return;
    }
    
    setProgress(0);
    const totalSteps = duration / 50; // 50ms intervals
    const incrementValue = 100 / totalSteps;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + incrementValue;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 50);
    
    return () => clearInterval(progressInterval);
  }, [isVisible, duration]);

  if (!isVisible) return null;

  return (
    <>
      <div className="loading-overlay">
        <div className="loading-container">
          {/* Main Spinner with Glow Effect */}
          <div className="spinner-wrapper">
            <div className="spinner-glow"></div>
            <div className="spinner">
              <div className="spinner-inner"></div>
              <div className="spinner-dots">
                <div className="dot dot-1"></div>
                <div className="dot dot-2"></div>
                <div className="dot dot-3"></div>
                <div className="dot dot-4"></div>
              </div>
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="loading-text">{loadingText}</div>
          
          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-text">{Math.round(progress)}%</div>
          </div>
          
          {/* Route Info */}
          <div className="route-info">Preparing your page...</div>
          
          {/* Floating Particles */}
          <div className="particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeIn 0.5s ease-out;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .spinner-wrapper {
          position: relative;
          margin-bottom: 30px;
        }
        
        .spinner-glow {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .spinner {
          width: 80px;
          height: 80px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          border-top-color: #3b82f6;
          border-right-color: #8b5cf6;
          animation: spin 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
          position: relative;
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
        }
        
        .spinner-inner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          border-bottom-color: #ec4899;
          border-left-color: #10b981;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: spin-reverse 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        
        .spinner-dots {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #ffffff;
          border-radius: 50%;
          animation: dot-pulse 2s ease-in-out infinite;
        }
        
        .dot-1 { top: 0; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
        .dot-2 { right: 0; top: 50%; transform: translateY(-50%); animation-delay: 0.5s; }
        .dot-3 { bottom: 0; left: 50%; transform: translateX(-50%); animation-delay: 1s; }
        .dot-4 { left: 0; top: 50%; transform: translateY(-50%); animation-delay: 1.5s; }
        
        .loading-text {
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 25px;
          font-family: 'Arial', sans-serif;
          letter-spacing: 1px;
          animation: text-glow 2s ease-in-out infinite;
        }
        
        .progress-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .progress-bar {
          width: 250px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shimmer 1.5s infinite;
        }
        
        .progress-text {
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          opacity: 0.8;
        }
        
        .route-info {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          font-weight: 400;
          animation: fade-pulse 2s ease-in-out infinite;
        }
        
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: float 4s ease-in-out infinite;
        }
        
        .particle-1 { top: 20%; left: 10%; animation-delay: 0s; }
        .particle-2 { top: 60%; right: 15%; animation-delay: 1s; }
        .particle-3 { bottom: 30%; left: 20%; animation-delay: 2s; }
        .particle-4 { top: 40%; right: 25%; animation-delay: 3s; }
        .particle-5 { bottom: 20%; right: 10%; animation-delay: 1.5s; }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.8;
          }
        }
        
        @keyframes dot-pulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes text-glow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            opacity: 0.8;
          }
          50% { 
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
            opacity: 1;
          }
        }
        
        @keyframes fade-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.4;
          }
          25% { 
            transform: translateY(-20px) rotate(90deg);
            opacity: 1;
          }
          50% { 
            transform: translateY(-10px) rotate(180deg);
            opacity: 0.6;
          }
          75% { 
            transform: translateY(-15px) rotate(270deg);
            opacity: 0.8;
          }
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @media (max-width: 768px) {
          .spinner {
            width: 60px;
            height: 60px;
          }
          
          .spinner-inner {
            width: 40px;
            height: 40px;
          }
          
          .loading-text {
            font-size: 16px;
          }
          
          .progress-bar {
            width: 200px;
          }
        }
      `}</style>
    </>
  );
};

export default LoadingBar;