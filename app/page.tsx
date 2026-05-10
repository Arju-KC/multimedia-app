"use client";

import React from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, Shield, Zap } from 'lucide-react';

export default function Home() {
  const features = [
    { icon: Zap, text: "High Speed" },
    { icon: Shield, text: "Secure" },
    { icon: Layers, text: "Scalable" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Main Glass Hero Container */}
      <main className="w-full max-w-4xl bg-white/60 backdrop-blur-2xl border border-white/50 rounded-4xl p-10 md:p-20 shadow-2xl animate-in fade-in zoom-in duration-1000 text-center mx-auto">
        <header className="flex flex-col items-center">
          <div className="p-5 rounded-2xl bg-blue-600/10 text-blue-600 mb-8 shadow-sm">
            <Layers size={48} />
          </div>
          {/* Ensure the heading has leading-tight for better multi-line looks */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Multimedia <span className="text-blue-600">Cloud</span> Platform
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            A high-density visual experience for managing your digital assets with
            unparalleled speed and security.
          </p>
        </header>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/40 border border-white/50 rounded-full">
              <feature.icon size={14} className="text-emerald-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* Action Group */}
        <footer className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/gallery" className="no-underline">
            <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-blue-600/20">
              Get Started <ArrowRight size={18} />
            </button>
          </Link>

          <Link href="/upload" className="no-underline">
            <button className="w-full sm:w-auto px-10 py-5 bg-white/40 backdrop-blur-md border border-white/50 text-slate-800 font-bold rounded-2xl transition-transform active:scale-95">
              Upload Media
            </button>
          </Link>
        </footer>
      </main>
    </div>
  );
}