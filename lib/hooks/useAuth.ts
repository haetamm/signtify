import { useRouter } from "next/navigation";
import { login, logout } from "../action/authAction";
import { useAuthStore } from "../stores/useAuthStore";
import { useModalStore } from "../stores/useModalStore";
import { LoginPayload } from "../types/auth";
import { urlPage } from "../utils/constans";
import { showSuccessToast } from "./useHandleToast";

export function useAuth() {
  const router = useRouter();
  const { open } = useModalStore();

  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const accessToken = useAuthStore((s) => s.accessToken);

  const handleLogin = async (payload: LoginPayload) => {
    return await login(payload);
  };

  const handleLogout = async () => {
    try {
      open({
        type: "logout",
        onConfirm: async () => {
          const response = await logout();
          showSuccessToast(response, "");
          router.push(urlPage.LOGIN);
        },
      });
    } catch (error: unknown) {
      console.error("Logout error:", error);
    }
  };

  return {
    user,
    isAuthenticated,
    accessToken,
    login: handleLogin,
    logout: handleLogout,
  };
}
