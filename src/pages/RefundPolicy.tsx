import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Refund and Cancellation Policy</h1>
            <p className="text-muted-foreground">Last updated: March 16, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Overview</h2>
              <p>
                At SnapCut AI, we strive to provide the best AI-powered background removal experience. We
                understand that sometimes things don't go as planned. This Refund and Cancellation Policy
                explains the terms under which you can request a refund or cancel your subscription.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Pro Plan Subscription</h2>

              <h3 className="text-lg font-medium text-foreground/90">2.1 Cancellation</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>You may cancel your Pro Plan subscription at any time from your account settings</li>
                <li>Upon cancellation, your subscription will remain active until the end of your current billing period</li>
                <li>You will continue to have access to Pro features until the billing period expires</li>
                <li>After the billing period ends, your account will be downgraded to the Free Plan</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground/90">2.2 Refund Eligibility</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong className="text-foreground">Within 7 days of purchase:</strong> If you are not satisfied
                  with the Pro Plan and have not used more than 10 images, you may request a full refund
                </li>
                <li>
                  <strong className="text-foreground">After 7 days:</strong> Refunds will not be issued for the
                  current billing period. You may cancel to avoid future charges
                </li>
                <li>
                  <strong className="text-foreground">Renewal charges:</strong> If you forgot to cancel and were
                  charged for a renewal, you may request a refund within 48 hours of the renewal charge,
                  provided you have not used the Service during the new billing period
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. Credit Purchases</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong className="text-foreground">Unused credits:</strong> If you have not used any credits
                  from a purchase, you may request a full refund within 7 days of purchase
                </li>
                <li>
                  <strong className="text-foreground">Partially used credits:</strong> No refunds will be issued
                  for partially used credit packages
                </li>
                <li>
                  <strong className="text-foreground">Non-transferable:</strong> Credits are non-transferable and
                  cannot be exchanged for cash
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. Free Plan</h2>
              <p>
                The Free Plan costs ₹0 and does not involve any payment. Therefore, no refund applies to the
                Free Plan.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. How to Request a Refund</h2>
              <p>To request a refund, please follow these steps:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Send an email to{" "}
                  <a href="mailto:support@snapcutai.com" className="text-primary hover:underline">
                    support@snapcutai.com
                  </a>{" "}
                  with the subject line <strong className="text-foreground">"Refund Request"</strong>
                </li>
                <li>Include your registered email address and the Razorpay Payment ID (found in your payment confirmation email)</li>
                <li>Provide a brief reason for your refund request</li>
                <li>Our team will review your request and respond within 3–5 business days</li>
              </ol>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Refund Processing</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Approved refunds will be processed through Razorpay to your original payment method</li>
                <li>Refunds typically take 5–7 business days to reflect in your account, depending on your bank</li>
                <li>We will send you an email confirmation once the refund has been initiated</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Non-Refundable Situations</h2>
              <p>Refunds will NOT be issued in the following cases:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The user has extensively used the Service (more than 10 images on Pro Plan)</li>
                <li>The request is made after the 7-day refund window</li>
                <li>Credits have been partially or fully consumed</li>
                <li>Account was terminated due to violation of our Terms and Conditions</li>
                <li>Dissatisfaction with AI processing quality after extensive usage</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Exceptions</h2>
              <p>
                In cases of technical errors, duplicate charges, or service outages that prevented you from
                using the Service, we will issue a full refund regardless of the above conditions. Please
                provide evidence of the issue (e.g., screenshots, error messages) when contacting support.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">9. Contact Us</h2>
              <p>For refund-related queries, please reach out to us:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-foreground">Email:</strong> support@snapcutai.com</li>
                <li><strong className="text-foreground">Phone:</strong> +91-XXXXXXXXXX</li>
                <li><strong className="text-foreground">Response Time:</strong> 3–5 business days</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
