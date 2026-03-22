import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Image, History as HistoryIcon, Zap } from "lucide-react";
import ImageUploadZone from "@/components/ImageUploadZone";

const Dashboard = () => {
  const [credits, setCredits] = useState<number>(0);
  const [totalProcessed, setTotalProcessed] = useState<number>(0);
  const [imagesToday, setImagesToday] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single();
      
      if (profile) setCredits(profile.credits || 0);

      const { data: history } = await supabase
        .from("image_history")
        .select("created_at")
        .eq("user_id", user.id);

      if (history) {
        setTotalProcessed(history.length);
        const today = new Date().toDateString();
        setImagesToday(history.filter(h => new Date(h.created_at).toDateString() === today).length);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: "Images Today",   value: imagesToday.toString(),  icon: Image },
    { label: "Credits Left",   value: credits.toString(),   icon: Zap },
    { label: "Total Processed",value: totalProcessed.toString(),  icon: HistoryIcon },
  ];

  return (
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
    </div>
  );
};

export default Dashboard;
