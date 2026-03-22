import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard, User as UserIcon } from "lucide-react";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "API", href: "/api-docs" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 h-full">
          <img src={logo} alt="SnapCut AI" className="h-[44px] w-auto object-contain py-1" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Button variant="ghost" className="gap-2" asChild>
                <Link to="/dashboard">
                  <LayoutDashboard size={16} /> My Dashboard
                </Link>
              </Button>
              <div className="flex items-center gap-2 pl-4 ml-1 border-l border-border/50 text-sm font-medium text-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <UserIcon size={16} />
                </div>
                {user.user_metadata?.full_name || 'User'}
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button variant="gradient" asChild>
                <Link to="/register">Get Started Free</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-card border-t border-border/30 p-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm text-muted-foreground hover:text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-border/30 mt-2">
            {user ? (
              <>
                <Button variant="ghost" className="justify-start gap-2" asChild onClick={() => setIsOpen(false)}>
                  <Link to="/dashboard">
                    <LayoutDashboard size={16} /> My Dashboard
                  </Link>
                </Button>
                <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground">
                  <UserIcon size={16} />
                  {user.user_metadata?.full_name || 'User'}
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button variant="gradient" asChild onClick={() => setIsOpen(false)}>
                  <Link to="/register">Get Started Free</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
