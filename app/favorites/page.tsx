"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import ToolCard from "@/components/ToolCard";
import Link from "next/link";

export default function FavoritesPage() {
  const [favoriteTools, setFavoriteTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchFavorites() {
      setLoading(true);
      
      // 1. Check karein ki user login hai ya nahi
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      // 2. Agar login hai, toh uske bookmarked tools database se mangwayein
      // 'bookmarks' table se join lagakar 'tools' ka data nikal rahe hain
      const { data, error } = await supabase
        .from('bookmarks')
        .select(`
          tool_id,
          tools (
            id,
            name,
            category,
            pricing,
            description,
            url
          )
        `)
        .eq('user_id', session.user.id);

      if (error) {
        console.error("Error fetching favorites:", error);
      } else if (data) {
        // Data format theek karna taaki ToolCard mein direct pass kar sakein
        // Kabhi-kabhi tool delete ho gaya ho toh null check lagana zaroori hai
        const extractedTools = data
          .map((bookmark: any) => bookmark.tools)
          .filter((tool: any) => tool !== null); 
        
        setFavoriteTools(extractedTools);
      }
      
      setLoading(false);
    }

    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32 pb-20 px-4 h-auto">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-10 border-b border-slate-800 pb-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 flex items-center gap-3">
              My Favorites <span className="text-red-500">❤️</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg">
              All your saved and bookmarked AI tools in one place.
            </p>
          </div>

          {/* Conditional Rendering (State check karna) */}
          {loading ? (
            <div className="text-slate-400 py-20 text-center animate-pulse text-lg">
              Loading your favorite tools...
            </div>
          ) : !isLoggedIn ? (
            // Jab user login NA ho
            <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800 max-w-2xl mx-auto shadow-2xl">
              <div className="text-5xl mb-6">🔒</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Please Sign In</h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                You need to be logged in to save and view your favorite AI tools.
              </p>
              {/* Note: Ensure your Navbar has the Sign In logic, or link to a login page if you have one */}
              <p className="text-blue-400 font-medium">Use the Sign In button in the Navbar above.</p>
            </div>
          ) : favoriteTools.length === 0 ? (
            // Jab login ho par koi tool save NA kiya ho
            <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed max-w-2xl mx-auto">
              <div className="text-6xl mb-6 grayscale opacity-50">🤍</div>
              <h2 className="text-2xl font-bold text-white mb-3">No favorites yet</h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                You haven't bookmarked any tools. Explore our directory and click the heart icon on any tool you love!
              </p>
              <Link 
                href="/explore" 
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25"
              >
                Explore AI Tools
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          ) : (
            // Jab tools mil jayein! (Grid)
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {favoriteTools.map((tool) => (
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
          )}

        </div>
      </main>
    </div>
  );
}