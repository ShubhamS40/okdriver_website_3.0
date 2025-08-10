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
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <motion.div 
        className="bg-black text-white py-12 md:py-16 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <motion.div 
            className="flex items-center space-x-2 text-sm mb-6 md:mb-8 opacity-80"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link href="/" className="hover:text-gray-300 cursor-pointer transition-colors">
              <span>Home</span>
            </Link>
            <ChevronRight size={16} />
            <Link href="/about" className="hover:text-gray-300 cursor-pointer transition-colors">
              <span>About</span>
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-300">CTO</span>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              CHIEF TECHNOLOGY OFFICER
            </h1>
            <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <motion.div 
          className="bg-white shadow-2xl border border-gray-200 overflow-hidden rounded-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative">
              <motion.div 
                className="aspect-square lg:aspect-[4/5] bg-gray-100 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full bg-gray-50 flex items-center justify-center relative overflow-hidden">
                  <Image src={cto} alt="CTO Image" className="object-cover w-full h-full" />
                  <motion.div 
                    className="absolute bottom-4 left-4 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-black shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    Chief Technology Officer
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Content Section */}
            <motion.div 
              className="p-6 md:p-8 lg:p-12 flex flex-col justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div className="mb-6" variants={fadeIn}>
                <p className="text-black font-semibold text-lg mb-2 opacity-80">CTO, okDriver Smart Dashcams Private Limited</p>
                <h2 className="text-3xl lg:text-5xl font-bold text-black mb-4">
                  SHUBHAM SINGH
                </h2>
              </motion.div>

              {/* Bio Content */}
              <motion.div className="space-y-6 text-gray-700 leading-relaxed" variants={fadeIn}>
                <p className="text-lg">
                  Shubham Singh is the Chief Technology Officer at okDriver Smart Dashcams Private Limited. With his expertise in 
                  <span className="font-semibold text-black"> mobile development</span> and 
                  <span className="font-semibold text-black"> AI integration</span>, he leads the technical vision 
                  and development of our innovative driver management platform.
                </p>

                <motion.div 
                  className="bg-black text-white p-6 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="italic font-medium">
                    "Technology should solve real problems and make life easier. At OKDriver, we're building 
                    intelligent systems that transform how businesses manage their drivers and ensure road safety."
                  </p>
                </motion.div>

                <p>
                  As the technical brain behind OKDriver, Shubham oversees all aspects of our software development, 
                  from backend infrastructure to AI algorithms. His innovative approach to technology has been 
                  instrumental in creating our seamless, user-friendly platform that addresses the complex challenges 
                  of driver management.
                </p>

                <p>
                  With a background in computer science and extensive experience in software development, 
                  Shubham brings technical excellence and forward-thinking leadership to our team. His passion 
                  for creating technology that makes a difference drives our continuous innovation.
                </p>
              </motion.div>

              {/* Technical Skills */}
              <motion.div 
                className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200"
                variants={fadeIn}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-black mb-2">AI</div>
                  <div className="text-sm text-gray-600">Integration Expert</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-black mb-2">Mobile</div>
                  <div className="text-sm text-gray-600">Development Specialist</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Technical Expertise Section */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
            variants={fadeIn}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                <Code className="text-black" size={24} />
              </div>
              <h3 className="text-xl font-bold text-black">Frontend Development</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Expert in creating intuitive, responsive user interfaces that provide seamless experiences across all devices.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
            variants={fadeIn}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mr-4">
                <Database className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-black">Backend Systems</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Designs robust, scalable backend architectures that power our applications with reliability and performance.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
            variants={fadeIn}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                <Cpu className="text-black" size={24} />
              </div>
              <h3 className="text-xl font-bold text-black">AI Integration</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Specializes in implementing artificial intelligence solutions that enhance driver monitoring and safety features.
            </p>
          </motion.div>
        </motion.div>

        {/* Technical Leadership */}
        <motion.div 
          className="bg-black rounded-3xl text-white p-6 md:p-8 lg:p-12 mt-12 md:mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Technical Leadership</h3>
            <div className="w-16 h-1 bg-white mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={28} className="text-black" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Technical Vision</h4>
              <p className="text-gray-300">
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
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code size={28} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Development Excellence</h4>
              <p className="text-gray-300">
                Ensures high-quality code standards and efficient development practices across all teams.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu size={28} className="text-black" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Innovation Focus</h4>
              <p className="text-gray-300">
                Constantly explores new technologies to keep OKDriver at the cutting edge of driver management solutions.
              </p>
            </motion.div>
          </div>

          <motion.div 
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link href="/about" className="inline-block px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors duration-300">
              Back to About
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTOProfile;