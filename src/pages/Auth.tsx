
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <AuthLayout
      title={isLogin ? "Sign In to TheFinance" : "Create an account"}
      subtitle={
        isLogin
          ? "Welcome back! Please enter your details."
          : "Get started by creating your account."
      }
    >
      <AuthForm isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} />
    </AuthLayout>
  );
};

export default Auth;
