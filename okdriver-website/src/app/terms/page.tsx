'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { 
  FileText, Shield, CreditCard, RotateCcw, User, 
  Copyright, AlertTriangle, Scale, Phone, Mail, 
  MapPin, CheckCircle, ArrowRight, Clock, Users
} from 'lucide-react';

const termsData = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: FileText,
    content: `Welcome to OKDriver ("we," "our," or "us"). These Terms and Conditions govern your use of our website, mobile applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Services.`,
    highlights: ['Legal agreement between you and OKDriver', 'Governs all use of our services', 'Must agree to use our platform']
  },
  {
    id: 'subscription',
    title: 'Subscription Plans',
    icon: CreditCard,
    content: `OKDriver offers various subscription plans for our Services. The features and pricing of each plan are described on our website. By subscribing to any of our plans, you agree to pay the applicable fees as described. Subscription fees are billed in advance on a monthly or annual basis, depending on the billing cycle you select when purchasing a subscription. You can change your billing cycle at any time, but any changes will take effect at the end of the current billing cycle.`,
    highlights: ['Multiple subscription options available', 'Flexible billing cycles', 'Changes take effect next cycle']
  },
  {
    id: 'refund',
    title: 'Refund Policy',
    icon: RotateCcw,
    content: `We offer a 14-day money-back guarantee for all new subscriptions. If you are not satisfied with our Services within the first 14 days of your subscription, you may request a full refund. After the 14-day period, refunds are provided at our discretion and may be prorated based on the unused portion of your subscription. To request a refund, please contact our support team at support@okdriver.com with your account information and reason for the refund request.`,
    highlights: ['14-day money-back guarantee', 'Full refund within trial period', 'Contact support for refund requests']
  },
  {
    id: 'cancellation',
    title: 'Cancellation Policy',
    icon: RotateCcw,
    content: `You may cancel your subscription at any time through your account settings or by contacting our support team. If you cancel your subscription, you will continue to have access to the Services until the end of your current billing cycle. We do not provide refunds for the remaining unused portion of your subscription term after cancellation, except as described in our Refund Policy.`,
    highlights: ['Cancel anytime', 'Access until billing cycle ends', 'No refunds unless within guarantee period']
  },
  {
    id: 'accounts',
    title: 'User Accounts',
    icon: User,
    content: `To use certain features of our Services, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate your account if we determine, in our sole discretion, that you have violated these Terms and Conditions or engaged in any activity that may harm our Services or other users.`,
    highlights: ['Account required for certain features', 'You\'re responsible for account security', 'We may suspend accounts for violations']
  },
  {
    id: 'intellectual',
    title: 'Intellectual Property',
    icon: Copyright,
    content: `All content, features, and functionality of our Services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of OKDriver or our licensors and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services without our prior written consent.`,
    highlights: ['All content is protected by IP laws', 'OKDriver owns exclusive rights', 'Prior written consent required for use']
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    icon: AlertTriangle,
    content: `In no event shall OKDriver, its affiliates, or their respective officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.`,
    highlights: ['Limited liability for damages', 'Protection for OKDriver and affiliates', 'No liability for indirect losses']
  },
  {
    id: 'changes',
    title: 'Changes to Terms',
    icon: FileText,
    content: `We reserve the right to modify these Terms and Conditions at any time. If we make material changes to these terms, we will notify you by email or by posting a notice on our website. Your continued use of our Services after such modifications will constitute your acknowledgment of the modified Terms and Conditions and your agreement to abide and be bound by them.`,
    highlights: ['Terms may be modified anytime', 'Notification via email or website', 'Continued use implies acceptance']
  },
  {
    id: 'governing',
    title: 'Governing Law',
    icon: Scale,
    content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which OKDriver is registered, without regard to its conflict of law provisions.`,
    highlights: ['Governed by local jurisdiction laws', 'No conflict of law provisions', 'Legal disputes resolved locally']
  }
];

const quickInfo = [
  // { icon: Clock, text: '' },
  { icon: Shield, text: 'Secure and protected platform' },
  { icon: Users, text: 'Trusted by 100+ users' },
  { icon: CheckCircle, text: 'Transparent policies' }
];

export default function TermsAndConditions() {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Hero Section */}
      <section className="container-custom py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-400 leading-relaxed mb-8">
            Please read these terms and conditions carefully before using our services. 
            We've made them clear and straightforward for your understanding.
          </p>
          
          {/* Quick Info Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {quickInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">{info.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Terms Content Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Legal <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">Framework</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding your rights and responsibilities when using OKDriver services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {termsData.map((term, index) => {
              const Icon = term.icon;
              const isHovered = hoveredCard === term.id;
              
              return (
                <div
                  key={term.id}
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 ${
                    isHovered ? 'ring-4 ring-black/10' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard(term.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setSelectedTerm(selectedTerm === term.id ? null : term.id)}
                >
                  {/* Gradient Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-gray-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Main Content */}
                  <div className="relative p-6">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-black to-gray-800 mb-4 transform transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                      {term.title}
                    </h3>

                    {/* Preview Text */}
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                      {term.content.substring(0, 120)}...
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-4">
                      {term.highlights.slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span className="text-xs text-gray-700 font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <button className="inline-flex items-center space-x-2 text-black font-semibold hover:text-gray-700 transition-colors text-sm">
                      <span>Read More</span>
                      <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </button>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-300 ${
                    isHovered ? 'border-black/20' : ''
                  }`} />
                </div>
              );
            })}
          </div>

          {/* Expanded Details Modal */}
          {selectedTerm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {(() => {
                  const term = termsData.find(t => t.id === selectedTerm);
                  const Icon = term.icon;
                  
                  return (
                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 rounded-xl bg-gradient-to-r from-black to-gray-800">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-3xl font-bold text-gray-900">{term.title}</h3>
                        </div>
                        <button
                          onClick={() => setSelectedTerm(null)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Full Content */}
                      <div className="prose max-w-none mb-8">
                        <p className="text-lg text-gray-700 leading-relaxed">{term.content}</p>
                      </div>

                      {/* Key Highlights */}
                      <div className="mb-8">
                        <h4 className="text-xl font-semibold mb-4">Key Points</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {term.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <span className="text-gray-800">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={() => setSelectedTerm(null)}
                          className="px-6 py-3 rounded-lg bg-gradient-to-r from-black to-gray-800 text-white font-semibold hover:opacity-90 transition-opacity"
                        >
                          Got it
                        </button>
                        <Link href="/contact" className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors text-center">
                          Have Questions?
                        </Link>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Need Help Understanding Our Terms?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our legal team is here to answer any questions you may have about our terms and conditions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get detailed answers to your legal questions</p>
              <a href="mailto:support@okdriver.in" className="text-blue-600 font-semibold hover:underline">
                support@okdriver.in
              </a>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Speak directly with our legal team</p>
              <a href="tel:+919319500121" className="text-green-600 font-semibold hover:underline">
                +91-9319500121
              </a>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Office Address</h3>
              <p className="text-gray-600 mb-4">Visit us for in-person consultation</p>
              <p className="text-purple-600 font-semibold">
                L16-A, Dilshad Garden<br />New Delhi - 110095, India
              </p>
            </div>
          </div>

          {/* Last Updated Info */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Last Updated: August 10, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Safe Driving?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-300">
            Now that you understand our terms, join thousands of drivers who trust OKDriver for their safety needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button className="bg-white text-black px-10 py-5 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors">
              <a href="https://play.google.com/store/apps/details?id=app.dash.okDriver&pli=1">Download Now</a>
            </button>
            <Link href="/privacy" className="border-2 border-white text-white px-10 py-5 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-colors">
              View Privacy Policy
            </Link>
          </div>

          {/* Related Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact Us
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}