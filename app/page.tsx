import Link from "next/link";
import Navbar from "@/components/Navbar"; 

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white flex flex-col overflow-x-hidden">
      {/* Navbar yahan se aa raha hai */}
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* 🌟 HERO SECTION 🌟 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 relative">
          
          {/* Left Side: Heading & Subtitle */}
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Discover the Best <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                AI Tools
              </span> <br />
              for Your Next Project
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl">
              Your premier directory for cutting-edge AI. Hand-picked tools to
              supercharge your creativity, coding, and productivity.
            </p>
          </div>

          {/* Right Side: 🌟 NAYA "EXPLORE DIRECTORY" BUTTON 🌟 */}
          <div className="mb-2 shrink-0 hidden md:block">
            <Link
              href="/explore"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-300 bg-[#0f0f0f] border border-slate-700 rounded-full hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Explore Directory
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>

        {/* Mobile ke liye Explore Button (Jo choti screen par search bar ke upar aayega) */}
        <div className="mb-8 md:hidden">
            <Link
              href="/explore"
              className="group w-full relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-300 bg-[#0f0f0f] border border-slate-700 rounded-full hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Explore Directory
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

        {/* 🌟 FEATURED AI TOOLS 🌟 */}
        <div className="mb-10">
          <h2 className="text-3xl font-black text-white flex items-center gap-2 mb-8">
            Featured AI Tools <span className="text-yellow-400">✨</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ToolCard
              category="Voice AI"
              rating="4.9"
              title="ElevenLabs Studio"
              description="Director-level voice cloning. Gain absolute control over emotional delivery, breathing, and pitch for hyper-realistic..."
              pricing="Freemium"
            />
            <ToolCard
              category="Voice AI"
              rating="4.9"
              title="Suno v4"
              description="Generate radio-ready tracks with isolated vocal and instrument stems. The absolute standard for AI music..."
              pricing="Freemium"
            />
            <ToolCard
              category="Image Gen"
              rating="4.9"
              title="Flux.2"
              description="The premier open-source image model. Delivers surgical precision for tasks like removing specific subjects..."
              pricing="Freemium"
            />
            <ToolCard
              category="Image Gen"
              rating="4.9"
              title="Midjourney v7"
              description="The absolute king of visual aesthetics. Perfect for complex character transformations, like turning a standard portrait..."
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
    <div className="bg-[#0f0f0f] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors group cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">{category}</span>
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
      <p className="text-slate-400 text-sm mb-6 line-clamp-2">{description}</p>
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <span className="text-slate-500 text-sm font-medium">{pricing}</span>
        <Link href="#" className="text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors flex items-center group-hover:underline">
          View Details
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </Link>
      </div>
    </div>
  );
}