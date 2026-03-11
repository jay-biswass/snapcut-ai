import { useRef, useState, useEffect, useCallback, DragEvent } from "react";
import { Upload, Zap, X, Download, Loader2, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useHistory } from "@/hooks/useHistory";

interface ImageUploadZoneProps {
  compact?: boolean; // true = homepage preview mode, false = full dashboard mode
}

type Stage = "idle" | "preview" | "processing" | "done" | "error";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const WEBHOOK_URL = "https://jaybiswas0809.app.n8n.cloud/webhook/remove-background";

// Send a File as binary multipart/form-data to the n8n webhook
async function removeBackgroundFromFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file, file.name);

  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Webhook error: ${response.status} ${response.statusText}`);
  }

  // n8n returns JSON: { "url": "https://..." }
  // Force https — n8n/Cloudinary sometimes returns http:// which browsers block on HTTPS sites
  const data = await response.json();
  return (data.url as string).replace(/^http:\/\//, "https://");
}

// Send an image URL to the n8n webhook so it can fetch & process it
async function removeBackgroundFromUrl(imageUrl: string): Promise<string> {
  const formData = new FormData();
  formData.append("imageUrl", imageUrl);

  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Webhook error: ${response.status} ${response.statusText}`);
  }

  // n8n returns JSON: { "url": "https://..." }
  // Force https — n8n/Cloudinary sometimes returns http:// which browsers block on HTTPS sites
  const data = await response.json();
  return (data.url as string).replace(/^http:\/\//, "https://");
}

// Force-download any URL. For Cloudinary URLs we use the fl_attachment
// transformation flag which makes Cloudinary return the image with a
// Content-Disposition: attachment header — no fetch() needed, no CORS issues.
// For other URLs we fall back to a fetch-blob approach.
export async function forceDownload(url: string, filename = "snapcut-result.png") {
  // Cloudinary URL pattern: https://res.cloudinary.com/<cloud>/image/upload/<options>/v<version>/<path>
  // Normalize to https first (in case an old http URL slipped through from history)
  const safeUrl = url.replace(/^http:\/\//, "https://");
  const cloudinaryRegex = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(v\d+\/.+)$/;
  const match = safeUrl.match(cloudinaryRegex);

  if (match) {
    // Insert fl_attachment/<filename> before the version segment
    const downloadUrl = `${match[1]}fl_attachment:${filename.replace(/\.[^.]+$/, "")}/${match[2]}`;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename;
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();
    return;
  }

  // Non-Cloudinary URLs: try fetch → blob → object URL download
  try {
    const res = await fetch(safeUrl);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, "_blank");
  }
}

export default function ImageUploadZone({ compact = false }: ImageUploadZoneProps) {
  const { toast } = useToast();
  const { addEntry } = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);

  const [stage, setStage] = useState<Stage>("idle");
  const [dragging, setDragging] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [currentFilename, setCurrentFilename] = useState<string>("image");
  const [urlInputVisible, setUrlInputVisible] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  // ─── Process a File object ────────────────────────────────────────────────
  const processFile = useCallback(
    async (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast({ title: "Unsupported file", description: "Please upload a JPG, PNG, WEBP or GIF image.", variant: "destructive" });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast({ title: "File too large", description: "Maximum file size is 10 MB.", variant: "destructive" });
        return;
      }
      const preview = URL.createObjectURL(file);
      setOriginalUrl(preview);
      setCurrentFilename(file.name.replace(/\.[^.]+$/, "") || "image");
      setStage("processing");
      try {
        const result = await removeBackgroundFromFile(file);
        setResultUrl(result);
        setStage("done");
        // ── Persist to localStorage history ──────────────────────────────
        addEntry({ originalUrl: preview, resultUrl: result, filename: file.name });
      } catch {
        setStage("error");
        toast({ title: "Error", description: "Failed to remove background. Please try again.", variant: "destructive" });
      }
    },
    [toast, addEntry]
  );

  // ─── Process an image URL ─────────────────────────────────────────────────
  const processUrl = useCallback(
    async (url: string) => {
      const trimmed = url.trim();
      if (!trimmed.match(/^https?:\/\/.+/i)) {
        toast({ title: "Invalid URL", description: "Please paste a valid image URL starting with http:// or https://", variant: "destructive" });
        return;
      }
      setOriginalUrl(trimmed);
      setCurrentFilename("image-from-url");
      setUrlInputVisible(false);
      setUrlInput("");
      setStage("processing");
      try {
        const result = await removeBackgroundFromUrl(trimmed);
        setResultUrl(result);
        setStage("done");
        // ── Persist to localStorage history ──────────────────────────────
        addEntry({ originalUrl: trimmed, resultUrl: result, filename: "image-from-url.png" });
      } catch {
        setStage("error");
        toast({ title: "Error", description: "Could not fetch or process that image URL.", variant: "destructive" });
      }
    },
    [toast, addEntry]
  );

  // ─── Drag & Drop handlers ─────────────────────────────────────────────────
  const onDragOver = (e: DragEvent) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setDragging(false);

      // 1. File dragged from desktop
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFile(e.dataTransfer.files[0]);
        return;
      }
      // 2. Image dragged from browser (img element)
      const imgSrc = e.dataTransfer.getData("text/uri-list") || e.dataTransfer.getData("text/plain");
      if (imgSrc) {
        processUrl(imgSrc);
      }
    },
    [processFile, processUrl]
  );

  // ─── Global paste (Ctrl+V) ────────────────────────────────────────────────
  useEffect(() => {
    const handlePaste = (e: globalThis.ClipboardEvent) => {
      // If URL input is focused, let it handle naturally
      if (urlInputVisible) return;

      // Pasted file/image
      const items = e.clipboardData?.items;
      if (items) {
        for (const item of Array.from(items)) {
          if (item.kind === "file" && item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) { processFile(file); return; }
          }
        }
        // Pasted text — check if it looks like a URL
        const text = e.clipboardData?.getData("text");
        if (text && text.trim().match(/^https?:\/\/.+\.(png|jpg|jpeg|webp|gif)/i)) {
          processUrl(text.trim());
          return;
        }
        // Any pasted URL — show URL input pre-filled
        if (text && text.trim().match(/^https?:\/\//i)) {
          setUrlInput(text.trim());
          setUrlInputVisible(true);
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [urlInputVisible, processFile, processUrl]);

  // ─── Click to upload ──────────────────────────────────────────────────────
  const onZoneClick = () => {
    if (stage === "idle" || stage === "error") {
      inputRef.current?.click();
    }
  };

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const reset = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    setStage("idle");
    setOriginalUrl(null);
    setResultUrl(null);
  };

  const downloadResult = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    if (!resultUrl) return;
    forceDownload(resultUrl, `snapcut-${currentFilename}.png`);
  };

  // ─── Render helpers ───────────────────────────────────────────────────────
  const borderClass = dragging
    ? "border-primary/80 bg-primary/5"
    : stage === "done"
    ? "border-green-500/50"
    : "border-border/50 hover:border-primary/40";

  if (compact) {
    // ── Homepage dual-panel mode ─────────────────────────────────────────
    return (
      <div
        ref={zoneRef}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={onZoneClick}
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-center cursor-pointer select-none`}
      >
        <input ref={inputRef} type="file" accept={ACCEPTED_TYPES.join(",")} className="hidden" onChange={onFileInput} />

        {/* Left: Original */}
        <div
          className={`relative bg-muted/30 rounded-xl aspect-square flex items-center justify-center border-2 border-dashed transition-all duration-300 overflow-hidden ${borderClass}`}
        >
          {originalUrl ? (
            <img src={originalUrl} alt="Original" className="w-full h-full object-contain rounded-xl" />
          ) : (
            <div className="text-center space-y-2 px-4">
              <Upload size={32} className={`mx-auto transition-colors ${dragging ? "text-primary" : "text-muted-foreground"}`} />
              <p className="text-sm font-medium text-muted-foreground">
                {dragging ? "Drop image here!" : "Click, drag & drop, or Ctrl+V"}
              </p>
              <p className="text-xs text-muted-foreground/60">JPG · PNG · WEBP · up to 10MB</p>
            </div>
          )}
          {dragging && (
            <div className="absolute inset-0 border-2 border-primary rounded-xl bg-primary/5 flex items-center justify-center">
              <p className="text-primary font-semibold text-sm">Drop to upload</p>
            </div>
          )}
        </div>

        {/* Right: Result */}
        <div
          className="relative rounded-xl aspect-square flex items-center justify-center overflow-hidden"
          style={{ background: "repeating-conic-gradient(hsl(var(--muted)) 0% 25%, transparent 0% 50%) 50% / 20px 20px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {stage === "processing" && (
            <div className="absolute inset-0 bg-background/60 flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
              <Loader2 size={32} className="text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Removing background…</p>
            </div>
          )}
          {stage === "done" && resultUrl ? (
            <>
              <img src={resultUrl} alt="Result" className="w-full h-full object-contain" />
              <div className="absolute bottom-3 right-3 flex gap-2">
                <Button size="sm" variant="gradient" onClick={downloadResult}><Download size={14} /> Save</Button>
                <Button size="sm" variant="outline" onClick={reset}><X size={14} /></Button>
              </div>
            </>
          ) : stage !== "processing" ? (
            <div className="text-center space-y-2">
              <Zap size={32} className="mx-auto text-primary" />
              <p className="text-sm text-muted-foreground">Background Removed</p>
            </div>
          ) : null}
        </div>

        {/* URL paste hint */}
        {urlInputVisible && (
          <div className="col-span-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-2">
              <input
                autoFocus
                className="flex-1 bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                placeholder="Paste image URL here…"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") processUrl(urlInput); if (e.key === "Escape") setUrlInputVisible(false); }}
              />
              <Button size="sm" variant="gradient" onClick={() => processUrl(urlInput)}>Go</Button>
              <Button size="sm" variant="outline" onClick={() => setUrlInputVisible(false)}><X size={14} /></Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Dashboard full-zone mode ───────────────────────────────────────────────
  return (
    <div
      ref={zoneRef}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onZoneClick}
      className={`glass-card rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer select-none ${borderClass}`}
    >
      <input ref={inputRef} type="file" accept={ACCEPTED_TYPES.join(",")} className="hidden" onChange={onFileInput} />

      {/* Idle */}
      {stage === "idle" && (
        <div className="p-8 text-center space-y-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto transition-colors ${dragging ? "bg-primary/20" : "bg-primary/10"}`}>
            <Upload size={28} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {dragging ? "Release to upload!" : "Drop your image here"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse &bull; drag from browser &bull; <kbd className="px-1 py-0.5 rounded bg-muted text-xs">Ctrl+V</kbd> to paste URL
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">JPG, PNG, WEBP up to 10MB</p>
          </div>
        </div>
      )}

      {/* Processing */}
      {stage === "processing" && (
        <div className="p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Loader2 size={28} className="text-primary animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Removing background…</h3>
            <p className="text-sm text-muted-foreground mt-1">AI is working its magic ✨</p>
          </div>
          {originalUrl && (
            <img src={originalUrl} alt="Preview" className="mx-auto max-h-48 rounded-xl object-contain opacity-60" />
          )}
        </div>
      )}

      {/* Done */}
      {stage === "done" && originalUrl && resultUrl && (
        <div className="p-8 space-y-4" onClick={(e) => e.stopPropagation()}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium text-center">Original</p>
              <img src={originalUrl} alt="Original" className="rounded-xl object-contain w-full max-h-56" />
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium text-center">Background Removed</p>
              <div className="rounded-xl overflow-hidden" style={{ background: "repeating-conic-gradient(hsl(var(--muted)) 0% 25%, transparent 0% 50%) 50% / 16px 16px" }}>
                <img src={resultUrl} alt="Result" className="object-contain w-full max-h-56" />
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button variant="gradient" onClick={downloadResult}><Download size={16} /> Download Result</Button>
            <Button variant="outline" onClick={reset}><X size={16} /> Upload Another</Button>
          </div>
        </div>
      )}

      {/* Error */}
      {stage === "error" && (
        <div className="p-8 text-center space-y-3">
          <p className="text-destructive font-semibold">Something went wrong</p>
          <Button variant="outline" size="sm" onClick={reset}>Try Again</Button>
        </div>
      )}

      {/* URL paste input (shown after Ctrl+V non-image URL) */}
      {urlInputVisible && stage === "idle" && (
        <div className="px-8 pb-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex gap-2">
            <input
              autoFocus
              className="flex-1 bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
              placeholder="Paste image URL here…"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") processUrl(urlInput); if (e.key === "Escape") setUrlInputVisible(false); }}
            />
            <Button size="sm" variant="gradient" onClick={() => processUrl(urlInput)}><Link2 size={14} /> Go</Button>
            <Button size="sm" variant="outline" onClick={() => setUrlInputVisible(false)}><X size={14} /></Button>
          </div>
        </div>
      )}
    </div>
  );
}
