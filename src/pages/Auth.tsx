
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthForm from '@/components/auth/AuthForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <AuthLayout
      title={isLogin ? 'Sign In' : 'Create Account'}
      subtitle={isLogin ? 'Welcome back to InvestorDirectory' : 'Join InvestorDirectory today'}
    >
      <AuthForm
        isLogin={isLogin}
        onToggle={() => setIsLogin(!isLogin)}
      />
    </AuthLayout>
  );
};

export default Auth;
