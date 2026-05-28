import Navbar from "@/components/Navbar";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">
          Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Policy</span>
        </h1>
        
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-10 shadow-2xl text-slate-300 space-y-8 leading-relaxed">
          <p className="text-sm text-slate-500">Last updated: May 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p>
              Welcome to Curse AI. We collect minimal information required to provide our services. When you log in or submit a tool, we may collect data such as your name, email address, and the content you submit to our directory.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p>
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-400">
              <li>Provide, operate, and maintain our website.</li>
              <li>Improve, personalize, and expand our services.</li>
              <li>Understand and analyze how you use our platform.</li>
              <li>Communicate with you for updates and support.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Services</h2>
            <p>
              We use third-party services like Google (for authentication) and Supabase (for database management). These third parties have access to your Personal Information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Security</h2>
            <p>
              We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. However, remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at support@curseai.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}