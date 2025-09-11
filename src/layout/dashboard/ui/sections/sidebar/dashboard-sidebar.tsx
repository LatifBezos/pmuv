"use client";

import {
  BeerIcon
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/layout/dashboard/ui/sections/sidebar/nav-main";


export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="bg-white py-8">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <BeerIcon className="size-20 rotate-12 transition-all duration-200 text-muted-foreground" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Payemoiunverre</span>
                <span className="truncate text-xs">Payemoiunverre</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-4 bg-white py-4 items-center my-8">
        <NavMain />
        {/* <NavMonetize /> */}
        {/* <NavSettings /> */}
      </SidebarContent>
      <SidebarFooter>
        <p className="px-4 text-sm text-muted-foreground">Payemoiunverre</p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
