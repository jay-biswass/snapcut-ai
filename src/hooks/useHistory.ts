import { useState, useEffect } from "react";

export interface HistoryEntry {
  id: string;
  originalUrl: string;  // the original image URL or local object URL
  resultUrl: string;    // Cloudinary URL returned by n8n
  filename: string;
  processedAt: number;  // unix ms timestamp
}

const STORAGE_KEY = "snapcut_history";

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(entries: HistoryEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // storage quota exceeded — silently skip
  }
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);

  // Keep localStorage in sync whenever history changes
  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const addEntry = (entry: Omit<HistoryEntry, "id" | "processedAt">) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      processedAt: Date.now(),
    };
    setHistory((prev) => [newEntry, ...prev]);
  };

  const removeEntry = (id: string) => {
    setHistory((prev) => prev.filter((e) => e.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addEntry, removeEntry, clearHistory };
}
