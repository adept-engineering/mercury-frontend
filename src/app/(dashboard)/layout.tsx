import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    
      <main
      className={`flex w-full flex-col overflow-hidden`}
    >
      <SidebarProvider>
        <AppSidebar />
        <main className="flex w-full flex-col pt-18">
          
          <AppHeader />
          {children}
        </main>
      </SidebarProvider>
    </main>
    
  );
}
