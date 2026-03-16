import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Terms and Conditions</h1>
            <p className="text-muted-foreground">Last updated: March 16, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing and using SnapCut AI ("Service"), available at{" "}
                <a href="https://snapcut-ai-omega.vercel.app" className="text-primary hover:underline">
                  snapcut-ai-omega.vercel.app
                </a>
                , you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to all
                the terms and conditions, you must not use our Service.
              </p>
              <p>
                These Terms constitute a legally binding agreement between you ("User," "you") and SnapCut AI
                ("Company," "we," "us," "our") governing your use of the Service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
              <p>
                SnapCut AI is an AI-powered background removal tool that allows users to upload images and
                automatically remove their backgrounds. The Service is provided as a Software-as-a-Service (SaaS)
                platform accessible through a web browser.
              </p>
              <p>We offer three pricing tiers:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-foreground">Free Plan</strong> — 5 images per day, standard quality</li>
                <li><strong className="text-foreground">Pro Plan (₹499/month)</strong> — Unlimited images, HD quality, API access, batch processing, priority support, no watermarks</li>
                <li><strong className="text-foreground">Credits (₹99/50 credits)</strong> — Pay-as-you-go, HD quality, API access, never expires</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. User Accounts</h2>
              <p>To use certain features of the Service, you must create an account. You agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms or engage in
                fraudulent activity.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. Payment Terms</h2>
              <p>
                All payments are processed securely through <strong className="text-foreground">Razorpay</strong>,
                a PCI-DSS compliant payment gateway. By making a purchase, you agree to the following:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>All prices are listed in Indian Rupees (INR) and include applicable taxes</li>
                <li>Pro Plan subscriptions are billed monthly and auto-renew unless cancelled</li>
                <li>Credit purchases are one-time payments and credits never expire</li>
                <li>You authorize Razorpay to charge the payment method you provide</li>
                <li>We are not responsible for any additional charges imposed by your bank or payment provider</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Acceptable Use Policy</h2>
              <p>You agree NOT to use the Service to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Upload illegal, offensive, or harmful content</li>
                <li>Infringe upon intellectual property rights of others</li>
                <li>Attempt to reverse-engineer or exploit the AI algorithms</li>
                <li>Use automated bots or scripts to abuse the Service</li>
                <li>Distribute malware or engage in phishing through uploaded images</li>
                <li>Resell or redistribute the Service without written permission</li>
                <li>Circumvent usage limits or pricing restrictions</li>
              </ul>
              <p>
                Violation of this policy may result in immediate account suspension or termination without refund.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Intellectual Property</h2>
              <p>
                <strong className="text-foreground">Your Content:</strong> You retain all rights to the images
                you upload to SnapCut AI. By uploading images, you grant us a limited, non-exclusive license
                to process your images solely for the purpose of providing the Service.
              </p>
              <p>
                <strong className="text-foreground">Our Content:</strong> The SnapCut AI platform, including
                its design, code, AI models, logos, and branding, are the intellectual property of SnapCut AI.
                You may not copy, modify, or distribute any part of our platform without prior written consent.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Service Availability</h2>
              <p>
                We strive to keep SnapCut AI available 24/7 but do not guarantee uninterrupted access. The
                Service may be temporarily unavailable due to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Scheduled maintenance and updates</li>
                <li>Technical issues or server outages</li>
                <li>Force majeure events beyond our control</li>
              </ul>
              <p>
                We will make reasonable efforts to notify users of planned downtime in advance.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, SnapCut AI shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Loss of profits, data, or business opportunities</li>
                <li>Inaccurate AI processing results</li>
                <li>Service interruptions or data loss</li>
                <li>Unauthorized access to your account</li>
              </ul>
              <p>
                Our total liability for any claim arising from the Service shall not exceed the amount you
                have paid to us in the 12 months preceding the claim.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">9. Disclaimer of Warranties</h2>
              <p>
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We do not warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The Service will meet your specific requirements</li>
                <li>The AI background removal will be 100% accurate in all cases</li>
                <li>The Service will be uninterrupted, timely, or error-free</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">10. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless SnapCut AI and its officers, directors,
                employees, and agents from any claims, damages, losses, or expenses (including legal fees)
                arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">11. Termination</h2>
              <p>
                We may terminate or suspend your access to the Service immediately, without prior notice,
                for any reason, including breach of these Terms. Upon termination:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your right to use the Service ceases immediately</li>
                <li>We may delete your account data after 30 days</li>
                <li>Unused credits may be forfeited (subject to our Refund Policy)</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes
                arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the
                courts in India.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">13. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately
                upon posting to this page. Continued use of the Service after changes constitutes your
                acceptance of the revised Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">14. Contact Us</h2>
              <p>If you have any questions about these Terms and Conditions, please contact us:</p>
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

export default TermsAndConditions;
