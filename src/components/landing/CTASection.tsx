import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="glass-card rounded-3xl p-12 md:p-16 text-center relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Remove <span className="gradient-text">Backgrounds</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Join thousands of creators, designers, and businesses using SnapCut AI.
            </p>
            <Button variant="gradient" size="lg" className="text-base px-8 py-6" asChild>
              <Link to="/register">
                Get Started Free
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
