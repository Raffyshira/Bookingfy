"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  first_name: string;
  last_name: string;
  phone_number: string;
  birth_date: string;
};

export function useUser() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchSessionAndProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session?.user?.id) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (!error) {
          setProfile(data);
        }
      }

      setIsLoading(false);
    };

    fetchSessionAndProfile();
  }, []);

  return {
    session,
    profile,
    isLoggedIn: !!session,
    isLoading,
  };
}
