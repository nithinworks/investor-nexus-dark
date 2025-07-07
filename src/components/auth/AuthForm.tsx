import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AuthFormProps {
  isLogin: boolean;
  onToggle: () => void;
}

const AuthForm = ({ isLogin, onToggle }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-gray-400">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-black/20 border-gray-700/80 text-white mt-1 h-12 focus:ring-pink-500 focus:border-pink-500"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-gray-400">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-black/20 border-gray-700/80 text-white mt-1 h-12 focus:ring-pink-500 focus:border-pink-500"
            placeholder="••••••••"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-pink-600 hover:bg-pink-700 text-white h-12 text-base font-semibold"
        disabled={loading}
      >
        {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onToggle}
          className="text-gray-400 hover:text-white text-sm transition-colors"
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
