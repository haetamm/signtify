import { changePassword, getProfile, updateProfile } from "../api/profileApi";
import { useModalStore } from "../stores/useModalStore";
import { useProfileStore } from "../stores/useProfileStore";
import { ChangePassPayload, ProfilePayload } from "../types/profile";

export async function fetchProfile() {
  const { setLoading, setProfile } = useProfileStore.getState();

  try {
    setLoading(true);
    const response = await getProfile();
    setProfile(response?.data || null);
  } catch (error) {
    console.error("Gagal fetch profile:", error);
    setProfile(null);
  } finally {
    setLoading(false);
  }
}

export async function editProfile(payload: ProfilePayload) {
  const response = await updateProfile(payload);
  useProfileStore.getState().setProfile(response?.data);
  return response.status;
}

export async function changePass(payload: ChangePassPayload) {
  const response = await changePassword(payload);
  useModalStore.getState().close();
  return response.data;
}
