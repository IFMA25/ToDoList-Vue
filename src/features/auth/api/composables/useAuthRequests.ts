import { tokenManager } from "@/shared/api";
import { LoginResponse, LoginRequest } from "@/shared/api/types";
import { useApiPost } from "@/shared/composables";


export const useAuthRequests = () => {
  const register = (
    email: string,
    password: string,
    options?: { onSuccess?: (response: any) => void },
  ) => useApiPost<LoginRequest>(
    "/auth/register", {
      data: { email, password },
      immediate: false,
      onSuccess: options?.onSuccess,
    });

  const login = (
    email: string,
    password: string,
  ) => useApiPost<LoginResponse>(
    "/auth/login", {
      data: { email, password },
      immediate: false,
      onSuccess: (response) => {
        tokenManager.setTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        // ...(response.expiresIn && { expiresIn: response.expiresIn })
        });
      },
    });

  return { register, login };
};

