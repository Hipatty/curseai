"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* 1. HERO SECTION WITH IMAGE (Top Par Illustration) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 mt-10">
            {/* Left side: Text */}
            <div className="text-left order-2 md:order-1">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Curse AI</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                Humara maqsad hai AI ki tezi se badhti duniya ko aapke liye aasan, simple aur accessible banana. Curse AI ek premium directory hai jahan aapko sabse best aur advanced AI tools ek hi jagah milenge.
              </p>
            </div>
            
            {/* Right side: Futuristic SVG Illustration */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="relative w-full max-w-md p-4 bg-slate-900/30 border border-slate-800 rounded-3xl shadow-2xl shadow-blue-950/30">
                <svg viewBox="0 0 500 500" className="w-full h-auto text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M250 50C139.5 50 50 139.5 50 250s89.5 200 200 200 200-89.5 200-200S360.5 50 250 50zm0 360c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160z" fill="currentColor" fillOpacity="0.1"/>
                  <path d="M250 110a140 140 0 100 280 140 140 0 000-280zm0 250c-60.7 0-110-49.3-110-110s49.3-110 110-110 110 49.3 110 110-49.3 110-110 110z" fill="currentColor" fillOpacity="0.2"/>
                  <circle cx="250" cy="250" r="80" fill="currentColor" fillOpacity="0.3"/>
                  <circle cx="250" cy="250" r="40" className="animate-pulse" fill="currentColor"/>
                  <path d="M250 150v200M150 250h200M179.3 179.3l141.4 141.4M179.3 320.7L320.7 179.3" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Mission & Vision Section (Keep as cards, they look good) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all group">
              <div className="text-blue-500 text-4xl mb-4 inline-block">🎯</div>
              <h2 className="text-2xl font-bold mb-3 text-white">Our Mission</h2>
              <p className="text-slate-400 text-sm leading-relaxed">Market mein har roz saikdon naye AI tools aate hain, sahi tool dhoondhna mushkil ho jata hai. Hum un sabhi tools ko test aur curate karke aap tak sirf wahi pahuchate hain jo sach mein useful hain.</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all group">
              <div className="text-purple-500 text-4xl mb-4 inline-block">🚀</div>
              <h2 className="text-2xl font-bold mb-3 text-white">Our Vision</h2>
              <p className="text-slate-400 text-sm leading-relaxed">Hum ek aisi community banana chahte hain jahan creators bina kisi jhanjhat ke apni zaroorat ka tool dhoondh sakein aur apne workflow ko 10x tak fast kar sakein.</p>
            </div>
          </div>

          {/* 2. THE FOUNDER SECTION (Naya Team Section with Photo) */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-10 md:p-16 mb-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative z-10">
              {/* Left: Placeholder Photo (Circular) */}
              <div className="flex justify-center md:justify-start">
                <div className="w-48 h-48 rounded-full border-4 border-slate-800 p-2 bg-[#0a0a0a] shadow-xl flex items-center justify-center overflow-hidden">
                  {/* Abhi placeholder chalega, baad mein 'src' badal dena */}
                  <img 
                    src="https://via.placeholder.com/200?text=Your+Photo" 
                    alt="Founder" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              {/* Right: Text */}
              <div className="md:col-span-2 text-center md:text-left">
                <span className="text-blue-400 font-semibold text-sm mb-2 block">Meet the Mind Behind</span>
                <h2 className="text-4xl font-extrabold text-white mb-5 tracking-tight">The Founder's Story</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Main ek developer aur AI enthusiast hoon. Jab maine dekha ki AI tools ko dhoondhna kitna chaotic hai, tab maine Curse AI banane ka socha. Is website ka har ek tool maine personaly review kiya hai taaki aapko best experience mile. Humara safar abhi bas shuru hua hai!
                </p>
                <p className="text-white font-bold text-lg">– Aapka Naam Yahan</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-slate-900/30 border border-slate-800/50 rounded-2xl p-10">
            <p className="text-slate-300 mb-6 font-medium text-lg max-w-xl mx-auto">
              Kya aapke paas koi amazing AI tool hai jo hamari directory mein hona chahiye? Community ke sath share karein!
            </p>
            <Link 
              href="/submit" 
              className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-purple-500/20"
            >
              Submit a Tool Now <span className="text-purple-300">✦</span>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}