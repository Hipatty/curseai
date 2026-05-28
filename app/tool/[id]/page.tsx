"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ToolDetailsPage() {
  const params = useParams();
  const id = params.id; // URL se tool ki ID mil jayegi
  
  const [tool, setTool] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToolDetails() {
      if (!id) return;
      
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('id', id)
        .single(); // Sirf ek specific tool lana hai

      if (error) {
        console.error("Error fetching tool details:", error);
      } else {
        setTool(data);
      }
      setLoading(false);
    }
    
    fetchToolDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors mb-8">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Tools
          </Link>

          {loading ? (
            <div className="text-center py-20 text-slate-400 animate-pulse text-lg">
              Loading Tool Details...
            </div>
          ) : tool ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl">
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-500/20">
                  {tool.category}
                </span>
                <span className="bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold border border-green-500/20">
                  {tool.pricing}
                </span>
                <span className="text-yellow-500 font-bold flex items-center gap-1">
                  ★ 4.9 Rating
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                {tool.name}
              </h1>

              <div className="prose prose-invert max-w-none mb-12">
                <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-800 pt-8">
                <a 
                  href={tool.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl text-center transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 text-lg"
                >
                  Visit Official Website
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              <h2 className="text-2xl font-bold mb-2 text-white">Tool Not Found</h2>
              <p>The AI tool you are looking for does not exist in our database.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}