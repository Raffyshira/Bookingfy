"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  CalendarCheck,
  Command,
  CreditCard,
  FolderOpen,
  HouseIcon,
  LifeBuoy,
  Send,
  Settings,
  UserSquare2,
} from "lucide-react";

import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import UserMenu from "../navbar-components/user-menu";
import { useUser } from "@/hooks/use-user";

const data = {
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Overview",
          url: "#",
          icon: HouseIcon,
          isActive: true,
        },
        {
          title: "Event Saya",
          icon: CalendarCheck,
          url: "#",
        },
      ],
    },
    {
      title: "Akun",
      url: "#",
      items: [
        {
          title: "Informasi Dasar",
          icon: UserSquare2,
          url: "#",
        },
        {
          title: "Pengaturan",
          icon: Settings,
          url: "#",
        },
        {
          title: "Informasi Legal",
          icon: FolderOpen,
          url: "#",
        },
        {
          title: "Rekening",
          icon: CreditCard,
          url: "#",
        },
      ],
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const { open, setOpen } = useSidebar();
  const { profile } = useUser();

  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    // Open sidebar immediately on hover
    setOpen(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing to prevent flickering
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 300);
    setHoverTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);
  return (
    <Sidebar
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variant="inset"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      size="default"
                      asChild
                      isActive={item.isActive}
                      tooltip={item.title}
                    >
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
