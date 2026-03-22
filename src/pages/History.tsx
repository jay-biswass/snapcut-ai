import { useState } from "react";
import { Link } from "react-router-dom";
import { Download, Trash2, Clock, Image, ArrowLeft, Edit2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHistory } from "@/hooks/useHistory";
import { forceDownload } from "@/components/ImageUploadZone";

function formatDate(ts: number) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(ts));
}

export default function History() {
  const { history, loading, removeEntry, clearHistory, updateFileName, incrementDownload } = useHistory();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const startEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      updateFileName(editingId, editName.trim());
    }
    setEditingId(null);
  };

  const handleDownload = (ev: React.MouseEvent, url: string, filename: string, id: string) => {
    ev.stopPropagation();
    forceDownload(url, `snapcut-${filename}`);
    incrementDownload(id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin text-primary">
          <Clock size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">History</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {history.length === 0
              ? "No images processed yet."
              : `${history.length} image${history.length !== 1 ? "s" : ""} processed`}
          </p>
        </div>
        {history.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={() => { if (confirm("Clear all history?")) clearHistory(); }}
          >
            <Trash2 size={14} /> Clear All
          </Button>
        )}
      </div>

      {/* Empty state */}
      {history.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Image size={28} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">No history yet</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Upload an image and remove its background to see results here.
            </p>
          </div>
          <Link to="/dashboard">
            <Button variant="gradient" className="mt-2">
              <ArrowLeft size={16} /> Go to Upload
            </Button>
          </Link>
        </div>
      )}

      {/* Grid */}
      {history.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="glass-card rounded-2xl overflow-hidden group border border-border/30 hover:border-primary/30 transition-all duration-300"
            >
              {/* Result image with checkered background */}
              <div
                className="relative aspect-video flex items-center justify-center overflow-hidden"
                style={{
                  background:
                    "repeating-conic-gradient(hsl(var(--muted)) 0% 25%, transparent 0% 50%) 50% / 16px 16px",
                }}
              >
                <img
                  src={entry.resultUrl}
                  alt={entry.filename}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="gradient"
                    onClick={(e) => handleDownload(e, entry.resultUrl, entry.filename, entry.id)}
                  >
                    <Download size={14} /> Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-destructive/40 text-destructive hover:bg-destructive/10"
                    onClick={() => removeEntry(entry.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              {/* Card footer */}
              <div className="p-3 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  {editingId === entry.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        autoFocus
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                        onBlur={saveEdit}
                        className="text-sm font-medium bg-muted/50 border border-primary/30 rounded px-2 py-0.5 w-full outline-none focus:border-primary"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group/edit cursor-text" onClick={() => startEdit(entry.id, entry.filename)}>
                      <p className="text-sm font-medium text-foreground truncate">{entry.filename}</p>
                      <Edit2 size={12} className="text-muted-foreground opacity-0 group-hover/edit:opacity-100 transition-opacity" />
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5 whitespace-nowrap overflow-hidden">
                    <Clock size={11} className="shrink-0" />
                    <span>{formatDate(entry.processedAt)}</span>
                    
                    {entry.generationTimeMs > 0 && (
                      <>
                        <span className="mx-0.5 opacity-50">•</span>
                        <span>{(entry.generationTimeMs / 1000).toFixed(1)}s</span>
                      </>
                    )}
                    
                    {entry.downloadCount > 0 && (
                      <>
                        <span className="mx-0.5 opacity-50">•</span>
                        <Download size={10} className="shrink-0" />
                        <span>{entry.downloadCount}</span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="shrink-0"
                  onClick={(e) => handleDownload(e, entry.resultUrl, entry.filename, entry.id)}
                >
                  <Download size={15} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
