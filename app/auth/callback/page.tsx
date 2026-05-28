"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const processLogin = async () => {
      // Google se aane ke baad code check karte hain
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        // 🌟 Google Login success hone par popup trigger karega 🌟
        sessionStorage.setItem('showLoginToast', 'true');
        router.push("/"); // Seedha home page par bhej do
      }
    };
    
    processLogin();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-bold">Verifying your login...</h2>
        <p className="text-slate-400 text-sm mt-2">Please wait a moment</p>
      </div>
    </div>
  );
}