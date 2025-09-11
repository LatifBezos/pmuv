"use client";

import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { type LucideIcon, CreditCard, ExternalLink, Eye, Heart, Home, Palette, Settings, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavMain() {
  const pathname = usePathname();

  type NavMainItem = {
    title: string;
    icon: LucideIcon;
    path: string;
    target?: string;
  };

  const mainItems: NavMainItem[] = [
    { title: "Tableau de bord", icon: Home, path: "/dashboard" },
    { title: "Ma page", icon: Eye, path: "/creator/sarr", target: "_blank" },
    {
      title: "Explorer les créateurs",
      icon: Users,
      path: "/dashboard/explore-creators",
    },
    {
      title: "Supporters",
      icon: Heart,
      path: "/dashboard/supporters",
    },
    {
      title: "Mon thème",
      icon: Palette,
      path: "/dashboard/theme",
    },
    {
      title: "Modes de paiement",
      icon: CreditCard,
      path: "/dashboard/payment-modes",
    },
    {
      title: "Paramètres",
      icon: Settings,
      path: "/dashboard/settings",  
    }
  ];
  return (
    <SidebarMenu className="mb-4">
      {mainItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <Link href={item.path} target={item.target}>
            <SidebarMenuButton className="cursor-pointer pl-8 pr-8">
              <item.icon
                className={cn(
                  "h-5 w-5",
                  pathname === item.path && "fill-cyan-500 stroke-3"
                )}
              />
              <span>{item.title}</span>

              {item.target && <ExternalLink className="size-4 ml-auto" />}
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
