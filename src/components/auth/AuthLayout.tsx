
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi relative">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black" />
      
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Minimal Branding */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 p-12">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">TF</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">
              TheFinance
            </span>
          </Link>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-white">
                Connect with the right investors
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Join thousands of founders who have successfully raised funding 
                with our AI-powered investor matching platform.
              </p>
            </div>
            
            {/* Minimal testimonial */}
            <div className="border-l-2 border-red-500/30 pl-6">
              <p className="text-white/80 text-base italic mb-3">
                "TheFinance helped us raise $2M in just 3 months. The platform is incredible!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20"></div>
                <div>
                  <p className="text-white font-medium text-sm">Sarah Chen</p>
                  <p className="text-white/60 text-xs">CEO, TechFlow</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-white/40">
            &copy; 2024 TheFinance. All rights reserved.
          </p>
        </div>

        {/* Right Side - Clean Auth Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <Link to="/" className="inline-flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TF</span>
                </div>
                <span className="text-xl font-semibold tracking-tight text-white">
                  TheFinance
                </span>
              </Link>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">
                {title}
              </h2>
              <p className="text-white/60 text-sm">{subtitle}</p>
            </div>
            
            {/* Minimal Form Container */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
