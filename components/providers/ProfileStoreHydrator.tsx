"use client";

import { fetchProfile } from "@/lib/action/profileAction";
import { useProfileStore } from "@/lib/stores/useProfileStore";
import { Profile } from "@/lib/types/profile";
import { useEffect } from "react";

interface Props {
  initialProfile: Profile | null;
}

export default function ProfileStoreHydrator({ initialProfile }: Props) {
  useEffect(() => {
    const storeIsEmpty = useProfileStore.getState().profile === null;
    if (!storeIsEmpty) return;

    if (initialProfile) {
      // SSR berhasil → seed store langsung, tidak perlu fetch
      useProfileStore.getState().setProfile(initialProfile);
    } else {
      // SSR gagal (401 dll) → fallback fetch dari client
      fetchProfile();
    }
  }, [initialProfile]);

  return null;
}
