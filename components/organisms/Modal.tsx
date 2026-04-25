"use client";
import { ModalConfig, useModalStore } from "@/lib/stores/useModalStore";
import { ComponentType } from "react";
import DeleteModal from "../molecules/DeleteModal";
import LogoutModal from "../molecules/LogoutModal";
import ChangePassModal from "./ChangePassModal";
import ProfileModal from "./ProfileModal";

// Registry: tambah modal baru = tambah 1 baris saja
const MODALS: { [K in ModalConfig["type"]]: ComponentType } = {
  logout: LogoutModal,
  delete: DeleteModal,
  updateProfile: ProfileModal,
  changePassword: ChangePassModal,
};

export default function Modal() {
  const { modal, close } = useModalStore();
  if (!modal) return null;

  const Content = MODALS[modal.type];
  return (
    <div role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/50 z-20" onClick={close} />
      <div className="fixed inset-0 z-[50] overflow-y-auto">
        <Content />
      </div>
    </div>
  );
}
