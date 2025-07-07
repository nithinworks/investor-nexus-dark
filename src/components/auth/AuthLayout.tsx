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
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex flex-col justify-between p-12 bg-black/30 border-r border-gray-800/80">
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            Investor Nexus
          </Link>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-8 w-8 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Secure & Private</h3>
                <p className="text-gray-400">
                  Your data is encrypted and protected. We value your privacy
                  and security above all else.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Zap className="h-8 w-8 text-pink-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Lightning Fast</h3>
                <p className="text-gray-400">
                  Find investors, manage your pipeline, and close deals faster
                  than ever before.
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            &copy; 2024 Investor Nexus. All rights reserved.
          </p>
        </div>
        <main className="flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter text-white mb-2">
                {title}
              </h2>
              <p className="text-gray-400">{subtitle}</p>
            </div>
            <div className="bg-black/30 rounded-2xl p-8 border border-gray-800/80">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
