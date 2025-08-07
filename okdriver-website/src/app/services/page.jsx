import Image from 'next/image';
import Link from 'next/link';


export default function Services() {
  return (
    <div className="container-custom py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Explore the comprehensive range of services offered by OKDriver to streamline your driver management.
        </p>
      </div>

      {/* Services Overview */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-6">Driver Management Solutions</h2>
          <p className="text-lg mb-6">
            OKDriver provides a comprehensive suite of tools designed to simplify driver management, 
            subscription handling, and support services. Our platform helps businesses track their 
            registered drivers, manage subscription plans, and handle support tickets efficiently.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Real-time driver tracking and management</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Flexible subscription plan creation and management</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Integrated support ticket system with email notifications</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Comprehensive payment tracking and reporting</span>
            </li>
          </ul>
        </div>
        <div className="order-1 md:order-2 relative h-80 w-full">
          <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
<video
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-full object-cover rounded-lg"
>
  <source src="/assets/service_image/dms-clip.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


          </div>
        </div>
      </div>

      {/* Detailed Services */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Core Services</h2>
        
        {/* Driver Management */}
        <div id="driver-management" className="mb-16 scroll-mt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 w-full">
              <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-xl font-semibold">Driver Management</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Driver Management</h3>
              <p className="text-lg mb-4">
                Our driver management system allows you to keep track of all your registered drivers, 
                view their details, and manage their accounts efficiently.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Total registered drivers count and detailed information</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Driver account management and deletion</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Subscription plan assignment and tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Subscription Plans */}
        <div id="subscription-plans" className="mb-16 scroll-mt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4">Subscription Plans</h3>
              <p className="text-lg mb-4">
                Create and manage flexible subscription plans for your drivers with our comprehensive 
                subscription management system.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom subscription plan creation with flexible pricing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Track drivers assigned to each subscription plan</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Automated billing and payment processing</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 relative h-80 w-full">
              <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-xl font-semibold">Subscription Plans</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Support System */}
        <div id="support-system" className="mb-16 scroll-mt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 w-full">
              <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-xl font-semibold">Support System</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Support and Ticket Management</h3>
              <p className="text-lg mb-4">
                Our integrated support system allows you to manage support tickets, respond to driver 
                inquiries, and track issue resolution efficiently.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ticket creation and management system</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Email notifications for ticket updates</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority-based ticket handling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Payment Tracking */}
        <div id="payment-tracking" className="scroll-mt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4">Payment Tracking</h3>
              <p className="text-lg mb-4">
                Keep track of all payments, generate reports, and monitor subscription revenue with 
                our comprehensive payment tracking system.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Monthly and quarterly payment records</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Revenue reports and analytics</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Payment status tracking and notifications</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 relative h-80 w-full">
              <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-xl font-semibold">Payment Tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Additional Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-black rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Analytics Dashboard</h3>
            <p className="mb-4">
              Gain insights into your driver operations with our comprehensive analytics dashboard.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-black rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">SMS Notifications</h3>
            <p className="mb-4">
              Keep your drivers informed with automated SMS notifications for important updates.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-black rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Dashcam Integration</h3>
            <p className="mb-4">
              Enhance driver safety with our integrated dashcam solution for real-time monitoring.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 p-8 md:p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Contact us today to learn more about how OKDriver can help streamline your driver management operations.
        </p>
        <Link href="/contact" className="btn-primary">
          Contact Us
        </Link>
      </div>
    </div>
  );
}