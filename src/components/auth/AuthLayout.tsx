
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Zap } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url('/lovable-uploads/c96f0c32-99d7-44b6-b64a-043fba02829e.png')`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-red-900/20" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Hero Content */}
        <div className="hidden lg:flex flex-col justify-between p-12 backdrop-blur-xl bg-black/20 border-r border-white/10">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-all duration-300">
              <span className="text-white font-bold text-lg">IN</span>
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Investor Nexus
            </span>
          </Link>
          
          <div className="space-y-10">
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-700/20 backdrop-blur-sm border border-red-500/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/10">
                  <ShieldCheck className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">Bank-Level Security</h3>
                  <p className="text-white/70 text-base leading-relaxed">
                    Your data is encrypted end-to-end with military-grade security. 
                    We never compromise on privacy and protection.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-700/20 backdrop-blur-sm border border-red-500/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/10">
                  <Zap className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">Lightning Fast Results</h3>
                  <p className="text-white/70 text-base leading-relaxed">
                    Find perfect investors, manage your pipeline, and close deals 
                    faster than ever with AI-powered matching.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
              <p className="text-white/90 text-lg font-medium italic">
                "Investor Nexus helped us raise $2M in just 3 months. The platform is incredible!"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700"></div>
                <div>
                  <p className="text-white font-semibold">Sarah Chen</p>
                  <p className="text-white/60 text-sm">CEO, TechFlow</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-white/50 backdrop-blur-sm bg-white/5 rounded-lg px-4 py-2 border border-white/10">
            &copy; 2024 Investor Nexus. All rights reserved.
          </p>
        </div>

        {/* Right Side - Auth Form */}
        <main className="flex items-center justify-center p-8 backdrop-blur-xl bg-black/10">
          <div className="max-w-md w-full">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent mb-3">
                {title}
              </h2>
              <p className="text-white/70 text-base">{subtitle}</p>
            </div>
            
            {/* Glassy Form Container */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 shadow-2xl shadow-black/20">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
              <div className="relative z-10">
                {children}
              </div>
            </div>

            {/* Mobile Logo */}
            <div className="lg:hidden mt-8 text-center">
              <Link to="/" className="inline-flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/25">
                  <span className="text-white font-bold text-sm">IN</span>
                </div>
                <span className="text-lg font-bold tracking-tight text-white/90">
                  Investor Nexus
                </span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
