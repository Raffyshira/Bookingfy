"use client";
import { ModeToggle } from "@/components/dark-mode-ui/mode-toggle";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import UserMenu from "@/components/navbar-components/user-menu";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUser } from "@/hooks/use-user";

export default function Page() {
  const { profile } = useUser();
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center w-full justify-between gap-2 px-4">
            <div className="flex items-center">
              <SidebarTrigger className="-ml-1 lg:hidden" />
              <Separator
                orientation="vertical"
                className="mr-2 lg:hidden data-[orientation=vertical]:h-4"
              />
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <UserMenu
                profileName={`${profile?.first_name} ${profile?.last_name}`}
              />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
