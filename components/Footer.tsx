"use client";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="w-full mt-auto flex flex-col bg-[#0a0a0a]">
      {/* 🌟 Amazon Style 'Back to top' Button 🌟 */}
      <button 
        onClick={scrollToTop}
        className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 text-sm font-medium transition-colors cursor-pointer text-center"
      >
        Back to top
      </button>

      {/* 🌟 Links Section (4 Columns) 🌟 */}
      <div className="pt-12 pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-sm">
          
          {/* Column 1: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-base mb-1">Curse AI</h3>
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
            <Link href="/explore" className="text-slate-400 hover:text-white transition-colors">Explore Tools</Link>
            <Link href="/categories" className="text-slate-400 hover:text-white transition-colors">Categories</Link>
            <Link href="/guides" className="text-slate-400 hover:text-white transition-colors">AI Guides</Link>
          </div>

          {/* Column 2: Top Categories */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-base mb-1">Top Categories</h3>
            <Link href="/categories" className="text-slate-400 hover:text-white transition-colors">Video AI Tools</Link>
            <Link href="/categories" className="text-slate-400 hover:text-white transition-colors">Image Generation</Link>
            <Link href="/categories" className="text-slate-400 hover:text-white transition-colors">Coding Assistants</Link>
            <Link href="/categories" className="text-slate-400 hover:text-white transition-colors">Voice & Audio AI</Link>
          </div>

          {/* Column 3: Connect with Us */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-base mb-1">Connect with Us</h3>
            <Link href="#" className="text-slate-400 hover:text-white transition-colors">Twitter (X)</Link>
            <Link href="#" className="text-slate-400 hover:text-white transition-colors">Discord Community</Link>
            <Link href="#" className="text-slate-400 hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="text-slate-400 hover:text-white transition-colors">Contact Support</Link>
          </div>

          {/* Column 4: Legal & More */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-base mb-1">Make Money with Us</h3>
            <Link href="/submit" className="text-slate-400 hover:text-white transition-colors">Submit an AI Tool</Link>
            <Link href="#" className="text-slate-400 hover:text-white transition-colors">Advertise with Us</Link>
            <Link href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
          </div>

        </div>

        {/* 🌟 Bottom Logo & Copyright 🌟 */}
        <div className="border-t border-slate-900 pt-8 flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-black text-white tracking-tighter">
            CURSE <span className="text-blue-500">AI</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium text-center">
            © 2026 Curse AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}