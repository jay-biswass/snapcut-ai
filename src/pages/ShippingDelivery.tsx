import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Package } from "lucide-react";

const ShippingDelivery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Shipping & Delivery Policy</h1>
            <p className="text-muted-foreground">Last updated: March 16, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            {/* Digital Service Notice */}
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 flex items-start gap-4">
              <Package className="text-primary shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Digital Service — No Physical Shipping</h3>
                <p className="text-muted-foreground">
                  SnapCut AI is a 100% digital, cloud-based SaaS (Software-as-a-Service) platform. We do not
                  sell or ship any physical products. All our services, including AI background removal, are
                  delivered electronically through our website.
                </p>
              </div>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Service Delivery</h2>
              <p>
                Since SnapCut AI is a digital service, all deliverables are provided instantly through our
                web application. Here's what to expect:
              </p>

              <h3 className="text-lg font-medium text-foreground/90">1.1 Free Plan</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Instant access upon account registration</li>
                <li>No payment required — start using immediately</li>
                <li>5 images per day, standard quality output</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground/90">1.2 Pro Plan (₹499/month)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Instant activation upon successful payment</li>
                <li>All Pro features are available immediately after payment confirmation</li>
                <li>A payment confirmation email is sent to your registered email address</li>
                <li>Your account is automatically upgraded to Pro status</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground/90">1.3 Credit Purchases (₹99/50 credits)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Credits are added to your account instantly upon successful payment</li>
                <li>You will receive a payment confirmation email with transaction details</li>
                <li>Credits are available for immediate use</li>
                <li>Credits never expire</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Processing Time</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-foreground">Account activation:</strong> Immediate (within seconds of registration)</li>
                <li><strong className="text-foreground">Plan upgrade:</strong> Immediate (within seconds of successful payment via Razorpay)</li>
                <li><strong className="text-foreground">Credit delivery:</strong> Immediate (within seconds of successful payment)</li>
                <li><strong className="text-foreground">Image processing:</strong> Typically under 5 seconds per image, depending on image size and complexity</li>
                <li><strong className="text-foreground">Payment confirmation email:</strong> Within 5 minutes of successful payment</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. Access to Processed Images</h2>
              <p>
                Once your image background has been removed, you can:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Download the processed image instantly from the dashboard</li>
                <li>Access your processing history from the History section</li>
                <li>Download previously processed images anytime (subject to data retention policy)</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. Service Availability</h2>
              <p>
                SnapCut AI is available 24 hours a day, 7 days a week, 365 days a year. We strive for
                99.9% uptime. Occasional maintenance windows may occur, during which the service may be
                temporarily unavailable. We will communicate scheduled maintenance in advance whenever possible.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Delivery Issues</h2>
              <p>
                If you experience any issues with service delivery, such as:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Payment was successful but your account was not upgraded</li>
                <li>Credits were not added to your account after payment</li>
                <li>Unable to access the service after subscription</li>
              </ul>
              <p>
                Please contact our support team immediately and we will resolve the issue within 24 hours.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Contact Us</h2>
              <p>For delivery-related queries, please reach out to us:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-foreground">Email:</strong> support@snapcutai.com</li>
                <li><strong className="text-foreground">Phone:</strong> +91-XXXXXXXXXX</li>
                <li><strong className="text-foreground">Response Time:</strong> Within 24 hours</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingDelivery;
