
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import AppSidebar from "./AppSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { toggleSidebar } = useSidebar();
  
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
          <h1 className="text-xl font-medium">FinLedger</h1>
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
