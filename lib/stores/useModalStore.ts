import { create } from "zustand";

export type ModalConfig =
  | { type: "logout"; onConfirm: () => Promise<void> }
  | { type: "delete"; desc: string; onConfirm: () => Promise<void> }
  | { type: "updateProfile" }
  | { type: "changePassword" }
  | { type: "uploadAvatar" };

interface ModalState {
  modal: ModalConfig | null; // null = modal tutup
  loading: boolean;
  open: (config: ModalConfig) => void;
  close: () => void;
  confirm: () => Promise<void>;
}

export const useModalStore = create<ModalState>((set, get) => ({
  modal: null,
  loading: false,

  open: (config) => set({ modal: config, loading: false }),

  close: () => set({ modal: null, loading: false }),

  // confirm hanya berlaku untuk modal yang punya onConfirm
  confirm: async () => {
    const { modal, close } = get();
    if (!modal || !("onConfirm" in modal)) return;

    try {
      set({ loading: true });
      await modal.onConfirm();
      close();
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
}));
