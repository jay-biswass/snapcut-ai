import { Zap, Shield, Image, Code, Clock, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process images in under 5 seconds with our optimized AI pipeline.",
  },
  {
    icon: Image,
    title: "Pixel-Perfect Results",
    description: "Advanced edge detection preserves fine details like hair and transparent objects.",
  },
  {
    icon: Code,
    title: "Developer API",
    description: "RESTful API with SDK support. Integrate background removal into your apps.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Images auto-delete after 24 hours. No permanent storage. HTTPS everywhere.",
  },
  {
    icon: Clock,
    title: "Batch Processing",
    description: "Process multiple images at once. Perfect for e-commerce and studios.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Mobile-first responsive design. Upload from any device, anywhere.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            Why Choose <span className="gradient-text">SnapCut AI</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Enterprise-grade background removal powered by the latest AI models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card rounded-2xl p-6 space-y-4 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:glow-primary transition-all">
                <feature.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
