import { useModalStore } from "@/lib/stores/useModalStore";
import SmallModal from "../organisms/SmallModal";

export default function DeleteModal() {
  const { close, confirm, loading } = useModalStore();

  return (
    <SmallModal
      title="Delete Confirmation"
      desc="Are you sure you want to delete this data?"
      buttonLabel="Delete"
      loading={loading}
      handleButton={confirm}
      cancelButton={close}
    />
  );
}
