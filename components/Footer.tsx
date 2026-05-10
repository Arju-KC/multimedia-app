export default function Footer() {
  return (
    <footer className="w-full py-12 flex flex-col items-center justify-center gap-4">
      {/* Decorative separator */}
      <div className="w-24 h-[1px] bg-slate-200 mb-2" />
      
      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
        © 2026 <span className="text-slate-600">Cloud Multimedia Platform</span>
      </p>
      
      <div className="flex gap-4">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-300" />
        <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
      </div>
    </footer>
  );
}