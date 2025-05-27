import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <>
    <AppHeader />
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50 flex-col">
       
        <div className="flex flex-1">
          <AppSidebar />
         
            <main className="flex-1 p-6">
              {children}
            </main>
          
        </div>
      </div>
    </SidebarProvider>
    </>
  );
}
