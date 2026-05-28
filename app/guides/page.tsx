"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";

// 30 Premium AI Guides & Tutorials Data
const guides = [
  {
    id: 1,
    title: "How to Remove Specific Subjects from Photos (e.g., Red Jersey)",
    description: "Learn how to seamlessly erase unwanted people or objects from your images using MagicEdit AI. Perfect for removing subjects like a player in a red jersey or complex character transformations.",
    category: "Image Editing",
    readTime: "5 min read",
    date: "May 27, 2026",
  },
  {
    id: 2,
    title: "Create a 5-Star Modern Royalty Restaurant Website",
    description: "A step-by-step guide to generating a multi-page site with deep charcoal black & champagne gold themes using SiteCraft Pro. Tailor-made for premium projects like hotels or upscale dining.",
    category: "Web Development",
    readTime: "8 min read",
    date: "May 25, 2026",
  },
  {
    id: 3,
    title: "Generating High-Speed Race Track & Cartoon Videos",
    description: "Master MotionRender AI to create dynamic race track footage or classic cartoon-style animations with smooth frame rates. Ideal for dynamic race videos and artistic generation.",
    category: "Video AI",
    readTime: "6 min read",
    date: "May 22, 2026",
  },
  {
    id: 4,
    title: "AI Character Transformation Techniques",
    description: "Turn standard portraits into completely new avatars effortlessly with advanced AI prompting. Learn subject replacement or complete visual style overhauls using MagicEdit AI's advanced tools.",
    category: "Image Generation",
    readTime: "4 min read",
    date: "May 20, 2026",
  },
  {
    id: 5,
    title: "Mastering Midjourney v6: Photorealism Secrets",
    description: "Discover the exact prompt structures and parameter settings needed to generate hyper-realistic, cinematic photographs that look like they were taken on a DSLR.",
    category: "Image Gen",
    readTime: "7 min read",
    date: "May 18, 2026",
  },
  {
    id: 6,
    title: "Automate Customer Support with AI Chatbots",
    description: "Learn how to train a custom GPT model on your business data to handle customer queries 24/7, reducing support tickets by up to 80%.",
    category: "Productivity",
    readTime: "10 min read",
    date: "May 15, 2026",
  },
  {
    id: 7,
    title: "Voice Cloning for Podcasts using ElevenLabs",
    description: "A complete walkthrough on how to clone your own voice ethically and generate high-quality podcast intros or audiobooks with perfect intonation.",
    category: "Voice AI",
    readTime: "5 min read",
    date: "May 12, 2026",
  },
  {
    id: 8,
    title: "Writing SEO-Optimized Blogs with Claude 3.5 Sonnet",
    description: "Stop writing generic AI content. Learn how to use Claude to write deeply researched, human-sounding articles that actually rank on Google.",
    category: "Writing AI",
    readTime: "6 min read",
    date: "May 10, 2026",
  },
  {
    id: 9,
    title: "Text-to-Music: Create Custom Soundtracks",
    description: "Use Suno AI and Udio to generate royalty-free background music, lo-fi beats, or full vocal tracks for your YouTube videos.",
    category: "Audio AI",
    readTime: "4 min read",
    date: "May 08, 2026",
  },
  {
    id: 10,
    title: "Translating Videos with Perfect Lip-Sync",
    description: "Expand your YouTube audience globally. Learn how to translate your spoken audio into 20+ languages while matching your lip movements perfectly.",
    category: "Video AI",
    readTime: "9 min read",
    date: "May 05, 2026",
  },
  {
    id: 11,
    title: "Build SaaS Landing Pages in Minutes",
    description: "Use AI website builders to wireframe, write copy, and design high-converting SaaS landing pages without writing a single line of CSS.",
    category: "Web Development",
    readTime: "7 min read",
    date: "May 02, 2026",
  },
  {
    id: 12,
    title: "Data Analysis with ChatGPT Code Interpreter",
    description: "Upload messy Excel files and let ChatGPT clean the data, find trends, and generate beautiful visual charts automatically.",
    category: "Productivity",
    readTime: "8 min read",
    date: "April 28, 2026",
  },
  {
    id: 13,
    title: "Generate 3D Assets for Indie Games",
    description: "Turn 2D sketches into fully textured 3D models using AI tools, saving indie developers hundreds of hours in Blender.",
    category: "Image Gen",
    readTime: "6 min read",
    date: "April 25, 2026",
  },
  {
    id: 14,
    title: "Automating Social Media Posts for a Month",
    description: "How to use AI scheduling tools and text generators to plan, write, and schedule 30 days of Twitter and LinkedIn content in one afternoon.",
    category: "Productivity",
    readTime: "5 min read",
    date: "April 22, 2026",
  },
  {
    id: 15,
    title: "Creating Lo-Fi Anime Loops for YouTube",
    description: "Combine AI image generation with AI animation tools to create endless, relaxing Lo-Fi hip hop background videos.",
    category: "Video AI",
    readTime: "7 min read",
    date: "April 20, 2026",
  },
  {
    id: 16,
    title: "Enhancing Bad Podcast Audio with AI",
    description: "Recorded with a bad mic? Learn how to use Adobe Podcast AI to remove background noise, echo, and make your audio sound studio-recorded.",
    category: "Audio AI",
    readTime: "4 min read",
    date: "April 18, 2026",
  },
  {
    id: 17,
    title: "Professional Headshots from Selfies",
    description: "Don't pay for a photoshoot. Learn how to train an AI model on 10 selfies to generate professional LinkedIn headshots in various suits and backgrounds.",
    category: "Image Editing",
    readTime: "6 min read",
    date: "April 15, 2026",
  },
  {
    id: 18,
    title: "Code Refactoring with GitHub Copilot",
    description: "Best practices for using AI code assistants to clean up messy codebases, add documentation, and find hidden bugs instantly.",
    category: "Coding AI",
    readTime: "8 min read",
    date: "April 12, 2026",
  },
  {
    id: 19,
    title: "AI Summarization for 2-Hour YouTube Videos",
    description: "Stop watching long tutorials. Use AI extension tools to extract key points, code snippets, and timestamps from any long-form video.",
    category: "Productivity",
    readTime: "3 min read",
    date: "April 10, 2026",
  },
  {
    id: 20,
    title: "Designing Custom Vector Logos with AI",
    description: "Generate scalable SVG logos for your startup using prompt engineering techniques specifically tailored for graphic design.",
    category: "Image Gen",
    readTime: "5 min read",
    date: "April 08, 2026",
  },
  {
    id: 21,
    title: "Translate Legal Documents with DeepL Pro",
    description: "Why standard translation fails for legal text, and how to use advanced AI models to keep complex formatting and terminology intact.",
    category: "Writing AI",
    readTime: "4 min read",
    date: "April 05, 2026",
  },
  {
    id: 22,
    title: "Generate PowerPoint Presentations with Prompts",
    description: "Convert a text outline into a fully designed, 20-slide presentation complete with stock images and animations using Gamma AI.",
    category: "Productivity",
    readTime: "5 min read",
    date: "April 02, 2026",
  },
  {
    id: 23,
    title: "UI/UX Prototyping with AI (Figma Integrations)",
    description: "Accelerate your design workflow by using AI plugins in Figma to generate wireframes, color palettes, and placeholder text.",
    category: "Web Development",
    readTime: "7 min read",
    date: "March 30, 2026",
  },
  {
    id: 24,
    title: "Creating Viral TikTok Hooks with AI",
    description: "Analyze the top 100 TikToks in your niche and use AI to generate highly engaging, psychologically driven video hooks.",
    category: "Writing AI",
    readTime: "4 min read",
    date: "March 28, 2026",
  },
  {
    id: 25,
    title: "Upscaling Low-Resolution & Blurry Images",
    description: "Restore old family photos or upscale low-res graphics to 4K quality using AI upscaling tools like Topaz Gigapixel.",
    category: "Image Editing",
    readTime: "5 min read",
    date: "March 25, 2026",
  },
  {
    id: 26,
    title: "AI for Personal Finance & Budget Tracking",
    description: "Connect AI tools to your bank exports to categorize spending automatically, find useless subscriptions, and build a savings plan.",
    category: "Productivity",
    readTime: "6 min read",
    date: "March 22, 2026",
  },
  {
    id: 27,
    title: "Faceless YouTube Channels: AI Voiceovers",
    description: "The complete guide to selecting the right AI voice, adjusting pacing, and adding emotion for documentary-style faceless videos.",
    category: "Voice AI",
    readTime: "8 min read",
    date: "March 20, 2026",
  },
  {
    id: 28,
    title: "Debugging React Code with AI Assistants",
    description: "Paste your obscure React errors into Claude or ChatGPT and learn the prompt techniques to get the exact fix on the first try.",
    category: "Coding AI",
    readTime: "5 min read",
    date: "March 18, 2026",
  },
  {
    id: 29,
    title: "AI Meeting Assistants: Never Take Notes Again",
    description: "Set up Otter.ai or Fireflies to join your Zoom calls, transcribe conversations, and email action items to your team automatically.",
    category: "Productivity",
    readTime: "4 min read",
    date: "March 15, 2026",
  },
  {
    id: 30,
    title: "Write High-Converting Email Sequences",
    description: "Use AI to craft personalized cold email campaigns and automated onboarding sequences that double your open and click rates.",
    category: "Writing AI",
    readTime: "6 min read",
    date: "March 12, 2026",
  }
];

export default function GuidesPage() {
  const [visibleCount, setVisibleCount] = useState(8);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Main Container - pt-20 added to push content exactly below the 80px Navbar */}
      <main className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto">
          
          {/* YAHAN HAI MAGIC: STICKY HEADER ZONE */}
          <div className="sticky top-[80px] z-40 bg-[#0a0a0a]/95 backdrop-blur-md pt-8 pb-6 px-4 mb-8 border-b border-slate-800 text-center md:text-left shadow-lg">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              AI Guides & Tutorials <span className="text-blue-500">📚</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto md:mx-0">
              Learn how to get the most out of AI. Step-by-step tutorials to master image editing, video generation, and web development using the best tools.
            </p>
          </div>

          {/* Guides Grid - Scrolls gracefully under the sticky header */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 px-4">
            {guides.slice(0, visibleCount).map((guide) => (
              <div 
                key={guide.id} 
                className="group bg-slate-900/50 border border-slate-800 rounded-xl p-4 md:p-6 hover:border-slate-600 hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-lg cursor-pointer flex flex-col justify-between relative animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <div className="flex justify-between items-start mb-3 md:mb-4 gap-2">
                  <span className="bg-blue-500/10 text-blue-400 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-60px)]">
                    {guide.category}
                  </span>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-slate-500 text-[10px] md:text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px]">
                      {guide.readTime}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-base md:text-xl font-bold text-white mb-1.5 md:mb-2 group-hover:text-blue-400 transition-colors truncate">
                    {guide.title}
                  </h2>
                  <p className="text-slate-400 text-xs md:text-sm mb-4 md:mb-6 line-clamp-3">
                    {guide.description}
                  </p>
                </div>
                
                <div className="flex justify-between items-center pt-3 md:pt-4 border-t border-slate-800">
                  <span className="text-slate-500 text-[10px] md:text-sm font-medium truncate max-w-[50%]">{guide.date}</span>
                  <Link href={`/guides/${guide.id}`} className="text-blue-400 text-[10px] md:text-sm font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 whitespace-nowrap cursor-pointer">
                    Read Guide <span className="hidden sm:inline"></span> <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* LOAD MORE BUTTON */}
          {visibleCount < guides.length && (
            <div className="mt-12 text-center px-4">
              <button 
                onClick={handleLoadMore}
                className="bg-slate-900 border border-slate-700 hover:border-blue-500 hover:bg-slate-800 text-slate-300 hover:text-white font-bold py-3 px-8 rounded-full transition-all cursor-pointer shadow-lg inline-flex items-center gap-2"
              >
                See More Guides
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}