"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { verifyAdminPasscode } from "./actions"; // Server Action import kiya

export default function AdminDashboard() {
  const [pendingTools, setPendingTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State variables
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    
    // SERVER SIDE VERIFICATION: Browser ko password pata hi nahi chalega
    const isValid = await verifyAdminPasscode(passcode);
    
    if (isValid) {
      setIsAuthenticated(true);
      fetchPendingTools();
    } else {
      setErrorMsg("Galat Passcode! 🛑");
      setLoading(false);
    }
  };

  async function fetchPendingTools() {
    setLoading(true);
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('is_approved', false)
      .order('id', { ascending: false });

    if (error) {
      console.error("Error fetching pending tools:", error);
    } else {
      setPendingTools(data || []);
    }
    setLoading(false);
  }

  const handleApprove = async (id: number) => {
    const { error } = await supabase
      .from('tools')
      .update({ is_approved: true })
      .eq('id', id);

    if (!error) {
      setPendingTools(pendingTools.filter(tool => tool.id !== id));
      alert("✅ Tool Live ho gaya!");
    } else {
      alert("Approval mein error aaya.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Kasam se delete karna chahte ho? Yeh waapas nahi aayega!")) {
      const { error } = await supabase
        .from('tools')
        .delete()
        .eq('id', id);

      if (!error) {
        setPendingTools(pendingTools.filter(tool => tool.id !== id));
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32 pb-20 px-4 h-auto">
        <div className="max-w-7xl mx-auto">
          
          {/* LOGIN SCREEN */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto bg-slate-900/50 border border-slate-800 p-8 rounded-2xl shadow-2xl mt-10">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🕵️‍♂️</div>
                <h1 className="text-2xl font-bold text-white mb-2">Admin Access Only</h1>
                <p className="text-slate-400 text-sm">Enter your secret passcode to view pending submissions.</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input 
                    type="password" 
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter Passcode..."
                    className="w-full bg-[#0a0a0a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all text-center tracking-[0.3em] font-mono"
                  />
                </div>
                {errorMsg && <p className="text-red-500 text-sm text-center font-medium">{errorMsg}</p>}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold py-3 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Checking..." : "Unlock Dashboard"}
                </button>
              </form>
            </div>
          ) : (
            
            /* DASHBOARD AREA */
            <div className="animate-in fade-in zoom-in duration-500">
              <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 flex items-center gap-3">
                    Command Center <span className="text-red-500">👑</span>
                  </h1>
                  <p className="text-slate-400">Review and approve user-submitted AI tools.</p>
                </div>
                <div className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold">
                  {pendingTools.length} Pending
                </div>
              </div>

              {pendingTools.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
                  <div className="text-5xl mb-4">🍻</div>
                  <h2 className="text-2xl font-bold text-white mb-2">All clear, Boss!</h2>
                  <p className="text-slate-400">Koi naya tool pending nahi hai. Aaram kijiye!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingTools.map((tool) => (
                    <div key={tool.id} className="bg-slate-900/60 border border-slate-700 hover:border-slate-500 rounded-xl p-5 transition-all shadow-lg flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            Pending
                          </span>
                          <span className="text-slate-400 text-xs">{tool.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1 truncate">{tool.name}</h3>
                        <a href={tool.url} target="_blank" rel="noreferrer" className="text-blue-400 text-sm hover:underline mb-4 block truncate">
                          {tool.url}
                        </a>
                        <p className="text-slate-400 text-sm line-clamp-3 mb-6 bg-[#0a0a0a] p-3 rounded-lg border border-slate-800">
                          {tool.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        <button 
                          onClick={() => handleApprove(tool.id)}
                          className="bg-green-600/20 text-green-400 border border-green-600/50 hover:bg-green-600 hover:text-white py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          Approve <span>✓</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(tool.id)}
                          className="bg-red-600/20 text-red-400 border border-red-600/50 hover:bg-red-600 hover:text-white py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          Delete <span>✕</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}