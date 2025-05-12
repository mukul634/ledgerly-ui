
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import AppSidebar from "./AppSidebar";
import { useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  
  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };
  
  return (
    <SidebarInset className="p-0">
      <div className="h-full w-full">
        <div className="p-4 border-b flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleLogoClick}
          >
            <img src="/lovable-uploads/97c337c7-8014-4513-a4bb-4e54cb817df9.png" alt="FinLedger Logo" className="h-8 w-8" />
            <h1 className="text-xl font-medium">FinLedger</h1>
          </div>
        </div>
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </SidebarInset>
  );
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <MainLayoutContent>{children}</MainLayoutContent>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
