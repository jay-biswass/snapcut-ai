import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { openRazorpayCheckout } from "@/lib/razorpay";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Try it out, no card required.",
    features: ["5 images per day", "Standard quality", "Web upload only", "Community support"],
    cta: "Get Started",
    popular: false,
    amount: 0,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    description: "For professionals and power users.",
    features: [
      "Unlimited images",
      "HD quality output",
      "API access",
      "Batch processing",
      "Priority support",
      "No watermarks",
    ],
    cta: "Start Pro Trial",
    popular: true,
    amount: 49900, // ₹499 in paise
  },
  {
    name: "Credits",
    price: "₹99",
    period: "/50 credits",
    description: "Pay as you go. No commitments.",
    features: ["50 image credits", "HD quality output", "API access", "Never expires", "Bulk discounts"],
    cta: "Buy Credits",
    popular: false,
    amount: 9900, // ₹99 in paise
  },
];

const PricingSection = () => {
  const handlePayment = (plan: typeof plans[0]) => {
    if (plan.amount === 0) return; // Free plan, no payment needed

    openRazorpayCheckout({
      planName: plan.name,
      amount: plan.amount,
      description: `SnapCut AI - ${plan.name} Plan`,
      onSuccess: (response) => {
        toast.success("Payment successful!", {
          description: `Payment ID: ${response.razorpay_payment_id}`,
        });
      },
      onFailure: (response) => {
        toast.error("Payment failed", {
          description: response.error.description,
        });
      },
      onDismiss: () => {
        toast.info("Payment cancelled", {
          description: "You can try again anytime.",
        });
      },
    });
  };

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Start free, upgrade when you need more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass-card rounded-2xl p-8 space-y-6 relative ${
                plan.popular ? "border-primary/50 glow-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-bg text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.amount === 0 ? (
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link to="/register">{plan.cta}</Link>
                </Button>
              ) : (
                <Button
                  variant={plan.popular ? "gradient" : "outline"}
                  className="w-full"
                  onClick={() => handlePayment(plan)}
                >
                  {plan.cta}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
