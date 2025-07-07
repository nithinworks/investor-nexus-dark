
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

interface AuthFormProps {
  isLogin: boolean;
  onToggle: () => void;
}

const AuthForm = ({ isLogin, onToggle }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "Successfully signed in.",
        });
      } else {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
          },
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <div className="space-y-3">
          <Label htmlFor="email" className="text-white/90 text-sm font-semibold flex items-center gap-2">
            <Mail className="h-4 w-4 text-red-400" />
            Email Address
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="backdrop-blur-sm bg-white/10 border-white/30 text-white h-12 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-400 placeholder:text-white/50 transition-all duration-200 hover:bg-white/15"
              placeholder="Enter your email"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none" />
          </div>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="password" className="text-white/90 text-sm font-semibold flex items-center gap-2">
            <Lock className="h-4 w-4 text-red-400" />
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="backdrop-blur-sm bg-white/10 border-white/30 text-white h-12 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-400 placeholder:text-white/50 transition-all duration-200 hover:bg-white/15 pr-12"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white h-12 text-base font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 border border-red-500/30 backdrop-blur-sm"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {isLogin ? "Signing in..." : "Creating account..."}
            </div>
          ) : (
            isLogin ? "Sign In" : "Create Account"
          )}
        </Button>
      </div>

      <div className="text-center pt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gradient-to-r from-transparent via-black/50 to-transparent text-white/60">
              {isLogin ? "New to Investor Nexus?" : "Already have an account?"}
            </span>
          </div>
        </div>
        
        <button
          type="button"
          onClick={onToggle}
          className="mt-4 text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 hover:underline underline-offset-4"
        >
          {isLogin
            ? "Create your free account"
            : "Sign in to your account"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
