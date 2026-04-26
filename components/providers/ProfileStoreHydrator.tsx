"use client";

import { fetchProfile } from "@/lib/action/profileAction";
import { fetchAndSetAvatar } from "@/lib/hooks/useProfile";
import { useProfileStore } from "@/lib/stores/useProfileStore";
import { Profile } from "@/lib/types/profile";

interface Props {
  initialProfile: Profile | null;
}

export default function ProfileStoreHydrator({ initialProfile }: Props) {
  const storeIsEmpty = useProfileStore.getState().profile === null;

  if (storeIsEmpty) {
    if (initialProfile) {
      useProfileStore.getState().setProfile(initialProfile);

      if (initialProfile.profile_id) {
        fetchAndSetAvatar(initialProfile.profile_id);
      }
    } else {
      fetchProfile();
    }
  }

  return null;
}
