"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ToolCard from "@/components/ToolCard";
import { supabase } from "@/lib/supabase"; 
import Link from "next/link";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchTools() {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('is_approved', true) 
        .order('id', { ascending: false })
        .limit(8); 

      if (error) {
        console.error("Error fetching tools:", error);
      } else {
        setTools(data || []);
      }
      setLoading(false);
    }

    fetchTools();
  }, []); 

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/explore?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/explore');
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-white h-auto min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* HERO SECTION WITH SEARCH BAR */}
          <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-3xl w-full">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                Discover the Best <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">AI Tools</span> <br className="hidden md:block" /> for Your Next Project
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto md:mx-0">
                Your premier directory for cutting-edge AI. Hand-picked tools to supercharge your creativity, coding, and productivity.
              </p>

              {/* SEARCH BAR */}
              <form onSubmit={handleSearch} className="mt-8 relative max-w-xl mx-auto md:mx-0 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-30 group-focus-within:opacity-60 transition duration-500 blur"></div>
                
                <div className="relative flex items-center w-full bg-[#0a0a0a] rounded-full border border-slate-700 group-focus-within:border-slate-500 transition-all shadow-xl">
                  <svg className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search AI tools (e.g., video, writing)..."
                    className="w-full bg-transparent py-4 pl-12 pr-20 md:pr-32 text-white focus:outline-none placeholder-slate-500 text-sm md:text-base"
                  />
                  
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full px-4 md:px-8 flex items-center justify-center transition-all shadow-lg cursor-pointer"
                  >
                    <span className="hidden md:inline font-bold">Search</span>
                    <svg className="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>

            </div>
            
            <div className="hidden md:block flex-shrink-0">
              <Link 
                href="/explore" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 border border-slate-700 hover:border-blue-500 hover:bg-slate-800 text-white font-bold rounded-full transition-all shadow-lg"
              >
                Explore Directory <span className="text-xl">→</span>
              </Link>
            </div>
          </div>

          {/* 8 TOOLS GRID SECTION */}
          <div>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Featured AI Tools <span className="text-yellow-500">✨</span>
              </h2>
              <Link href="/explore" className="text-blue-400 hover:text-blue-300 text-sm font-bold flex items-center gap-1 transition-colors md:hidden">
                View All <span>→</span>
              </Link>
            </div>

            {loading ? (
              <div className="text-slate-400 py-10 text-center animate-pulse text-lg">
                Loading latest tools...
              </div>
            ) : tools.length > 0 ? (
              <>
                {/* MAGIC FIX: grid-cols-2 for mobile */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                  {tools.map((tool) => (
                    <ToolCard 
                      key={tool.id} 
                      id={tool.id}
                      name={tool.name}
                      category={tool.category}
                      pricing={tool.pricing}
                      description={tool.description}
                      url={tool.url}
                    />
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <Link 
                    href="/explore" 
                    className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 hover:border-blue-500 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-full transition-all cursor-pointer shadow-lg"
                  >
                    See All AI Tools
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7-7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800 max-w-md mx-auto">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">No tools added yet</h3>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}