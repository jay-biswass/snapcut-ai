import { Link, useLocation, Outlet } from "react-router-dom";
import { Image, CreditCard, History as HistoryIcon, Settings, LogOut, Zap, Key, Upload } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { icon: Upload,      label: "Upload",   href: "/dashboard" },
  { icon: HistoryIcon, label: "History",  href: "/dashboard/history" },
  { icon: CreditCard,  label: "Billing",  href: "/dashboard/billing" },
  { icon: Key,         label: "API Keys", href: "/dashboard/api-keys" },
  { icon: Settings,    label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border/30 bg-card/30 p-4 shrink-0">
        <Link to="/" className="mb-8 block">
          <img src={logo} alt="SnapCut AI" className="h-8" />
        </Link>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-destructive transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      {/* ── Page content rendered by child routes ──────────────────────── */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
