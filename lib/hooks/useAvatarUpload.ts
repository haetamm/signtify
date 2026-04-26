import { useProfileStore } from "@/lib/stores/useProfileStore";
import { useCallback, useState } from "react";
import { Area } from "react-easy-crop";
import { getAvatar, uploadAvatar } from "../api/profileApi";
import { useModalStore } from "../stores/useModalStore";
import { showSuccessToast } from "./useHandleToast";

const getCroppedBlob = async (
  imageSrc: string,
  croppedAreaPixels: Area,
): Promise<Blob> => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((r) => (image.onload = r));

  const canvas = document.createElement("canvas");
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
  );

  return new Promise((r) => canvas.toBlob((b) => r(b!), "image/jpeg"));
};

export const useAvatarUpload = () => {
  const { close } = useModalStore();
  const profile = useProfileStore((s) => s.profile);
  const avatarUrl = useProfileStore((s) => s.avatarUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadCroppedAvatar = useCallback(
    async (imageSrc: string, croppedAreaPixels: Area) => {
      if (!profile?.profile_id) return;

      setIsUploading(true);
      setError(null);

      try {
        const blob = await getCroppedBlob(imageSrc, croppedAreaPixels);
        const formData = new FormData();
        formData.append("avatar", blob, "avatar.jpg");

        const response = await uploadAvatar(formData);
        showSuccessToast(response, "");
        close();

        // Revoke URL lama sebelum fetch baru
        if (avatarUrl) URL.revokeObjectURL(avatarUrl);

        const newUrl = await getAvatar(profile.profile_id);
        useProfileStore.setState({ avatarUrl: newUrl });
      } catch (err) {
        setError("Gagal mengupload avatar");
        console.error("Upload avatar gagal:", err);
      } finally {
        setIsUploading(false);
      }
    },

    [profile?.profile_id, avatarUrl, close],
  );

  return { uploadCroppedAvatar, isUploading, error };
};
