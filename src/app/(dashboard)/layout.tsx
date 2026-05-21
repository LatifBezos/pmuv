"use client";

import { Separator } from "@/components/ui/separator";
import createClient from "@/utils/supabase/client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ProfileFloatButton } from "@/layout/dashboard/ui/profile-float-button";
import { DashboardSidebar } from "@/layout/dashboard/ui/sections/sidebar/dashboard-sidebar";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchSession = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setIsCheckingSession(false);
        return;
      }

      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    };
    fetchSession();
  }, [pathname, router]);

  if (isCheckingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm font-medium text-muted-foreground">
          Vérification de la session...
        </p>
      </div>
    );
  }

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
              {user?.email ?? "Offremoiunverre"}
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
