"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        // Email sudah terverifikasi → user otomatis login
        router.replace("/complete-profile");
      } else {
        router.replace("/login");
      }
    });
  }, [router]);

  return <p>Redirecting...</p>;
}
