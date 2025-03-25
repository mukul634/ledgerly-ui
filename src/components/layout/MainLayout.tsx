
import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="p-0">
          <div className="h-full w-full p-4 md:p-6">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
