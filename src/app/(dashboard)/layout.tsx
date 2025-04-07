import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ProfileFloatButton } from "@/layout/dashboard/ui/profile-float-button";
import { DashboardSidebar } from "@/layout/dashboard/ui/sections/sidebar/dashboard-sidebar";

export default function DashboardMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Check if user is authenticated

  return (
    <SidebarProvider>
      <DashboardSidebar className="hidden sm:flex" />
      <SidebarInset className="w-full">
        <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-2 sm:px-4">
            <SidebarTrigger className="sm:-ml-1" />
            <Separator
              orientation="vertical"
              className="mx-2 h-4 hidden sm:block"
            />
            <div className="font-medium text-sm sm:text-base">
              Payemoiunverre
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 pt-0 relative">
          {children}
        </div>
        <ProfileFloatButton className="sm:bottom-6 sm:right-6" />
      </SidebarInset>
    </SidebarProvider>
  );
}
