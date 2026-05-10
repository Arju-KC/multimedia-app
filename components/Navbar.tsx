"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Upload", href: "/upload" },
    { name: "Gallery", href: "/gallery" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full px-6 py-6 pointer-events-none">
      <div className="max-w-6xl mx-auto bg-white/40 backdrop-blur-2xl border border-white/50 rounded-2xl px-8 py-4 flex justify-between items-center shadow-lg shadow-slate-200/20 pointer-events-auto transition-all">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Cloud <span className="text-blue-600">Gallery</span>
        </h1>

        <div className="flex space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[10px] font-bold tracking-widest uppercase transition-all active:scale-95 ${
                  isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}