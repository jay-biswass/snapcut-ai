import { Image, History as HistoryIcon, Zap } from "lucide-react";
import ImageUploadZone from "@/components/ImageUploadZone";

const stats = [
  { label: "Images Today",   value: "3/5",  icon: Image },
  { label: "Credits Left",   value: "47",   icon: Zap },
  { label: "Total Processed",value: "128",  icon: HistoryIcon },
];

const Dashboard = () => (
  <div className="space-y-8">
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
    <ImageUploadZone />

    {/* Recent Uploads */}
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Recent Uploads</h2>
      <div className="glass-card rounded-2xl p-6 text-center text-muted-foreground">
        <Image size={32} className="mx-auto mb-2 opacity-50" />
        <p className="text-sm">No uploads yet. Start by uploading an image above.</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
