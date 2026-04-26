import { useProfileStore } from "@/lib/stores/useProfileStore";
import { useEffect } from "react";
import { changePass, editProfile } from "../action/profileAction";
import { getAvatar } from "../api/profileApi";
import { useModalStore } from "../stores/useModalStore";
import { ChangePassPayload, ProfilePayload } from "../types/profile";
import { showSuccessToast } from "./useHandleToast";

export const fetchAndSetAvatar = (profileId: string) => {
  let objectUrl: string;

  getAvatar(profileId)
    .then((url) => {
      objectUrl = url;
      useProfileStore.setState({ avatarUrl: url });
    })
    .catch(() => {
      useProfileStore.setState({ avatarUrl: "" });
    });

  return () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  };
};

export const useProfile = () => {
  const profile = useProfileStore((s) => s.profile);
  const isLoading = useProfileStore((s) => s.isLoading);
  const avatarUrl = useProfileStore((s) => s.avatarUrl);
  const { close } = useModalStore();

  const handleUpdate = async (payload: ProfilePayload) => {
    const response = await editProfile(payload);
    showSuccessToast(response, "");
    close();
  };

  const handleChangePass = async (payload: ChangePassPayload) => {
    const response = await changePass(payload);
    showSuccessToast(response, "");
    close();
  };

  useEffect(() => {
    if (!profile?.profile_id || avatarUrl !== null) return;
    return fetchAndSetAvatar(profile.profile_id);
  }, [profile?.profile_id, avatarUrl]);

  return {
    profile,
    isLoading,
    avatarUrl,
    update: handleUpdate,
    change: handleChangePass,
  };
};
