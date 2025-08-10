'use client'
import React, { useState } from "react";

const testimonials = [
  {
    name: "Shubham Sharma",
    role: "Lead AI Engineer",
    message:
      "The OkDriver Dashcam app has transformed road safety for me. Real-time alerts and the smooth voice assistant make long drives safer and stress-free.",
    rating: 5,
    avatar: "SS"
  },
  {
    name: "Serin Thomas",
    role: "Fleet Operations Manager",
    message:
      "With OkDriver, monitoring our fleet has become seamless. The fatigue alerts and SOS features have helped us reduce on-road incidents dramatically.",
    rating: 5,
    avatar: "ST"
  },
  {
    name: "Janvi Patel",
    role: "Customer Success Specialist",
    message:
      "I love how OkDriver puts driver safety first. The offline mode is perfect for areas with poor connectivity, and the app still works flawlessly.",
    rating: 5,
    avatar: "JP"
  },
  {
    name: "Sneha Kapoor",
    role: "Product Designer",
    message:
      "Designing for OkDriver has been an exciting challenge. The black-and-white dashboard theme keeps things elegant and easy to read for all drivers.",
    rating: 5,
    avatar: "SK"
  },
];

const StarIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-8 h-8 opacity-30" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
  </svg>
);

export default function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="bg-black text-white py-20 relative overflow-hidden">
      {/* Background Pattern */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-gray-600 to-gray-400 mb-6">
            <div className="bg-black px-6 py-2 rounded-full">
              <span className="text-sm font-medium text-gray-300 uppercase tracking-wider">Testimonials</span>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            What People Say About{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              OkDriver
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover how OkDriver is transforming road safety and fleet management for thousands of users
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div className={`
                relative bg-gray-900 border border-gray-700 rounded-2xl p-8 
                transform transition-all duration-500 ease-out
                hover:scale-105 hover:border-gray-500 hover:shadow-2xl
                ${hoveredIndex === index ? 'shadow-2xl shadow-white/10' : 'shadow-lg shadow-black/50'}
              `}>
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-gray-600">
                  <QuoteIcon />
                </div>
                
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`text-white transform transition-all duration-300 ${
                        hoveredIndex === index ? 'scale-110' : ''
                      }`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <StarIcon />
                    </div>
                  ))}
                </div>

                {/* Message */}
                <blockquote className="text-lg sm:text-xl leading-relaxed mb-8 text-gray-100 relative z-10">
                  &quot;{testimonial.message}&quot;
                </blockquote>

                {/* Profile */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className={`
                    w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full 
                    flex items-center justify-center font-bold text-white text-lg
                    transform transition-all duration-300
                    ${hoveredIndex === index ? 'scale-110 rotate-6' : ''}
                  `}>
                    {testimonial.avatar}
                  </div>
                  
                  {/* Info */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400 font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className={`
                  absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500 to-gray-400 opacity-0 
                  transition-opacity duration-300 -z-10
                  ${hoveredIndex === index ? 'opacity-20' : ''}
                `} />
              </div>

              {/* Floating Elements */}
              <div className={`
                absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-0
                transition-all duration-500 transform
                ${hoveredIndex === index ? 'opacity-60 scale-100' : 'scale-0'}
              `} />
              <div className={`
                absolute -bottom-2 -left-2 w-3 h-3 bg-gray-400 rounded-full opacity-0
                transition-all duration-700 transform
                ${hoveredIndex === index ? 'opacity-40 scale-100' : 'scale-0'}
              `} />
            </div>
          ))}
        </div>

              </div>

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-white rounded-full opacity-30 animate-pulse" />
      <div className="absolute top-3/4 right-16 w-1 h-1 bg-gray-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
}