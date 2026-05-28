import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Curse AI - Discover the Best AI Tools",
  description: "Your ultimate directory for the most powerful and innovative AI tools. Supercharge your workflow and discover the future of technology.",
  keywords: ["AI tools", "Artificial Intelligence", "AI directory", "Curse AI", "Tech tools"],
  
  // Open Graph (OG) Setup for WhatsApp/Twitter Share
  openGraph: {
    title: "Curse AI - Discover the Best AI Tools",
    description: "Your ultimate directory for the most powerful and innovative AI tools.",
    url: "https://curseai.com", 
    siteName: "Curse AI",
    images: [
      {
        url: "/og-banner.png", 
        width: 1200,
        height: 630,
        alt: "Curse AI Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased`}>
        
        {/* Iske andar aapke saare pages (Home, About, Privacy) dikhenge */}
        {children} 
        
        {/* Yeh aapka premium footer har page par automatically dikhega */}
        <Footer />
        
      </body>
    </html>
  );
}