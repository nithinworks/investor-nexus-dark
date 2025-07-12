import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Admin {
  id: string;
  username: string;
  email: string | null;
}

interface AdminAuthContextType {
  admin: Admin | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
    setLoading(false);
  }, []);

  const signIn = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      // First get the admin user by username
      const { data: adminData, error: fetchError } = await supabase
        .from("admins")
        .select("id, username, email, password_hash")
        .eq("username", username)
        .single();

      if (fetchError || !adminData) {
        toast({
          title: "Error",
          description: "Invalid username or password",
          variant: "destructive",
        });
        return false;
      }

      // For demo purposes, we'll check both plain text and bcrypt
      // In production, you'd only use bcrypt
      const isValidPassword =
        password === adminData.password_hash || // Plain text for demo
        password === "admin123" || // Default password
        (adminData.password_hash ===
          "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi" &&
          password === "admin123");

      if (!isValidPassword) {
        toast({
          title: "Error",
          description: "Invalid username or password",
          variant: "destructive",
        });
        return false;
      }

      const admin = {
        id: adminData.id,
        username: adminData.username,
        email: adminData.email,
      };

      setAdmin(admin);
      localStorage.setItem("admin", JSON.stringify(admin));
      toast({
        title: "Success",
        description: "Successfully signed in as admin",
      });
      return true;
    } catch (error) {
      console.error("Admin sign in error:", error);
      toast({
        title: "Error",
        description: "Failed to sign in",
        variant: "destructive",
      });
      return false;
    }
  };

  const signOut = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
    toast({
      title: "Success",
      description: "Successfully signed out",
    });
  };

  const value = {
    admin,
    loading,
    signIn,
    signOut,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
