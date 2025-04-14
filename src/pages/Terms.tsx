import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030014] text-white">
      <Helmet>
        <title>Terms & Conditions | Shreyas J</title>
        <meta 
          name="description" 
          content="Terms and conditions for using Shreyas J's portfolio website, tech card builder, and related services." 
        />
        <link rel="canonical" href="https://iamshreyas.live/terms" />
      </Helmet>

      {/* Header with navigation back */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-80 backdrop-blur-md z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link 
            to="/" 
            className="text-white hover:text-blue-400 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gradient-blue-purple">Terms & Conditions</h1>
        
        <section className="mb-8">
          <p className="text-gray-300 mb-6">
            Last Updated: {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
          </p>
          <p className="mb-4">
            Please read these Terms and Conditions carefully before using the website and services operated by Shreyas J.
          </p>
          <p className="mb-4">
            By accessing or using the website at <a href="https://iamshreyas.live" className="text-blue-400 hover:underline">https://iamshreyas.live</a>, including the Tech Card Builder feature, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access the website or use its services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Website Ownership</h2>
          <p className="mb-4">
            This website is owned and operated by Shreyas J. References to "we", "us", and "our" refer to Shreyas J as the provider of this website and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property</h2>
          <p className="mb-4">
            All content on this website, including but not limited to text, graphics, logos, images, code, and software, is the property of Shreyas J and is protected by intellectual property laws.
          </p>
          <p className="mb-4">
            You may view and download content for personal, non-commercial use only, provided that you retain all copyright and other proprietary notices contained in the original materials.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Content and Tech Card Builder</h2>
          <p className="mb-4">
            Our website offers a Tech Card Builder feature that allows you to create personalized tech stack cards. By using this feature, you agree to the following:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>You will not upload, share, or create content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
            <li>You will not upload content that infringes on any patent, trademark, trade secret, copyright, or other proprietary rights of any party.</li>
            <li>You retain ownership of any content you upload or create, but grant us a non-exclusive, royalty-free license to use, reproduce, adapt, publish, and distribute such content in connection with our website and services.</li>
            <li>We are not responsible for any content shared or downloaded through our Tech Card Builder service.</li>
            <li>We have the right to remove any content that violates these terms or is otherwise objectionable at our sole discretion.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
          <p className="mb-4">
            Shreyas J shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the website or any content thereon.
          </p>
          <p className="mb-4">
            This includes, but is not limited to, any errors or omissions in any content, any loss or damage of any kind incurred as a result of your use of the website or any content posted, transmitted, or otherwise made available through the website.
          </p>
          <p className="mb-4">
            We do not guarantee that the website will be secure or free from errors or viruses. You are responsible for configuring your technology to access the website and should use your own virus protection software.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
          <p className="mb-4">
            When using our website and services, you agree not to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Use the website in any way that could disable, overburden, damage, or impair the site or interfere with any other party's use of the website.</li>
            <li>Use any robot, spider, or other automatic device to access the website for any purpose without our express written permission.</li>
            <li>Introduce any viruses, trojan horses, worms, logic bombs, or other harmful material.</li>
            <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the website, the server on which the website is stored, or any server, computer, or database connected to the website.</li>
            <li>Attack the website via a denial-of-service attack or a distributed denial-of-service attack.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms & Conditions</h2>
          <p className="mb-4">
            We reserve the right to modify these Terms and Conditions at any time without prior notice. Your continued use of the website after any such changes constitutes your acceptance of the new Terms and Conditions.
          </p>
          <p className="mb-4">
            It is your responsibility to check this page periodically for changes. We recommend reviewing these Terms and Conditions whenever you use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
          <p className="mb-4">
            These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your access to our website and services immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms and Conditions.
          </p>
          <p className="mb-4">
            Upon termination, your right to use the website and services will immediately cease. If you wish to terminate your account or use of our services, you may simply discontinue using them.
          </p>
          <p className="mb-4">
            All provisions of these Terms and Conditions which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. External Links</h2>
          <p className="mb-4">
            Our website may contain links to external websites or services that are not owned or controlled by Shreyas J. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
          </p>
          <p className="mb-4">
            We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit. We shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
          <p className="mb-4">
            You agree to defend, indemnify, and hold harmless Shreyas J and its licensors and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms and Conditions or your use of the website and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Privacy Policy</h2>
          <p className="mb-4">
            Your use of our website and services is also governed by our Privacy Policy, which can be found at <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>. By using our website and services, you consent to the terms of our Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about these Terms and Conditions, please contact us through the contact form on our website.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#94A3B8]">
            © {new Date().getFullYear()} Shreyas. All rights reserved. | 
            <Link to="/" className="text-[#94A3B8] hover:text-white ml-1 mr-1">Home</Link> | 
            <Link to="/privacy" className="text-[#94A3B8] hover:text-white ml-1">Privacy Policy</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TermsPage; 