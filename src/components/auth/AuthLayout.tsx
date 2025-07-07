
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Zap } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex flex-col justify-between p-12 bg-black/95 border-r border-white/5">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">IN</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">Investor Nexus</span>
          </Link>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded bg-red-600/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Your data is encrypted and protected. We value your privacy
                  and security above all else.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded bg-red-600/10 flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Find investors, manage your pipeline, and close deals faster
                  than ever before.
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-white/40">
            &copy; 2024 Investor Nexus. All rights reserved.
          </p>
        </div>
        <main className="flex items-center justify-center p-8 bg-black">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">
                {title}
              </h2>
              <p className="text-white/60 text-sm">{subtitle}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-8 border border-white/10 backdrop-blur-sm">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
