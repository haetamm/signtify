import { login, logout } from "../action/authAction";
import { useAuthStore } from "../stores/useAuthStore";
import { LoginPayload } from "../types/auth";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const accessToken = useAuthStore((s) => s.accessToken);

  const handleLogin = async (payload: LoginPayload) => {
    return await login(payload);
  };

  const handleLogout = () => {
    logout();
  };

  return {
    user,
    isAuthenticated,
    accessToken,
    login: handleLogin,
    logout: handleLogout,
  };
}
