import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="container-custom py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Please read these terms and conditions carefully before using our services.
        </p>
      </div>

      {/* Terms Content */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p>
            Welcome to OKDriver ("we," "our," or "us"). These Terms and Conditions govern your use of our website, 
            mobile applications, and services (collectively, the "Services"). By accessing or using our Services, 
            you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not 
            use our Services.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">2. Subscription Plans</h2>
          <p>
            OKDriver offers various subscription plans for our Services. The features and pricing of each plan 
            are described on our website. By subscribing to any of our plans, you agree to pay the applicable 
            fees as described.
          </p>
          <p>
            Subscription fees are billed in advance on a monthly or annual basis, depending on the billing cycle 
            you select when purchasing a subscription. You can change your billing cycle at any time, but any 
            changes will take effect at the end of the current billing cycle.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">3. Refund Policy</h2>
          <p>
            We offer a 14-day money-back guarantee for all new subscriptions. If you are not satisfied with our 
            Services within the first 14 days of your subscription, you may request a full refund. After the 
            14-day period, refunds are provided at our discretion and may be prorated based on the unused portion 
            of your subscription.
          </p>
          <p>
            To request a refund, please contact our support team at support@okdriver.com with your account 
            information and reason for the refund request.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">4. Cancellation Policy</h2>
          <p>
            You may cancel your subscription at any time through your account settings or by contacting our 
            support team. If you cancel your subscription, you will continue to have access to the Services 
            until the end of your current billing cycle. We do not provide refunds for the remaining unused 
            portion of your subscription term after cancellation, except as described in our Refund Policy.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">5. User Accounts</h2>
          <p>
            To use certain features of our Services, you may need to create an account. You are responsible for 
            maintaining the confidentiality of your account credentials and for all activities that occur under 
            your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
          <p>
            We reserve the right to suspend or terminate your account if we determine, in our sole discretion, 
            that you have violated these Terms and Conditions or engaged in any activity that may harm our 
            Services or other users.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">6. Intellectual Property</h2>
          <p>
            All content, features, and functionality of our Services, including but not limited to text, graphics, 
            logos, icons, images, audio clips, digital downloads, data compilations, and software, are the 
            exclusive property of OKDriver or our licensors and are protected by copyright, trademark, and other 
            intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly 
            perform, republish, download, store, or transmit any of the material on our Services without our 
            prior written consent.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">7. Limitation of Liability</h2>
          <p>
            In no event shall OKDriver, its affiliates, or their respective officers, directors, employees, or 
            agents be liable for any indirect, incidental, special, consequential, or punitive damages, including 
            but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from 
            your access to or use of or inability to access or use the Services.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">8. Changes to Terms and Conditions</h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any time. If we make material changes 
            to these terms, we will notify you by email or by posting a notice on our website. Your continued 
            use of our Services after such modifications will constitute your acknowledgment of the modified 
            Terms and Conditions and your agreement to abide and be bound by them.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">9. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in accordance with the laws of the 
            jurisdiction in which OKDriver is registered, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">10. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <p>
            Email: legal@okdriver.com<br />
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
        <Link href="/privacy" className="btn-secondary">
          Privacy Policy
        </Link>
        <Link href="/contact" className="btn-primary">
          Contact Us
        </Link>
      </div>
    </div>
  );
}