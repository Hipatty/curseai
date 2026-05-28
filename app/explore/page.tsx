"use client";
import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import ToolCard from "@/components/ToolCard";
import { supabase } from "@/lib/supabase"; 
import { useSearchParams } from "next/navigation";

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams?.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools(searchQuery);
  }, [searchQuery]);

  async function fetchTools(query: string) {
    setLoading(true);
    
    let supabaseQuery = supabase
      .from('tools')
      .select('*')
      .eq('is_approved', true) 
      .order('id', { ascending: false });

    if (query.trim() !== "") {
      supabaseQuery = supabaseQuery.or(
        `name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`
      );
    }

    const { data, error } = await supabaseQuery;

    if (error) {
      console.error("Error fetching tools:", error);
    } else {
      setTools(data || []);
    }
    setLoading(false);
  }

  return (
    <main className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search Bar */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Explore <span className="text-blue-500">AI Tools</span>
          </h1>
          
          <div className="relative max-w-2xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 group-focus-within:opacity-40 transition duration-500 blur"></div>
            <div className="relative flex items-center w-full bg-slate-900 rounded-2xl border border-slate-700 focus-within:border-blue-500 transition-colors shadow-lg">
              <svg className="absolute left-5 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI tools (e.g., video, writing, code)..."
                className="w-full bg-transparent py-5 pl-14 pr-6 text-white text-lg focus:outline-none placeholder-slate-500"
              />
            </div>
          </div>
        </div>

        {/* 🌟 NATURAL SCROLL TOOLS GRID (Box removed) 🌟 */}
        <div>
          {loading ? (
            <div className="text-slate-400 py-20 text-center animate-pulse text-lg font-medium">
              Searching database...
            </div>
          ) : tools.length > 0 ? (
            
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
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
            
          ) : (
            <div className="text-center py-32 bg-slate-900/30 rounded-3xl border border-slate-800 max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-3">No tools found</h3>
              <p className="text-slate-400 text-lg">We couldn't find any tools matching "{searchQuery}".</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

export default function ExplorePage() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]"></div>}>
        <ExploreContent />
      </Suspense>
    </div>
  );
}