import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="border-t border-border/30 bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img src={logo} alt="SnapCut AI" className="h-8" />
            <p className="text-sm text-muted-foreground">
              AI-powered background removal in seconds. Professional results, zero effort.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><Link to="/api-docs" onClick={scrollToTop} className="hover:text-foreground transition-colors">API</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" onClick={scrollToTop} className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/contact" onClick={scrollToTop} className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/blog" onClick={scrollToTop} className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" onClick={scrollToTop} className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" onClick={scrollToTop} className="hover:text-foreground transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/refund" onClick={scrollToTop} className="hover:text-foreground transition-colors">Refund & Cancellation</Link></li>
              <li><Link to="/shipping" onClick={scrollToTop} className="hover:text-foreground transition-colors">Shipping & Delivery</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SnapCut AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
