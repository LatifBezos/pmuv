"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { type LucideIcon, ExternalLink, Eye, Home, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import createClient from "@/utils/supabase/client";
import { getCreatorSlugFromUser } from "@/hooks/auth0";

export function NavMain() {
  const pathname = usePathname();
  const [creatorSlug, setCreatorSlug] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCreatorSlug() {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;
      const slug = getCreatorSlugFromUser(session.user);

      if (!slug) return;

      const { data, error } = await supabase
        .from("creators")
        .select("slug")
        .eq("slug", slug)
        .maybeSingle();

      if (!error && isMounted) {
        setCreatorSlug(data?.slug ?? null);
      }
    }

    loadCreatorSlug();

    return () => {
      isMounted = false;
    };
  }, []);

  type NavMainItem = {
    title: string;
    icon: LucideIcon;
    path: string;
    target?: string;
  };

  const mainItems: NavMainItem[] = useMemo(
    () => [
      { title: "Overview", icon: Home, path: "/dashboard" },
      {
        title: "View page",
        icon: Eye,
        path: creatorSlug ? `/creator/${creatorSlug}` : "",
        target: "_blank",
      },
      {
        title: "Explore creators",
        icon: Users,
        path: "/dashboard/explore-creators",
      },
    ],
    [creatorSlug]
  );
  return (
    <SidebarMenu className="mb-4">
      {mainItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          {item.path ? (
            <Link href={item.path} target={item.target}>
              <SidebarMenuButton className="cursor-pointer pl-8 pr-8">
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    pathname === item.path && "fill-cyan-500 stroke-3",
                  )}
                />
                <span>{item.title}</span>

                {item.target && <ExternalLink className="size-4 ml-auto" />}
              </SidebarMenuButton>
            </Link>
          ) : (
            <SidebarMenuButton disabled className="pl-8 pr-8">
              <item.icon
                className={cn(
                  "h-5 w-5",
                  pathname === item.path && "fill-cyan-500 stroke-3",
                )}
              />
              <span>{item.title}</span>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
