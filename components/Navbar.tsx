"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Aapke saare premium links (Exact as per your design)
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Categories", href: "/categories" },
    { name: "Guides 📚", href: "/guides" },
    { name: "Submit Tool", href: "/submit" },
    { name: "Favorites ❤️", href: "/favorites" },
    { name: "Admin 👑", href: "/admin" },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* 🌟 Logo Section 🌟 */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl md:text-3xl font-black text-white tracking-tighter">
              CURSE <span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">AI</span>
            </Link>
          </div>

          {/* 🌟 Desktop Menu 🌟 */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-white ${
                  pathname === link.href ? "text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.4)]" : "text-slate-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 🌟 Desktop Sign In Button (404 Fixed Here) 🌟 */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/sign-in"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/30 cursor-pointer"
            >
              Sign In
            </Link>
          </div>

          {/* 🌟 Mobile Hamburger Button 🌟 */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none bg-slate-900 p-2 rounded-lg border border-slate-800"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* 🌟 Mobile Menu Dropdown 🌟 */}
      {isOpen && (
        <div className="lg:hidden bg-[#0f0f0f] border-b border-slate-800 absolute w-full shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                  pathname === link.href 
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Sign In Button */}
            <div className="pt-4 mt-2 border-t border-slate-800">
              <Link
                href="/sign-in"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}