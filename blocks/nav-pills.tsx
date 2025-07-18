"use client";
import { ModeToggle } from "@/components/dark-mode-ui/mode-toggle";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/navbar-components/resizable-navbar";
import UserMenu from "@/components/navbar-components/user-menu";
import { useUser } from "@/hooks/use-user";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

// import { useAuthStore } from "@/stores/useAuthStore";
// import { useAuth } from "@/hooks/use-auth";

export default function NavbarDemo() {
  const navItems = [
    {
      name: "Explore",
      link: "#features",
    },
    {
      name: "Create",
      link: "#pricing",
    },
    {
      name: "My Events",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { profile, session } = useUser();
  // console.log(session);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <ModeToggle />
            {session ? (
              <>
                <UserMenu
                  profileName={`${profile?.first_name} ${profile?.last_name}`}
                />
              </>
            ) : (
              <>
                <NavbarButton as="a" href="/auth/login" variant="secondary">
                  Login
                </NavbarButton>
                <NavbarButton as="a" href="/auth/register" variant="primary">
                  Sign Up
                </NavbarButton>
              </>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {session ? (
                <UserMenu
                  profileName={`${profile?.first_name} ${profile?.last_name}`}
                />
              ) : (
                <>
                  <NavbarButton
                    as="a"
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    as="a"
                    href="/auth/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Sign Up
                  </NavbarButton>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* Navbar */}
    </div>
  );
}
