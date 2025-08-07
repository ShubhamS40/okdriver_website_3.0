import Image from 'next/image';
import Link from 'next/link';
import ceo from './../../../public/assets/about_image/ceo_passport_photo.png';
import cto from './../../../public/assets/about_image/cto_passport_photo.png';
import company_image from './../../../public/assets/about_image/company_image.jpg';
export default function About() {
  return (
    <div className="container-custom py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About OKDriver</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Learn more about our company and how we're revolutionizing driver management.
        </p>
      </div>

      {/* Company Overview */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">What Our Company Can Do</h2>
          <p className="text-lg mb-6">
            OKDriver is a comprehensive platform designed to streamline driver management, 
            subscription handling, and support services. We provide businesses with the tools 
            they need to efficiently track their registered drivers, manage subscription plans, 
            and handle support tickets.
          </p>
          <p className="text-lg mb-6">
            Our mission is to simplify the driver management process, making it easier for 
            companies to focus on their core business while we handle the administrative aspects 
            of driver management.
          </p>
          <Link href="/services" className="btn-primary inline-block">
            Explore Our Services
          </Link>
        </div>
        <div className="relative h-80 w-full">
          <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
           <Image src={company_image} alt="CTO Image" className="object-cover w-full h-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-black rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Security</h3>
            <p>
              We prioritize the security of your data and ensure that all information is protected with the highest standards of encryption and security protocols.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-black rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Efficiency</h3>
            <p>
              Our platform is designed to streamline your operations, saving you time and resources while providing comprehensive driver management solutions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-black rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Support</h3>
            <p>
              We offer dedicated support to ensure that your experience with our platform is seamless and any issues are resolved promptly.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20 ">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Leadership Team</h2>
        <div className="flex justify-around items-center gap-8  ">
          <div className="text-center">
            <div className="relative h-64 w-[256px] mb-4">
              <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
                <Image src={ceo} alt="CEO Image" className="object-cover w-full h-full rounded-lg" />
              </div>
            </div>
            <h3 className="text-xl font-bold">Tushit Gupta</h3>
            <p className="text-gray-600">Chief Executive Officer (Founder)</p>
          </div>
            <div className="text-center">
          <div className="relative h-64 w-[256px] mb-4">
              <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
                <Image src={cto} alt="CEO Image" className="object-cover w-full h-full rounded-lg" />
              </div>
            </div>
            <h3 className="text-xl font-bold">Shubham Singh</h3>
            <p className="text-gray-600">Chief Technology Officer (CTO)</p>
            <p>Software developer building the app's brains (AI and backend). Expert in mobile development and AI integration.</p>
            <button><Link href="/about/ceo">Read More</Link></button>
          </div>
          {/* <div className="text-center">
            <div className="relative h-64 w-full mb-4">
              <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-xl font-semibold">Coming Soon</p>
              </div>
            </div>
            <h3 className="text-xl font-bold">Coming Soon</h3>
            <p className="text-gray-600">Chief Operations Officer</p>
          </div> */}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 p-8 md:p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Join OKDriver today and streamline your driver management operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/services" className="btn-primary">
            Explore Services
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}