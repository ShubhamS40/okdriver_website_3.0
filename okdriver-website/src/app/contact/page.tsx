'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, Mail, Phone, Clock, MessageCircle, Send, 
  CheckCircle, Facebook, Twitter, Instagram, Github,
  Headphones, Users, Award, Star
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError(false);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you for your message. We will get back to you soon!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Office',
      details: '123 Driver Street, Tech City, India',
      color: 'from-blue-600 to-blue-800'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@okdriver.com',
      color: 'from-green-600 to-green-800'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (123) 456-7890',
      color: 'from-purple-600 to-purple-800'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      details: 'Round-the-clock assistance',
      color: 'from-orange-600 to-orange-800'
    }
  ];

  const businessHours = [
    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', time: 'Closed' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Twitter, href: '#', color: 'hover:text-sky-500' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Github, href: '#', color: 'hover:text-gray-400' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="container-custom py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-400 leading-relaxed">
            Get in touch with our team for any inquiries, support needs, or to learn more about our AI-powered driving solutions.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                >
                  <div className="relative p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${info.color} mb-6 transform transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {info.details}
                    </p>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-300 group-hover:border-black/20" />
                </div>
              );
            })}
          </div>

          {/* Main Contact Section */}
          <div className="grid md:grid-cols-2 gap-16 items-start">
            
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-black rounded-lg mr-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Send Us a Message</h2>
              </div>
              
              {submitMessage && (
                <div className={`p-4 mb-6 rounded-xl flex items-center space-x-3 ${
                  submitError 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'bg-green-100 text-green-700 border border-green-200'
                }`}>
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{submitMessage}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Subscription Plans">Subscription Plans</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Billing Issue">Billing Issue</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex justify-center items-center space-x-3 transform hover:scale-[1.02]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              
              {/* Business Hours */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-black rounded-lg mr-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Business Hours</h3>
                </div>
                <div className="space-y-4">
                  {businessHours.map((hour, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="font-semibold text-gray-700">{hour.day}</span>
                      <span className="text-gray-600">{hour.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a 
                        key={index}
                        href={social.href} 
                        className={`bg-gray-100 hover:bg-gray-200 p-4 rounded-xl transition-all duration-300 transform hover:scale-110 text-gray-600 ${social.color}`}
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Our support team is available 24/7 to assist you with any urgent queries or technical issues.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">Instant chat support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">Emergency hotline available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">Video call assistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose OKDriver?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust us for their driving safety needs.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12 mb-12">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-500/20 rounded-full">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">4.8/5</div>
                <div className="text-sm text-gray-400">Customer Rating</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-full">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">Industry</div>
                <div className="text-sm text-gray-400">Leader</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-black px-10 py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}