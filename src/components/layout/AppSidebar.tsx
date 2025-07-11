
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Database, 
  Bookmark, 
  CreditCard,
  Settings,
  Star,
  Crown,
  UserCheck,
  Mail,
  FileText
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Investor Database",
    url: "/dashboard/investors",
    icon: Database,
  },
  {
    title: "Saved Lists",
    url: "/dashboard/saved",
    icon: Bookmark,
  },
  {
    title: "Email Generator",
    url: "/dashboard/email-generator",
    icon: Mail,
  },
  {
    title: "Pitch Deck Generator",
    url: "/dashboard/pitch-deck",
    icon: FileText,
  },
  {
    title: "Billing & Usage",
    url: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Account Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Plans & Pricing",
    url: "/dashboard/pricing",
    icon: Star,
  },
];

const adminItems: any[] = [];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return currentPath === "/dashboard" || currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClasses = (isActive: boolean) => 
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold border-l-2 border-primary font-satoshi" 
      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground font-satoshi";

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border p-4 md:p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm font-satoshi">TF</span>
          </div>
          {state === "expanded" && (
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-semibold tracking-tight text-sidebar-foreground font-satoshi">
                TheFinance
              </span>
              <span className="text-xs text-sidebar-foreground/60 font-satoshi">
                Dashboard
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium px-2 mb-2 font-satoshi text-xs">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 text-sm ${getNavClasses(isActive)}`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
{adminItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium px-2 mb-2 font-satoshi text-xs">
              Admin
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={({ isActive }) => 
                          `flex items-center gap-3 text-sm ${getNavClasses(isActive)}`
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {state === "expanded" && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
