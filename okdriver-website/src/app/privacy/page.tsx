import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="container-custom py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-xl max-w-3xl mx-auto">
          We are committed to protecting your privacy and personal information.
        </p>
      </div>

      {/* Privacy Policy Content */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p>
            At OKDriver ("we," "our," or "us"), we respect your privacy and are committed to protecting your 
            personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
            information when you use our website, mobile applications, and services (collectively, the "Services").
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that 
            you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with 
            our policies and practices, please do not use our Services.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">2. Information We Collect</h2>
          <p>
            We collect several types of information from and about users of our Services, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Personal Information:</strong> This includes information that can be used to identify you, 
              such as your name, email address, postal address, phone number, and payment information.
            </li>
            <li>
              <strong>Usage Information:</strong> We collect information about how you use our Services, including 
              your IP address, browser type, device information, pages visited, and time spent on those pages.
            </li>
            <li>
              <strong>Location Information:</strong> With your consent, we may collect precise location information 
              from your device to provide location-based services.
            </li>
            <li>
              <strong>Driver Information:</strong> For users who register as drivers, we may collect additional 
              information such as driver's license details, vehicle information, and driving history.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-8">3. How We Use Your Information</h2>
          <p>
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>To provide, maintain, and improve our Services</li>
            <li>To process transactions and manage your account</li>
            <li>To send you technical notices, updates, security alerts, and support messages</li>
            <li>To respond to your comments, questions, and customer service requests</li>
            <li>To personalize your experience and deliver content and product offerings relevant to your interests</li>
            <li>To monitor and analyze trends, usage, and activities in connection with our Services</li>
            <li>To detect, prevent, and address technical issues, fraud, and illegal activities</li>
            <li>To comply with legal obligations and enforce our terms and policies</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-8">4. How We Share Your Information</h2>
          <p>
            We may share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>With Service Providers:</strong> We may share your information with third-party vendors, 
              service providers, contractors, or agents who perform services for us or on our behalf.
            </li>
            <li>
              <strong>For Business Transfers:</strong> We may share or transfer your information in connection 
              with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of 
              all or a portion of our business to another company.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may share your information with third parties when you have 
              given us your consent to do so.
            </li>
            <li>
              <strong>For Legal Purposes:</strong> We may disclose your information to comply with applicable laws 
              and regulations, to respond to a subpoena, search warrant, or other lawful request for information 
              we receive, or to otherwise protect our rights.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-8">5. Data Security</h2>
          <p>
            We have implemented appropriate technical and organizational measures to protect the security of your 
            personal information. However, please be aware that no method of transmission over the Internet or 
            method of electronic storage is 100% secure. While we strive to use commercially acceptable means to 
            protect your personal information, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">6. Your Privacy Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>The right to access and receive a copy of your personal information</li>
            <li>The right to rectify or update your personal information</li>
            <li>The right to delete your personal information</li>
            <li>The right to restrict or object to the processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw your consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">7. Children's Privacy</h2>
          <p>
            Our Services are not intended for children under the age of 16. We do not knowingly collect personal 
            information from children under 16. If you are a parent or guardian and you believe your child has 
            provided us with personal information, please contact us, and we will take steps to delete such information.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">8. Changes to Our Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. If we make material changes to this Privacy Policy, 
            we will notify you by email or by posting a notice on our website. Your continued use of our Services 
            after such modifications will constitute your acknowledgment of the modified Privacy Policy and your 
            agreement to abide and be bound by it.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: privacy@okdriver.com<br />
            Phone: +1 (123) 456-7890<br />
            Address: 123 Driver Street, City, Country
          </p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center mb-12">
        <p className="text-gray-600">Last Updated: May 1, 2023</p>
      </div>

      {/* Related Links */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
        <Link href="/terms" className="btn-secondary">
          Terms & Conditions
        </Link>
        <Link href="/contact" className="btn-primary">
          Contact Us
        </Link>
      </div>
    </div>
  );
}