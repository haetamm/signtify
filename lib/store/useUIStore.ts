import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ModalType = "confirm-delete" | "user-form" | "image-preview" | null;

interface ModalState {
  type: ModalType;
  data?: Record<string, unknown>;
}

interface UIState {
  // Modal
  modal: ModalState;
  openModal: (
    type: NonNullable<ModalType>,
    data?: Record<string, unknown>,
  ) => void;
  closeModal: () => void;

  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // Modal
      modal: { type: null },

      openModal: (type, data) =>
        set({ modal: { type, data } }, false, "ui/openModal"),

      closeModal: () => set({ modal: { type: null } }, false, "ui/closeModal"),

      // Sidebar
      sidebarOpen: false,

      toggleSidebar: () =>
        set(
          (s) => ({ sidebarOpen: !s.sidebarOpen }),
          false,
          "ui/toggleSidebar",
        ),

      openSidebar: () => set({ sidebarOpen: true }, false, "ui/openSidebar"),

      closeSidebar: () => set({ sidebarOpen: false }, false, "ui/closeSidebar"),
    }),
    { name: "UIStore" },
  ),
);

export const useModal = () => useUIStore((s) => s.modal);
export const useSidebarOpen = () => useUIStore((s) => s.sidebarOpen);
