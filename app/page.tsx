"use client";
import HeroSection from "@/blocks/hero-section";
import { LogoutButton } from "@/components/auth-ui/logout-button";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";

export default function Home() {
  const { profile } = useUser();
  return (
    <>
      <div className="w-full max-w-full relative sm:px-5 sm:py-3">
        <video
          className="w-full h-dvh sm:h-[800px] sm:aspect-video object-cover sm:rounded-2xl"
          src="/assets/hero-section.mp4"
          muted
          loop
          autoPlay
        />
        <div className="absolute w-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 sm:bottom-1/2">
          <HeroSection />
        </div>
      </div>
      <div className="flex justify-center items-center h-screen">
        <p>
          {profile?.first_name}
          {profile?.last_name}
        </p>
      </div>
    </>
  );
}
