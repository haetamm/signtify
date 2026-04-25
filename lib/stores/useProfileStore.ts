import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Profile } from "../types/profile";

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
}

interface ProfileActions {
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
}

type ProfileStore = ProfileState & ProfileActions;

export const useProfileStore = create<ProfileStore>()(
  devtools(
    (set) => ({
      profile: null,
      isLoading: false,

      setProfile: (profile) => {
        set({ profile }, false, "profile/setProfile");
      },

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    { name: "ProfileStore" },
  ),
);
