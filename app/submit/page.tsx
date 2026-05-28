"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function SubmitPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  
  // Form ke data ko handle karne ke liye state
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: 'Productivity',
    pricing: 'Free',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    // Supabase mein data insert karna
    const { error } = await supabase
      .from('tools')
      .insert([
        {
          name: formData.name,
          url: formData.url,
          category: formData.category,
          pricing: formData.pricing,
          description: formData.description,
          is_approved: false // Yeh tool tab tak live nahi hoga jab tak aap approve na karein
        }
      ]);

    if (error) {
      console.error("Error submitting tool:", error);
      setStatus({ type: 'error', message: "Oops! Kuch gadbad ho gayi. Kripya thodi der baad try karein." });
    } else {
      setStatus({ type: 'success', message: "🎉 Tool successfully submit ho gaya hai! Review ke baad yeh live ho jayega." });
      // Form ko wapas khali kar dena
      setFormData({ name: '', url: '', category: 'Productivity', pricing: 'Free', description: '' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Submit an <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">AI Tool</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Found a great AI tool or created one yourself? Share it with our community!
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>

            {/* Status Messages (Success/Error) */}
            {status.type === 'success' && (
              <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center font-medium">
                {status.message}
              </div>
            )}
            {status.type === 'error' && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center font-medium">
                {status.message}
              </div>
            )}

            {/* Submit Form */}
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              
              {/* Tool Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Tool Name *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. ChatGPT"
                  className="w-full bg-[#0a0a0a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                />
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Website URL *</label>
                <input 
                  type="url" 
                  name="url"
                  required
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full bg-[#0a0a0a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                />
              </div>

              {/* Category & Pricing (2 columns on Desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Category *</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer appearance-none"
                  >
                    <option value="Productivity">Productivity</option>
                    <option value="Video">Video Generator</option>
                    <option value="Image">Image Generator</option>
                    <option value="Audio">Audio & Music</option>
                    <option value="Writing">Writing & Text</option>
                    <option value="Coding">Coding & Development</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Pricing Model *</label>
                  <select 
                    name="pricing"
                    value={formData.pricing}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer appearance-none"
                  >
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                    <option value="Open Source">Open Source</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Short Description *</label>
                <textarea 
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Explain what this tool does in 1-2 sentences..."
                  className="w-full bg-[#0a0a0a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none placeholder:text-slate-600"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className={`cursor-pointer w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Tool...
                  </>
                ) : (
                  <>Submit Tool <span className="text-purple-300">✦</span></>
                )}
              </button>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}