import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Building2, Clock, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24–48 hours.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-6xl">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Have a question, feedback, or need help? We'd love to hear from you. Reach out through
              any of the channels below or fill out the contact form.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Get in Touch</h2>

              <div className="space-y-5">
                <div className="glass-card rounded-xl p-5 flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Building2 className="text-primary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Trade Name</h3>
                    <p className="text-muted-foreground">SnapCut AI</p>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-5 flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Mail className="text-primary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Email</h3>
                    <a
                      href="mailto:support@snapcutai.com"
                      className="text-primary hover:underline"
                    >
                      support@snapcutai.com
                    </a>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-5 flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Phone className="text-primary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Phone</h3>
                    <a href="tel:+91XXXXXXXXXX" className="text-primary hover:underline">
                      +91-XXXXXXXXXX
                    </a>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-5 flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <MapPin className="text-primary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Address</h3>
                    <p className="text-muted-foreground">[Your Business Address], India</p>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-5 flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Clock className="text-primary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Business Hours</h3>
                    <p className="text-muted-foreground">Monday – Saturday: 10:00 AM – 7:00 PM IST</p>
                    <p className="text-muted-foreground text-sm">Response time: 24–48 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-sm font-medium text-foreground">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={16} />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
