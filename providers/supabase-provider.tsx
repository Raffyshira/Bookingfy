"use client";

import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  first_name: string;
  last_name: string;
  phone_number: string;
  birth_date: string;
};

type UserContextType = {
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  session: null,
  profile: null,
  isLoading: true,
});

export function SupabaseProvider({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // console.log("[UserProvider] session dari SSR:", session);

  useEffect(() => {
    if (!session?.user?.id) {
      console.log("[UserProvider] Tidak ada user id");
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      const supabase = createClient();

      console.log("[UserProvider] Fetching profile untuk id:", session.user.id);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("[UserProvider] Error ambil profile:", error);
      } else {
        console.log("[UserProvider] Profile data:", data);
      }

      setProfile(data ?? null);
      setIsLoading(false);
    };

    fetchProfile();
  }, [session]);

  return (
    <UserContext.Provider value={{ session, profile, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useSession() {
  return useContext(UserContext).session;
}

export function useUserProfile() {
  const { profile, isLoading } = useContext(UserContext);
  return { profile, isLoading };
}
