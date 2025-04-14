import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PrivacyPage: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Shreyas J</title>
        <meta
          name="description"
          content="Privacy Policy for Shreyas J's personal portfolio website and Tech Card Builder"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        {/* Header */}
        <header className="py-6 px-6 md:px-12 flex justify-between items-center border-b border-gray-800">
          <Link to="/" className="text-xl font-semibold">
            <span className="text-purple-500">Shreyas</span>J
          </Link>
          <Link
            to="/"
            className="text-sm px-4 py-2 rounded-full border border-purple-500 hover:bg-purple-500 hover:text-white transition-all"
          >
            Back to Home
          </Link>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Privacy Policy
          </h1>
          <div className="text-sm text-gray-400 mb-10 text-center">
            Last updated: May 15, 2023
          </div>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                1. Introduction
              </h2>
              <p>
                Welcome to Shreyas J's personal portfolio website. I respect
                your privacy and am committed to protecting your personal data.
                This Privacy Policy explains how I collect, use, and safeguard
                your information when you visit my website
                (https://iamshreyas.live), including any subdomains and services
                offered through this site such as the Tech Card Builder.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                2. Information I Collect
              </h2>
              <p className="mb-4">
                I may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal Information:</strong> When you use the Tech
                  Card Builder, I may collect profile information you provide,
                  including your name, profile picture, role/title, bio, and
                  social media links.
                </li>
                <li>
                  <strong>Usage Data:</strong> I automatically collect
                  information about how you interact with my website, including
                  your IP address, browser type, pages visited, time spent on
                  pages, and other diagnostic data.
                </li>
                <li>
                  <strong>Cookies and Similar Technologies:</strong> My website
                  may use cookies and similar tracking technologies to enhance
                  your experience.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                3. How I Use Your Information
              </h2>
              <p className="mb-4">I use the information I collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve my website and services</li>
                <li>
                  Generate and store your Tech Card when you use the Tech Card
                  Builder
                </li>
                <li>Share your Tech Card when you use the sharing features</li>
                <li>Analyze usage patterns to improve user experience</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                4. Data Storage
              </h2>
              <p>
                When you create a Tech Card, the data is stored in Firebase
                Firestore, a cloud-hosted database provided by Google. This
                storage allows your Tech Card to be accessed via a unique URL
                for sharing purposes. Your data is stored only for as long as
                necessary to provide the service, and I implement appropriate
                security measures to protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                5. Data Security
              </h2>
              <p>
                I value your trust in providing me with your information, so I
                strive to use commercially acceptable means of protecting it.
                However, no method of transmission over the internet or
                electronic storage is 100% secure and reliable, and I cannot
                guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                6. Third-Party Services
              </h2>
              <p>
                This website uses services from third parties, including Google
                Firebase for data storage, analytics services, and social media
                platforms when you choose to share content. These third parties
                may collect information sent by your browser as part of a web
                page request. Their collection and use of information is
                governed by their respective privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                7. Your Rights
              </h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access, update, or delete your personal information</li>
                <li>Opt-out of future communications from me</li>
                <li>Request a copy of your data</li>
                <li>Object to the processing of your personal data</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact me using the
                information provided in the "Contact Me" section below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                8. Cookies
              </h2>
              <p>
                Cookies are files with a small amount of data that may include
                an anonymous unique identifier. These are sent to your browser
                from a website and stored on your device. You can instruct your
                browser to refuse all cookies or to indicate when a cookie is
                being sent. However, if you do not accept cookies, you may not
                be able to use some portions of my website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                9. Children's Privacy
              </h2>
              <p>
                My website does not address anyone under the age of 13. I do not
                knowingly collect personally identifiable information from
                children under 13. If I discover that a child under 13 has
                provided me with personal information, I immediately delete this
                from our servers. If you are a parent or guardian and you are
                aware that your child has provided me with personal information,
                please contact me so that I can take necessary actions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                10. Changes to This Privacy Policy
              </h2>
              <p>
                I may update this Privacy Policy from time to time. I will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "last updated" date at the top. You
                are advised to review this Privacy Policy periodically for any
                changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                11. International Data Transfers
              </h2>
              <p>
                Your information, including personal data, may be transferred to
                — and maintained on — computers located outside of your state,
                province, country, or other governmental jurisdiction where the
                data protection laws may differ from those of your jurisdiction.
                If you are located outside India and choose to provide
                information to me, please note that I transfer the data,
                including personal data, to India and process it there.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                12. Contact Me
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact me using the Contact section on my website.
              </p>
              <p className="mt-2">
                Visit:{" "}
                <a href="/#contact" className="text-purple-400 hover:underline">
                  Contact Form
                </a>
              </p>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-8 px-6">
          <div className="max-w-4xl mx-auto text-center text-gray-400 text-sm">
            <div className="mb-4">
              <Link
                to="/"
                className="hover:text-purple-400 transition-colors mr-6"
              >
                Home
              </Link>
              <Link
                to="/terms"
                className="hover:text-purple-400 transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
            <p>©️ {currentYear} Shreyas J. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PrivacyPage; 