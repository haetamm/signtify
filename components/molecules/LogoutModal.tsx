import { useModalStore } from "@/lib/stores/useModalStore";
import TemplateModal from "../organisms/TemplateModal";

export default function LogoutModal() {
  const { close, confirm, loading } = useModalStore();

  return (
    <TemplateModal
      title="Logout"
      classSize="max-w-sm"
      desc="Are you sure you want to logout?"
      buttonLabel="Logout"
      loading={loading}
      handleButton={confirm}
      cancelButton={close}
    />
  );
}
