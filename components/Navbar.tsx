"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState("");
  const [showToast, setShowToast] = useState(false); // Popup ke liye
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        
        // User ka naam nikalne ka logic (Google se full_name, email se aage ka hissa)
        const name = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || "User";
        setUserName(name);

        // Check karte hain ki kya user abhi-abhi login karke aaya hai?
        if (sessionStorage.getItem('showLoginToast') === 'true') {
          setShowToast(true);
          sessionStorage.removeItem('showLoginToast'); // Ek baar dikha kar hata do
          setTimeout(() => setShowToast(false), 4000); // 4 second baad popup band
        }
      } else {
        setUser(null);
      }
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        setUserName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || "User");
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

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
    <>
      {/* 🌟 SUCCESS POPUP (TOAST) 🌟 */}
      {showToast && (
        <div className="fixed top-24 right-4 bg-green-500/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center gap-3 z-[100] animate-[bounce_1s_ease-in-out_infinite]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <p className="font-bold text-sm">Login Successful!</p>
            <p className="text-xs text-green-100">Welcome back, {userName}</p>
          </div>
        </div>
      )}

      <nav className="fixed w-full z-50 top-0 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-slate-800 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                CURSE <span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">AI</span>
              </Link>
            </div>

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

            {/* 🌟 USER PROFILE & LOGOUT SECTION 🌟 */}
            <div className="hidden lg:flex items-center">
              {user ? (
                <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-full pl-4 pr-1.5 py-1.5">
                  <span className="text-sm font-medium text-slate-300">
                    Hi, <span className="text-white font-bold">{userName}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-1.5 rounded-full font-bold text-xs transition-all cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/30 cursor-pointer"
                >
                  Sign In
                </Link>
              )}
            </div>

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
              
              <div className="pt-4 mt-2 border-t border-slate-800">
                {user ? (
                   <div className="flex flex-col gap-3">
                     <div className="text-center text-slate-300 font-medium py-2">
                       Hi, <span className="text-white font-bold">{userName}</span>
                     </div>
                     <button
                       onClick={() => {
                         handleLogout();
                         setIsOpen(false);
                       }}
                       className="block w-full text-center bg-red-600/10 text-red-500 border border-red-500/20 px-6 py-3.5 rounded-xl font-bold text-base transition-all"
                     >
                       Sign Out
                     </button>
                   </div>
                ) : (
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}