"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Yeh file Google ke code ko padhegi aur aapko login karwa degi
    const processLogin = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/"); // Login hote hi wapas home par bhej do
      }
    };
    processLogin();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-bold">Verifying your login...</h2>
      </div>
    </div>
  );
}