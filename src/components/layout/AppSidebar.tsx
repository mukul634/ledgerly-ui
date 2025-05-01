
import { Home, FileText, Calendar, RefreshCw, Network, Sun, Moon, FileImage } from "lucide-react";
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
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "Clients", icon: Home },
  { path: "/transactions", label: "Transactions", icon: FileText },
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
      <SidebarHeader className="flex flex-col items-center justify-center px-4 py-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-md bg-finblue-800 text-white">
            <FileImage className="h-8 w-8" />
          </div>
          <span className="text-2xl font-bold text-finblue-800 dark:text-white text-center">FinLedger</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.path}
                    tooltip={item.label}
                    size="lg"
                  >
                    <a href={item.path} className="flex items-center gap-3">
                      <item.icon className="h-7 w-7" />
                      <span className="text-lg font-medium">{item.label}</span>
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
          className="w-full justify-start px-3 py-6"
        >
          {theme === "dark" ? (
            <>
              <Sun className="h-6 w-6 mr-3" />
              <span className="text-base">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-6 w-6 mr-3" />
              <span className="text-base">Dark Mode</span>
            </>
          )}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
