"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function UserMenu({ profileName }: { profileName: any }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const supabase = createClient();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    window.location.reload();
  }

  const navigationLinks = [
    { href: "#", label: "Home" },
    {
      label: "Features",
      submenu: true,
      type: "description",
      items: [
        {
          href: "/dashboard",
          label: "Dashboard",
          description: "Browse all components in the library.",
        },
        {
          href: "#",
          label: "Documentation",
          description: "Learn how to use the library.",
        },
        {
          href: "#",
          label: "Templates",
          description: "Pre-built layouts for common use cases.",
        },
      ],
    },
    {
      label: "Pricing",
      submenu: true,
      type: "simple",
      items: [
        { href: "#", label: "Product A" },
        { href: "#", label: "Product B" },
        { href: "#", label: "Product C" },
        { href: "#", label: "Product D" },
      ],
    },
    {
      label: "About",
      submenu: true,
      type: "icon",
      items: [
        { href: "#", label: "Getting Started", icon: "BookOpenIcon" },
        { href: "#", label: "Tutorials", icon: "LifeBuoyIcon" },
        { href: "#", label: "About Us", icon: "InfoIcon" },
      ],
    },
  ];
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="size-8 rounded-full"
          variant="ghost"
          size="icon"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        align="end"
        className="w-64 p-1"
      >
        <NavigationMenu className="max-w-none *:w-full">
          <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
            {navigationLinks.map((link, index) => (
              <NavigationMenuItem key={index} className="w-full">
                {link.submenu ? (
                  <>
                    <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                      {link.label}
                    </div>
                    <ul>
                      {link.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <NavigationMenuLink
                            href={item.href}
                            className="py-1.5"
                          >
                            {item.label}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NavigationMenuLink href={link.href} className="py-1.5">
                    {link.label}
                  </NavigationMenuLink>
                )}
                {/* Add separator between different types of items */}
                {index < navigationLinks.length - 1 &&
                  // Show separator if:
                  // 1. One is submenu and one is simple link OR
                  // 2. Both are submenus but with different types
                  ((!link.submenu && navigationLinks[index + 1].submenu) ||
                    (link.submenu && !navigationLinks[index + 1].submenu) ||
                    (link.submenu &&
                      navigationLinks[index + 1].submenu &&
                      link.type !== navigationLinks[index + 1].type)) && (
                    <div
                      role="separator"
                      aria-orientation="horizontal"
                      className="bg-border -mx-1 my-1 h-px w-full dark:bg-neutral-100/20"
                    />
                  )}
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem className="w-full px-2 mt-1">
              <div
                role="separator"
                aria-orientation="horizontal"
                className="bg-border -mx-1 my-1 h-px w-full dark:bg-neutral-100/20"
              />
              <div className="py-1.5">
                <Button
                  className="w-full rounded-sm"
                  variant="default"
                  onClick={signOut}
                >
                  Logout
                </Button>
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </PopoverContent>
    </Popover>
  );
}
