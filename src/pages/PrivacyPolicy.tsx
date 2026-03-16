import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: March 16, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
              <p>
                Welcome to SnapCut AI ("we," "our," or "us"). We are committed to protecting your privacy
                and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website{" "}
                <a href="https://snapcut-ai-omega.vercel.app" className="text-primary hover:underline">
                  snapcut-ai-omega.vercel.app
                </a>{" "}
                and use our AI-powered background removal services.
              </p>
              <p>
                By using SnapCut AI, you consent to the data practices described in this Privacy Policy. If you
                do not agree with the terms of this policy, please do not access or use our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
              <h3 className="text-lg font-medium text-foreground/90">2.1 Personal Information</h3>
              <p>We may collect the following personal information when you register or use our services:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number (optional)</li>
                <li>Billing and payment information (processed securely through Razorpay)</li>
                <li>Account credentials</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground/90">2.2 Usage Data</h3>
              <p>We automatically collect certain information when you access our website, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website or source</li>
                <li>Images uploaded for processing (temporarily stored for processing only)</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground/90">2.3 Cookies and Tracking Technologies</h3>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and hold
                certain information. Cookies are small data files placed on your device. You can instruct your
                browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
              <p>We use the collected information for various purposes including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>To provide and maintain our AI background removal service</li>
                <li>To process your transactions and manage your subscriptions</li>
                <li>To send you service-related communications and updates</li>
                <li>To improve and optimize our website and services</li>
                <li>To detect, prevent, and address technical issues or fraud</li>
                <li>To comply with legal obligations</li>
                <li>To respond to your inquiries and provide customer support</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. Payment Information</h2>
              <p>
                All payment transactions are processed through <strong className="text-foreground">Razorpay</strong>,
                a PCI-DSS compliant payment gateway. We do not store your credit card, debit card, or banking
                details on our servers. Your payment information is encrypted and handled securely by Razorpay.
                Please refer to{" "}
                <a href="https://razorpay.com/privacy/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Razorpay's Privacy Policy
                </a>{" "}
                for details on their data handling practices.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Data Storage and Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal data against
                unauthorized access, alteration, disclosure, or destruction. These include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>SSL/TLS encryption for all data transmissions</li>
                <li>Secure server infrastructure</li>
                <li>Regular security assessments</li>
                <li>Access controls to limit employee access to personal data</li>
              </ul>
              <p>
                Uploaded images are processed in real-time and are not permanently stored on our servers unless
                you choose to save them in your account history. Temporary processing data is automatically
                deleted within 24 hours.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Third-Party Services</h2>
              <p>We may share your information with the following third-party service providers:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-foreground">Razorpay</strong> — for payment processing</li>
                <li><strong className="text-foreground">Vercel</strong> — for website hosting</li>
                <li><strong className="text-foreground">Analytics providers</strong> — for website usage analytics</li>
              </ul>
              <p>
                These third parties have access to your data only to perform specific tasks on our behalf and
                are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Your Rights</h2>
              <p>
                In accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and other
                applicable laws, you have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-foreground">Right to Access</strong> — Request a copy of your personal data</li>
                <li><strong className="text-foreground">Right to Correction</strong> — Request correction of inaccurate data</li>
                <li><strong className="text-foreground">Right to Erasure</strong> — Request deletion of your personal data</li>
                <li><strong className="text-foreground">Right to Withdraw Consent</strong> — Withdraw consent for data processing at any time</li>
                <li><strong className="text-foreground">Right to Grievance Redressal</strong> — File a complaint regarding data handling</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at the details provided below.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 18. We do not knowingly collect
                personal data from children. If we become aware that we have collected personal data from a child,
                we will take steps to delete such information promptly.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">9. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                the new Privacy Policy on this page and updating the "Last updated" date. You are advised to
                review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">10. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-foreground">Trade Name:</strong> SnapCut AI</li>
                <li><strong className="text-foreground">Email:</strong> support@snapcutai.com</li>
                <li><strong className="text-foreground">Phone:</strong> +91-XXXXXXXXXX</li>
                <li><strong className="text-foreground">Address:</strong> [Your Business Address], India</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
