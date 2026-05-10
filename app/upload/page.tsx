"use client";

import React, { useState } from 'react';
import { UploadCloud, File as FileIcon, X, Loader2, CheckCircle2 } from 'lucide-react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setStatus('idle');

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setFile(null); // Clear file on success
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center p-6">
      <main className="w-full max-w-[500px] bg-white/60 backdrop-blur-2xl border border-white/50 rounded-4xl p-10 shadow-2xl animate-in fade-in zoom-in duration-700">
        <header className="mb-8 text-center">
          <div className="inline-flex p-4 rounded-2xl bg-blue-600/10 text-blue-600 mb-4 shadow-sm">
            {status === 'success' ? <CheckCircle2 size={32} className="text-emerald-600" /> : <UploadCloud size={32} />}
          </div>
          <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            Asset Management
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mt-1">
            {status === 'success' ? 'File Ready!' : 'Upload Multimedia'}
          </h1>
        </header>

        <div className="space-y-6">
          {/* Dropzone Area */}
          <div className="relative group border-2 border-dashed border-slate-200 bg-white/20 rounded-4xl p-12 transition-all hover:bg-white/40 hover:border-blue-600/30 flex flex-col items-center justify-center text-center">
            <input 
              type="file" 
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                setStatus('idle');
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            
            <div className="p-3 rounded-2xl bg-white/60 shadow-sm mb-4 group-hover:scale-110 transition-transform">
              <FileIcon className={file ? "text-blue-600" : "text-slate-400"} size={24} />
            </div>
            
            <p className="text-sm font-semibold text-slate-600 truncate max-w-full px-4">
              {file ? file.name : (
                <>Drag & drop or <span className="text-blue-600">browse</span></>
              )}
            </p>
            <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mt-2">
              {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : 'Max file size 50MB'}
            </p>
          </div>

          <button 
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full bg-blue-600 disabled:bg-slate-300 text-white font-bold py-5 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing...
              </>
            ) : status === 'success' ? 'Upload Another' : 'Upload Now'}
          </button>
        </div>

        <button 
          onClick={() => { setFile(null); setStatus('idle'); }}
          className="mt-6 w-full flex items-center justify-center gap-2 text-slate-500 font-bold text-[10px] tracking-widest uppercase transition-colors hover:text-slate-800"
        >
          <X size={14} />
          Clear Selection
        </button>
      </main>
    </div>
  );
}