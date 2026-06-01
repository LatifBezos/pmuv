"use client";

import { DollarSign, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavSettings() {
  const pathname = usePathname();
  const settingsItems = [
    { title: "Payouts", icon: DollarSign, path: "/dashboard/payouts" },
    { title: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>SETTINGS</SidebarGroupLabel>
      <SidebarMenu>
        {settingsItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.path ? (
              <Link href={item.path}>
                <SidebarMenuButton
                  className="cursor-pointer pl-6"
                  isActive={pathname === item.path}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            ) : (
              <SidebarMenuButton disabled className="pl-6">
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
