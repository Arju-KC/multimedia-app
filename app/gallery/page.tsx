"use client";

import { useEffect, useState } from "react";
import { 
  FileText, 
  RefreshCw, 
  Edit3, 
  Trash2, 
  MoreVertical, 
  ExternalLink,
  Loader2 
} from "lucide-react";

interface MediaItem {
  id: string;
  fileName: string;
  fileType: string;
  url: string;
  blobName: string;
}

export default function GalleryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/gallery");
      const data = await response.json();
      setMedia(data);
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, blobName: string) => {
    if (!confirm("Are you sure you want to permanently delete this media?")) return;

    setProcessingId(id);
    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, blobName }),
      });
      const data = await response.json();
      if (data.success) fetchGallery();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleEdit = async (item: MediaItem) => {
    const newName = prompt("Rename asset:", item.fileName);
    if (!newName || newName === item.fileName) return;

    setProcessingId(item.id);
    try {
      const response = await fetch("/api/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, fileName: newName }),
      });
      const data = await response.json();
      if (data.success) fetchGallery();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <header className="mb-16 flex justify-between items-end">
        <div className="animate-in fade-in slide-in-from-left duration-700">
          <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
            Cloud Repository
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900">
            Multimedia Gallery
          </h1>
        </div>
        <button 
          onClick={fetchGallery}
          className="p-4 rounded-2xl bg-white/40 border border-white/50 text-slate-600 hover:text-blue-600 active:scale-95 transition-all shadow-sm"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-white/30 backdrop-blur-md rounded-4xl border border-white/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {media.map((item, index) => (
            <div
              key={item.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="group bg-white/60 backdrop-blur-2xl border border-white/50 rounded-4xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-in fade-in zoom-in"
            >
              {/* Media Preview Container */}
              <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                {item.fileType.startsWith("image") ? (
                  <img
                    src={item.url}
                    alt={item.fileName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-50/50 text-indigo-400">
                    <FileText size={48} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold tracking-widest uppercase mt-4 opacity-60">System Data</span>
                  </div>
                )}
                
                {/* Action Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-slate-600 hover:text-blue-600 shadow-sm transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              {/* Information & CRUD Actions */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="max-w-[80%]">
                    <p className="text-[9px] font-bold tracking-widest text-emerald-600 uppercase mb-1">
                      {item.fileType.split('/')[1] || 'Unknown'}
                    </p>
                    <h2 className="text-xl font-bold tracking-tight text-slate-800 truncate leading-tight">
                      {item.fileName}
                    </h2>
                  </div>
                  <div className="text-slate-300">
                    <MoreVertical size={20} />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    disabled={processingId === item.id}
                    className="flex-1 flex items-center justify-center gap-2 bg-white/50 border border-slate-200 text-slate-700 font-bold py-4 rounded-2xl active:scale-95 transition-all hover:bg-white hover:border-blue-400 hover:text-blue-600"
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.blobName)}
                    disabled={processingId === item.id}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-50/50 border border-red-100 text-red-600 font-bold py-4 rounded-2xl active:scale-95 transition-all hover:bg-red-600 hover:text-white hover:border-transparent"
                  >
                    {processingId === item.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}