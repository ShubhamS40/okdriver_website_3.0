import Link from 'next/link';
import { Shield, Eye, Lock, Users, FileText, Mail, Phone, MapPin, CheckCircle, Star, Award } from 'lucide-react';

export default function PrivacyPolicy() {
  const privacySections = [
    {
      id: '1',
      title: 'Introduction',
      icon: Shield,
      color: 'from-blue-600 to-blue-800',
      content: (
        <>
          <p className="mb-4">
            At OKDriver ("we," "our," or "us"), we respect your privacy and are committed to protecting your 
            personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
            information when you use our website, mobile applications, and services (collectively, the "Services").
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that 
            you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with 
            our policies and practices, please do not use our Services.
          </p>
        </>
      )
    },
    {
      id: '2',
      title: 'Information We Collect',
      icon: Eye,
      color: 'from-green-600 to-green-800',
      content: (
        <>
          <p className="mb-4">
            We collect several types of information from and about users of our Services, including:
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
              <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Personal Information:</strong>
                <span className="text-gray-700 ml-1">This includes information that can be used to identify you, 
                such as your name, email address, postal address, phone number, and payment information.</span>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
              <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Usage Information:</strong>
                <span className="text-gray-700 ml-1">We collect information about how you use our Services, including 
                your IP address, browser type, device information, pages visited, and time spent on those pages.</span>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
              <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Location Information:</strong>
                <span className="text-gray-700 ml-1">With your consent, we may collect precise location information 
                from your device to provide location-based services.</span>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
              <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Driver Information:</strong>
                <span className="text-gray-700 ml-1">For users who register as drivers, we may collect additional 
                information such as driver's license details, vehicle information, and driving history.</span>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      id: '3',
      title: 'How We Use Your Information',
      icon: Lock,
      color: 'from-purple-600 to-purple-800',
      content: (
        <>
          <p className="mb-4">
            We use the information we collect for various purposes, including:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'To provide, maintain, and improve our Services',
              'To process transactions and manage your account',
              'To send you technical notices, updates, security alerts, and support messages',
              'To respond to your comments, questions, and customer service requests',
              'To personalize your experience and deliver content and product offerings relevant to your interests',
              'To monitor and analyze trends, usage, and activities in connection with our Services',
              'To detect, prevent, and address technical issues, fraud, and illegal activities',
              'To comply with legal obligations and enforce our terms and policies'
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-4 h-4 mt-1 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </>
      )
    },
    {
      id: '4',
      title: 'How We Share Your Information',
      icon: Users,
      color: 'from-orange-600 to-orange-800',
      content: (
        <>
          <p className="mb-4">
            We may share your information in the following circumstances:
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500">
              <strong className="text-gray-900">With Service Providers:</strong>
              <span className="text-gray-700 ml-1">We may share your information with third-party vendors, 
              service providers, contractors, or agents who perform services for us or on our behalf.</span>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500">
              <strong className="text-gray-900">For Business Transfers:</strong>
              <span className="text-gray-700 ml-1">We may share or transfer your information in connection 
              with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of 
              all or a portion of our business to another company.</span>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500">
              <strong className="text-gray-900">With Your Consent:</strong>
              <span className="text-gray-700 ml-1">We may share your information with third parties when you have 
              given us your consent to do so.</span>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500">
              <strong className="text-gray-900">For Legal Purposes:</strong>
              <span className="text-gray-700 ml-1">We may disclose your information to comply with applicable laws 
              and regulations, to respond to a subpoena, search warrant, or other lawful request for information 
              we receive, or to otherwise protect our rights.</span>
            </div>
          </div>
        </>
      )
    }
  ];

  const additionalSections = [
    {
      title: 'Data Security',
      content: 'We have implemented appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.'
    },
    {
      title: 'Your Privacy Rights',
      content: 'Depending on your location, you may have certain rights regarding your personal information, including the right to access, rectify, delete, restrict processing, data portability, and withdraw consent.'
    },
    {
      title: 'Children\'s Privacy',
      content: 'Our Services are not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us.'
    },
    {
      title: 'Changes to Our Privacy Policy',
      content: 'We may update our Privacy Policy from time to time. If we make material changes, we will notify you by email or by posting a notice on our website. Your continued use constitutes acknowledgment of the modified Privacy Policy.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="container-custom py-24">
        <div className="text-center">
        
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-400 leading-relaxed">
            We are committed to protecting your privacy and personal information. Learn how we collect, use, and safeguard your data.
          </p>
        </div>
      </section>

      {/* Main Privacy Sections */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          
          {/* Key Privacy Sections */}
          <div className="space-y-16">
            {privacySections.map((section, index) => {
              const Icon = section.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={section.id} className={`grid md:grid-cols-2 gap-16 items-start ${isEven ? '' : 'md:grid-flow-col-dense'}`}>
                  
                  {/* Icon Side */}
                  <div className={`${isEven ? 'order-2 md:order-2' : 'order-2 md:order-1'}`}>
                    <div className="relative h-96 w-full rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-2xl">
                      <div className={`w-32 h-32 rounded-2xl bg-gradient-to-r ${section.color} flex items-center justify-center transform hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-16 h-16 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`${isEven ? 'order-1 md:order-1' : 'order-1 md:order-2'}`}>
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-black rounded-lg mr-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-black uppercase tracking-wide">Section {section.id}</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-6 text-black">{section.title}</h2>
                    <div className="text-lg text-gray-700 leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Sections */}
          <div className="grid md:grid-cols-2 gap-8 mt-24">
            {additionalSections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl shadow-2xl p-12 mt-16 text-white">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Contact Us About Privacy</h3>
              <p className="text-gray-300 text-lg">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="p-3 bg-white/10 rounded-xl w-fit mx-auto mb-4">
                  <Mail className="w-8 h-8 text-blue-400" />
                </div>
                <div className="font-semibold mb-2">Email Us</div>
                <div className="text-gray-300">support@okdriver.in</div>
              </div>
              <div className="text-center">
                <div className="p-3 bg-white/10 rounded-xl w-fit mx-auto mb-4">
                  <Phone className="w-8 h-8 text-green-400" />
                </div>
                <div className="font-semibold mb-2">Call Us</div>
                <div className="text-gray-300">+91-9319500121 </div>
              </div>
              <div className="text-center">
                <div className="p-3 bg-white/10 rounded-xl w-fit mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-purple-400" />
                </div>
                <div className="font-semibold mb-2">Visit Us</div>
                <div className="text-gray-300">L16-A, Dilshad Garden New Delhi - 110095</div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-3 bg-white rounded-xl px-6 py-3 shadow-lg">
              <FileText className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-semibold">Last Updated: August 10, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators & CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Privacy is Our Priority
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We implement industry-leading security measures to protect your personal information and maintain your trust.
            </p>
          </div>

          {/* Trust Indicators */}
          {/* <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12 mb-12">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-500/20 rounded-full">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">ISO 27001</div>
                <div className="text-sm text-gray-400">Certified Security</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">GDPR</div>
                <div className="text-sm text-gray-400">Compliant</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-full">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">Privacy</div>
                <div className="text-sm text-gray-400">First Approach</div>
              </div>
            </div>
          </div> */}

          {/* Related Links */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/terms" 
              className="border-2 border-white text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 text-center"
            >
              Terms & Conditions
            </Link>
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}