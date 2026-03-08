import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, Zap, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 glass-card text-sm text-muted-foreground">
            <Zap size={14} className="text-primary" />
            AI-Powered Background Removal
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Remove Backgrounds{" "}
            <span className="gradient-text">Instantly</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your image, let AI do the magic. Get professional transparent backgrounds in under 5 seconds. No design skills needed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="lg" className="text-base px-8 py-6" asChild>
              <Link to="/register">
                <Upload size={18} />
                Start Free — No Card Required
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8 py-6" asChild>
              <Link to="/api-docs">
                View API Docs
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            ✨ 5 free images daily • No signup required to try
          </p>

          {/* Demo preview area */}
          <div className="mt-12 glass-card rounded-2xl p-8 max-w-3xl mx-auto border border-border/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="bg-muted/30 rounded-xl aspect-square flex items-center justify-center border border-dashed border-border/50">
                <div className="text-center space-y-2">
                  <Upload size={32} className="mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Original Image</p>
                </div>
              </div>
              <div className="relative rounded-xl aspect-square flex items-center justify-center overflow-hidden" style={{ background: 'repeating-conic-gradient(hsl(var(--muted)) 0% 25%, transparent 0% 50%) 50% / 20px 20px' }}>
                <div className="text-center space-y-2">
                  <Zap size={32} className="mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground">Background Removed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
