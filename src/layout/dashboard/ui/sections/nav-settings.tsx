"use client";

import { Palette, Zap, DollarSign, Settings } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavSettings() {
  const settingsItems = [
    { title: "Buttons & Graphics", icon: Palette },
    { title: "Integrations", icon: Zap },
    { title: "Payouts", icon: DollarSign },
    { title: "Settings", icon: Settings },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>SETTINGS</SidebarGroupLabel>
      <SidebarMenu>
        {settingsItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton className="cursor-pointer pl-6">
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
