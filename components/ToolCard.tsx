"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; 
import Link from "next/link"; 

interface ToolCardProps {
  id: number; 
  name: string;
  category: string;
  pricing: string;
  description: string;
  url: string;
}

export default function ToolCard({ id, name, category, pricing, description, url }: ToolCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function checkBookmarkStatus() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        const { data, error } = await supabase
          .from("bookmarks")
          .select("id")
          .eq("user_id", session.user.id)
          .eq("tool_id", id)
          .maybeSingle(); 

        if (data) setIsBookmarked(true);
      }
    }
    checkBookmarkStatus();
  }, [id]);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 

    if (!userId) {
      alert("Please Sign In to save favorites! ❤️");
      return;
    }

    if (isBookmarked) {
      const { error } = await supabase.from("bookmarks").delete().eq("user_id", userId).eq("tool_id", id);
      if (!error) setIsBookmarked(false);
    } else {
      const { error } = await supabase.from("bookmarks").insert({ user_id: userId, tool_id: id });
      if (!error) setIsBookmarked(true);
    }
  };

  return (
    <Link 
      href={`/tool/${id}`}
      className="block cursor-pointer bg-slate-900/50 border border-slate-800 rounded-xl p-4 md:p-6 hover:border-slate-600 hover:bg-slate-800 transition-all group hover:-translate-y-1 shadow-lg hover:shadow-blue-900/20 relative"
    >
      <div className="flex justify-between items-start mb-3 md:mb-4">
        <span className="bg-blue-500/10 text-blue-400 text-[10px] md:text-xs font-semibold px-2 md:px-2.5 py-0.5 md:py-1 rounded-full whitespace-nowrap">
          {category}
        </span>
        
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-xs md:text-sm font-bold">
            ★ 4.9
          </span>
          
          <button 
            onClick={handleBookmark}
            className="focus:outline-none p-1 rounded-full hover:bg-slate-700/50 transition-colors cursor-pointer"
            aria-label="Bookmark Tool"
          >
            <svg 
              className={`w-4 h-4 md:w-5 md:h-5 transition-transform active:scale-125 ${isBookmarked ? "fill-red-500 stroke-red-500" : "text-slate-400 stroke-current fill-none"}`} 
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2 group-hover:text-blue-400 transition-colors truncate">
        {name}
      </h3>

      <p className="text-slate-400 text-xs md:text-sm mb-4 md:mb-6 line-clamp-2">
        {description}
      </p>

      <div className="flex justify-between items-center pt-3 md:pt-4 border-t border-slate-800">
        <span className="text-slate-500 text-[10px] md:text-sm font-medium truncate max-w-[50%]">{pricing}</span>
        <span className="text-blue-400 text-[10px] md:text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1 whitespace-nowrap">
          View Details <span className="hidden sm:inline"></span> <span>→</span>
        </span>
      </div>
    </Link>
  );
}