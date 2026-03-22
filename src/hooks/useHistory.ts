import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface HistoryEntry {
  id: string;
  originalUrl: string;  // the original image URL or local object URL
  resultUrl: string;    // Cloudinary URL returned by n8n
  filename: string;
  processedAt: number;  // unix ms timestamp
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setHistory([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("image_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        setHistory(data.map(d => ({
          id: d.id,
          originalUrl: d.original_image_url,
          resultUrl: d.processed_image_url,
          filename: d.filename || "image.png",
          processedAt: new Date(d.created_at).getTime(),
        })));
      }
    } catch (e) {
      console.error("Error fetching history:", e);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entry: Omit<HistoryEntry, "id" | "processedAt">) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const newId = crypto.randomUUID();
      const processedAt = Date.now();
      
      const newEntry: HistoryEntry = { ...entry, id: newId, processedAt };
      setHistory(prev => [newEntry, ...prev]);

      await supabase.from("image_history").insert({
        id: newId,
        user_id: user.id,
        original_image_url: entry.originalUrl,
        processed_image_url: entry.resultUrl,
        filename: entry.filename,
      });
    } catch (e) {
      console.error("Error adding history entry:", e);
    }
  };

  const removeEntry = async (id: string) => {
    try {
      setHistory((prev) => prev.filter((e) => e.id !== id));
      await supabase.from("image_history").delete().eq("id", id);
    } catch (e) {
      console.error("Error deleting entry", e);
    }
  };

  const clearHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      setHistory([]);
      await supabase.from("image_history").delete().eq("user_id", user.id);
    } catch (e) {
      console.error("Error clearing history", e);
    }
  };

  return { history, loading, addEntry, removeEntry, clearHistory };
}
