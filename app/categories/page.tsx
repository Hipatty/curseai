"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ToolCard from "@/components/ToolCard";
import { supabase } from "@/lib/supabase"; 

export default function CategoriesPage() {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchTools() {
      setLoading(true);
      
      let query = supabase
        .from('tools')
        .select('*')
        .eq('is_approved', true) 
        .order('id', { ascending: false });

      if (selectedCategory !== "All") {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching tools:", error);
      } else {
        setTools(data || []);
      }
      setLoading(false);
    }

    fetchTools();
  }, [selectedCategory]); 

  const categories = [
    "All",
    "Image Gen",
    "Video AI",
    "Coding AI",
    "Writing AI",
    "Voice AI",
    "Productivity"
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header & Category Tabs */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Browse by <span className="text-blue-500">Categories</span>
            </h1>
            
            <div className="w-full flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar">
              {categories.map((category) => (
                <button 
                  key={category} 
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all border
                    ${selectedCategory === category 
                      ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30" 
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 🌟 NATURAL SCROLL TOOLS GRID (Box removed) 🌟 */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 tracking-tight">
              {selectedCategory === "All" ? "All AI Tools" : `${selectedCategory} Tools`}
            </h2>

            {loading ? (
              <div className="text-slate-400 py-20 text-center animate-pulse text-lg font-medium">
                Filtering database...
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
              <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800 max-w-md mx-auto">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">No tools found</h3>
                <p className="text-slate-400 text-sm">Is category mein abhi tools update kiye ja rahe hain.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}