import { Outlet, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useState } from "react";
import {
  Shield,
  LogOut,
  BarChart3,
  Users,
  Database,
  CreditCard,
  UserCheck,
  Settings,
  Menu,
  X,
} from "lucide-react";

const AdminLayout = () => {
  const { admin, signOut } = useAdminAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
    { name: "Investors", href: "/admin/investors", icon: Database },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Applications", href: "/admin/applications", icon: UserCheck },
    { name: "Payment Stats", href: "/admin/payments", icon: CreditCard },
    {
      name: "Admin Management",
      href: "/admin/admin-management",
      icon: Settings,
    },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Admin Header */}
      <header className="bg-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/thefinance-logo.svg"
                alt="TheFinance"
                className="h-10 w-auto flex-shrink-0"
              />
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
              <p className="text-sm text-white/60">TheFinance Administration</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="text-sm hidden sm:block">
              <p className="text-white/90">Welcome, {admin?.username}</p>
              <p className="text-white/60">{admin?.email}</p>
            </div>
            <Button
              onClick={signOut}
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Admin Sidebar */}
        <aside
          className={`
          w-64 bg-black/50 backdrop-blur-xl border-r border-white/10 
          min-h-[calc(100vh-81px)] z-40
          fixed lg:fixed left-0 top-[81px]
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
        >
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeSidebar}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
