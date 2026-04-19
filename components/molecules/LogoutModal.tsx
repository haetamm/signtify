import { useModalStore } from "@/lib/stores/useModalStore";
import SmallModal from "../organisms/SmallModal";

export default function LogoutModal() {
  const { close, confirm, loading } = useModalStore();

  return (
    <SmallModal
      title="Logout"
      desc="Are you sure you want to logout?"
      buttonLabel="Logout"
      loading={loading}
      handleButton={confirm}
      cancelButton={close}
    />
  );
}
