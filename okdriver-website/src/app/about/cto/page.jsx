'use client'
import React from 'react';
import { ChevronRight, Award, Code, Database, Cpu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import cto from './../../../../public/assets/about_image/cto.png';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const CTOProfile = () => {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Header Section */}
      <motion.div 
        className="bg-black text-white py-8 sm:py-12 md:py-16 px-4 relative overflow-hidden w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          {/* Breadcrumb */}
          <motion.div 
            className="flex items-center space-x-2 text-xs sm:text-sm mb-4 sm:mb-6 md:mb-8 opacity-80 flex-wrap"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link href="/" className="hover:text-gray-300 cursor-pointer transition-colors">
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="flex-shrink-0" />
            <Link href="/about" className="hover:text-gray-300 cursor-pointer transition-colors">
              <span>About</span>
            </Link>
            <ChevronRight size={14} className="flex-shrink-0" />
            <span className="text-gray-300">Software Developer</span>
          </motion.div>
          
          <motion.div 
            className="text-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight px-2">
              SOFTWARE DEVELOPER
            </h1>
            <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-white mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16 w-full">
        <motion.div 
          className="bg-white shadow-xl sm:shadow-2xl border border-gray-200 overflow-hidden rounded-lg sm:rounded-xl w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid lg:grid-cols-2 gap-0 w-full">
            {/* Image Section - Fixed for mobile */}
            <div className="relative w-full order-1 lg:order-1">
              <motion.div 
                className="aspect-square sm:aspect-[4/5] lg:aspect-[4/5] bg-gray-100 flex items-center justify-center w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full bg-gray-50 flex items-center justify-center relative overflow-hidden">
                  <Image 
                    src={cto} 
                    alt="Software Developer Image" 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    style={{ objectFit: "cover" }}
                    className="object-cover object-center"
                    priority
                  />
                  <motion.div 
                    className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-black shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <span className="whitespace-nowrap">Software Developer</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Content Section */}
            <motion.div 
              className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center w-full order-2 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div className="mb-4 sm:mb-6" variants={fadeIn}>
                <p className="text-black font-semibold text-sm sm:text-base lg:text-lg mb-2 opacity-80">
                  Software Developer, okDriver Smart Dashcams Private Limited
                </p>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-black mb-4 leading-tight break-words">
                  SHUBHAM SINGH
                </h2>
              </motion.div>

              {/* Bio Content */}
              <motion.div className="space-y-3 sm:space-y-4 md:space-y-6 text-gray-700 leading-relaxed" variants={fadeIn}>
                <p className="text-sm sm:text-base lg:text-lg">
                  Shubham Singh is a Software Developer at okDriver Smart Dashcams Private Limited. With his expertise in 
                  <span className="font-semibold text-black"> mobile development</span> and 
                  <span className="font-semibold text-black"> AI integration</span>, he leads the technical vision 
                  and development of our innovative driver management platform.
                </p>

                <motion.div 
                  className="bg-black text-white p-3 sm:p-4 md:p-6 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="italic font-medium text-xs sm:text-sm lg:text-base leading-relaxed">
                    "Technology should solve real problems and make life easier. At OKDriver, we're building 
                    intelligent systems that transform how businesses manage their drivers and ensure road safety."
                  </p>
                </motion.div>

                <p className="text-xs sm:text-sm lg:text-base">
                  As the technical brain behind OKDriver, Shubham oversees all aspects of our software development, 
                  from backend infrastructure to AI algorithms. His innovative approach to technology has been 
                  instrumental in creating our seamless, user-friendly platform that addresses the complex challenges 
                  of driver management.
                </p>

                <p className="text-xs sm:text-sm lg:text-base">
                  With a background in computer science and extensive experience in software development, 
                  Shubham brings technical excellence and forward-thinking leadership to our team. His passion 
                  for creating technology that makes a difference drives our continuous innovation.
                </p>
              </motion.div>

              {/* Technical Skills */}
              <motion.div 
                className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 border-t border-gray-200"
                variants={fadeIn}
              >
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 sm:mb-2">AI</div>
                  <div className="text-xs sm:text-sm text-gray-600">Integration Expert</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 sm:mb-2">Mobile</div>
                  <div className="text-xs sm:text-sm text-gray-600">Development Specialist</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Technical Expertise Section */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
            variants={fadeIn}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
                <Code className="text-black" size={16} />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-black leading-tight">Frontend Development</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
              Expert in creating intuitive, responsive user interfaces that provide seamless experiences across all devices.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
            variants={fadeIn}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-900 rounded-lg flex items-center justify-center mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
                <Database className="text-white" size={16} />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-black leading-tight">Backend Systems</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
              Designs robust, scalable backend architectures that power our applications with reliability and performance.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1"
            variants={fadeIn}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
                <Cpu className="text-black" size={16} />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-black leading-tight">AI Integration</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
              Specializes in implementing artificial intelligence solutions that enhance driver monitoring and safety features.
            </p>
          </motion.div>
        </motion.div>

        {/* Technical Leadership */}
        <motion.div 
          className="bg-black rounded-2xl sm:rounded-3xl text-white p-4 sm:p-6 md:p-8 lg:p-12 mt-8 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Technical Leadership</h3>
            <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-white mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award size={20} className="text-black" />
              </div>
              <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">Technical Vision</h4>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                Drives the technical roadmap and architecture decisions for all OKDriver products.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Code size={20} className="text-white" />
              </div>
              <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">Development Excellence</h4>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                Ensures high-quality code standards and efficient development practices across all teams.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center sm:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Cpu size={20} className="text-black" />
              </div>
              <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">Innovation Focus</h4>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                Constantly explores new technologies to keep OKDriver at the cutting edge of driver management solutions.
              </p>
            </motion.div>
          </div>

          <motion.div 
            className="mt-6 sm:mt-8 md:mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link href="/about" className="inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors duration-300 text-sm sm:text-base">
              Back to About
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTOProfile;