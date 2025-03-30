
import { Home, DollarSign, Calendar, RefreshCw, Network, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "Clients", icon: Home },
  { path: "/transactions", label: "Transactions", icon: DollarSign },
  { path: "/daybook", label: "Daybook", icon: Calendar },
  { path: "/renewal", label: "Renewal", icon: RefreshCw },
  { path: "/connections", label: "Connections", icon: Network },
];

const AppSidebar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { state } = useSidebar();

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className="flex items-center px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-finblue-800 text-white font-bold">FL</div>
          <span className="text-lg font-bold text-finblue-800 dark:text-white">FinLedger</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.path}
                    tooltip={item.label}
                  >
                    <a href={item.path} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full justify-start px-3"
        >
          {theme === "dark" ? (
            <>
              <Sun className="h-5 w-5 mr-3" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-5 w-5 mr-3" />
              <span>Dark Mode</span>
            </>
          )}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
