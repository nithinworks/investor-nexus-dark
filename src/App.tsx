import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { SubscriptionProvider } from "@/hooks/useSubscription";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardMain from "./pages/dashboard/DashboardMain";
import InvestorDatabase from "./pages/dashboard/InvestorDatabase";
import SavedLists from "./pages/dashboard/SavedLists";
import BillingUsage from "./pages/dashboard/BillingUsage";
import AccountSettings from "./pages/dashboard/AccountSettings";
import DashboardPricing from "./pages/dashboard/DashboardPricing";
import AITools from "./pages/dashboard/AITools";
import InvestorEmailTool from "./pages/dashboard/InvestorEmailTool";
import PitchDeckTool from "./pages/dashboard/PitchDeckTool";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import InvestorApplication from "./pages/InvestorApplication";
import InvestorSubmissionsManager from "./components/admin/InvestorSubmissionsManager";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminInvestors from "./pages/admin/AdminInvestors";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminManagement from "./pages/admin/AdminManagement";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SubscriptionProvider>
            <AdminAuthProvider>
              <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Landing />
                </PublicRoute>
              }
            />
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <Auth />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardMain />} />
              <Route path="investors" element={<InvestorDatabase />} />
              <Route path="saved" element={<SavedLists />} />
              <Route path="ai-tools" element={<AITools />} />
              <Route path="email-generator" element={<InvestorEmailTool />} />
              <Route path="pitch-deck" element={<PitchDeckTool />} />
              <Route path="billing" element={<BillingUsage />} />
              <Route path="pricing" element={<DashboardPricing />} />
              <Route path="settings" element={<AccountSettings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="pricing" element={<Pricing />} />
            <Route 
              path="/apply" 
              element={
                <PublicRoute>
                  <InvestorApplication />
                </PublicRoute>
              } 
            />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              } 
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="investors" element={<AdminInvestors />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="applications" element={<InvestorSubmissionsManager />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="admin-management" element={<AdminManagement />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
            </Routes>
            </AdminAuthProvider>
          </SubscriptionProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
