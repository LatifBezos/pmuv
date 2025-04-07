"use client";

import {
  Home,
  Eye,
  Users,
  Heart,
  Lock,
  ShoppingBag,
  PenTool,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMonetize() {
  const monetizeItems = [
    { title: "Supporters", icon: Heart },
    { title: "Memberships", icon: Lock },
    { title: "Shop", icon: ShoppingBag },
    { title: "Publish", icon: PenTool },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>MONETIZE</SidebarGroupLabel>
      <SidebarMenu>
        {monetizeItems.map((item) => (
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
