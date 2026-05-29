import Link from "next/link";
import Navbar from "@/components/Navbar"; 

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* 🌟 HERO SECTION 🌟 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 relative">
          
          <div className="max-w-4xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Discover the Best <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">AI Tools</span><br className="hidden md:block" /> for Your Next Project
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl">
              Your premier directory for cutting-edge AI. Hand-picked tools to
              supercharge your creativity, coding, and productivity.
            </p>
          </div>

          <div className="mb-2 shrink-0 hidden md:block">
            <Link
              href="/explore"
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-700 rounded-full text-white font-medium hover:bg-slate-800 transition-colors bg-[#0f0f0f]"
            >
              Explore Directory &rarr;
            </Link>
          </div>
        </div>

        <div className="mb-8 md:hidden">
            <Link
              href="/explore"
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-slate-700 rounded-full text-white font-medium hover:bg-slate-800 transition-colors bg-[#0f0f0f]"
            >
              Explore Directory &rarr;
            </Link>
        </div>

        {/* 🌟 SEARCH BAR 🌟 */}
        <div className="max-w-2xl mb-20 relative">
          <div className="relative flex items-center bg-[#0f0f0f] border border-slate-800 rounded-full p-2 pl-6 shadow-lg hover:border-slate-700 transition-colors">
            <svg className="w-6 h-6 text-slate-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search AI tools (e.g., video, writing)..."
              className="flex-grow bg-transparent text-white placeholder-slate-500 focus:outline-none"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-2.5 px-6 rounded-full transition-all shadow-lg">
              Search
            </button>
          </div>
        </div>

        {/* 🌟 FEATURED AI TOOLS (Fixed Layout & 8 Cards) 🌟 */}
        <div className="mb-10">
          <h2 className="text-3xl font-black text-white flex items-center gap-2 mb-8">
            Featured AI Tools <span className="text-yellow-400">✨</span>
          </h2>

          {/* YAHAN CHANGE HUA HAI: Desktop par 4 cards ki line (lg:grid-cols-4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ToolCard
              category="Voice AI"
              rating="4.9"
              title="ElevenLabs Studio"
              description="Director-level voice cloning. Gain absolute control over emotional delivery, breathing, and pitch..."
              pricing="Freemium"
            />
            <ToolCard
              category="Voice AI"
              rating="4.9"
              title="Suno v4"
              description="Generate radio-ready tracks with isolated vocal and instrument stems. The absolute standard..."
              pricing="Freemium"
            />
            <ToolCard
              category="Image Gen"
              rating="4.9"
              title="Flux.2"
              description="The premier open-source image model. Delivers surgical precision for tasks like removing..."
              pricing="Free"
            />
            <ToolCard
              category="Image Gen"
              rating="4.9"
              title="Midjourney v7"
              description="The absolute king of visual aesthetics. Perfect for complex character transformations..."
              pricing="Paid"
            />
            {/* 4 Naye Cards Add Kiye Hain */}
            <ToolCard
              category="Video AI"
              rating="4.9"
              title="Luma Dream Machine"
              description="The fastest high-fidelity video generator on the market. Produces incredibly smooth motion..."
              pricing="Free"
            />
            <ToolCard
              category="Video AI"
              rating="4.9"
              title="Runway Gen-4"
              description="Revolutionary spatial video editor. Allows real-time 3D object manipulation and scene generation..."
              pricing="Freemium"
            />
            <ToolCard
              category="Video AI"
              rating="4.9"
              title="Sora Pro"
              description="The pinnacle of video generation. Effortlessly create highly dynamic scenes with perfect physics..."
              pricing="Paid"
            />
            <ToolCard
              category="Coding AI"
              rating="4.9"
              title="Devin 2.0"
              description="Autonomous AI engineer. Instantly scaffolds complete multi-page applications and fixes bugs..."
              pricing="Paid"
            />
          </div>
        </div>

      </main>
    </div>
  );
}

// 🌟 TOOL CARD COMPONENT 🌟
function ToolCard({ category, rating, title, description, pricing }: any) {
  return (
    <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all group cursor-pointer shadow-lg flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">{category}</span>
        <div className="flex items-center gap-4">
          <span className="text-yellow-500 text-sm font-bold flex items-center gap-1">
            ⭐ {rating}
          </span>
          <button className="text-slate-500 hover:text-red-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </button>
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow">{description}</p>
      <div className="flex justify-between items-center pt-4 border-t border-slate-800/50 mt-auto">
        <span className="text-slate-400 text-sm font-medium">{pricing}</span>
        <Link href="#" className="text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors flex items-center group-hover:underline">
          View Details
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </Link>
      </div>
    </div>
  );
}