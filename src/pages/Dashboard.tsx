import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, Image, CreditCard, History, Settings, LogOut, Zap, Key } from "lucide-react";
import logo from "@/assets/logo.png";

const stats = [
  { label: "Images Today", value: "3/5", icon: Image },
  { label: "Credits Left", value: "47", icon: Zap },
  { label: "Total Processed", value: "128", icon: History },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border/30 bg-card/30 p-4">
        <Link to="/" className="mb-8">
          <img src={logo} alt="SnapCut AI" className="h-8" />
        </Link>

        <nav className="flex-1 space-y-1">
          {[
            { icon: Upload, label: "Upload", href: "/dashboard" },
            { icon: History, label: "History", href: "/dashboard/history" },
            { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
            { icon: Key, label: "API Keys", href: "/dashboard/api-keys" },
            { icon: Settings, label: "Settings", href: "/dashboard/settings" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-destructive transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Upload images and manage your account.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <stat.icon size={16} />
                  <span className="text-sm">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Upload Zone */}
          <div className="glass-card rounded-2xl p-8 border-2 border-dashed border-border/50 hover:border-primary/40 transition-colors cursor-pointer">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Upload size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Drop your image here</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse • JPG, PNG, WEBP up to 10MB
                </p>
              </div>
              <Button variant="gradient">Select Image</Button>
            </div>
          </div>

          {/* Recent Uploads */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Uploads</h2>
            <div className="glass-card rounded-2xl p-6 text-center text-muted-foreground">
              <Image size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No uploads yet. Start by uploading an image above.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
