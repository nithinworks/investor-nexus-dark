
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-satoshi">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Column - Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0 order-2 lg:order-1">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8">
              <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">TF</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-white">TheFinance</span>
            </div>

            {/* Header */}
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                {title}
              </h1>
              <p className="text-gray-400 text-base leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Form */}
            {children}
          </div>
        </div>

        {/* Right Column - Hero Image */}
        <div className="relative order-1 lg:order-2">
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-red-500/10 to-red-700/5 rounded-3xl border border-white/10 p-8 md:p-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-700/5"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            
            {/* Hero Content */}
            <div className="relative z-10 text-center lg:text-left">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 backdrop-blur-sm mb-6">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-red-300 text-sm font-medium">Investor Database</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Connect with
                  <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                    Top Investors
                  </span>
                </h2>
                
                <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                  Access our curated database of verified investors and accelerate your startup's growth journey.
                </p>
              </div>

              {/* Feature Points */}
              <div className="space-y-4">
                {[
                  "10,000+ verified investors",
                  "Direct contact information",
                  "Advanced filtering & search",
                  "Real-time updates"
                ].map((feature, index) => (
                  <div 
                    key={feature}
                    className="flex items-center gap-3 text-left"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center backdrop-blur-sm">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-700/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-red-600/20 to-red-800/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
