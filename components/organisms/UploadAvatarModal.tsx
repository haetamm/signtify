import { useProfile } from "@/lib/hooks/useProfile";
import { useModalStore } from "@/lib/stores/useModalStore";
import CropImageUploader from "./CropImageUploader";
import TemplateModal from "./TemplateModal";

export default function UploadAvatarModal() {
  const { close } = useModalStore();
  const { avatarUrl } = useProfile();

  return (
    <TemplateModal
      title="Update Avatar"
      classSize="max-w-lg"
      cancelButton={close}
    >
      <CropImageUploader key={avatarUrl ?? "no-avatar"} />
    </TemplateModal>
  );
}
