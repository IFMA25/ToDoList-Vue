import type { LoginResponse, RegisterResponse, LoginRequest, RegisterRequest } from "@/features/auth/types";
import { tokenManager, UseApiOptions } from "@/shared/api";
import { useApiPost } from "@/shared/api/composables/useApi";

export const useLogin = (options?: UseApiOptions<LoginResponse, LoginRequest>) => {
  return useApiPost<LoginResponse, LoginRequest>("/auth/login", {
    immediate: false,
    ...options,
    onSuccess: (response) => {
      tokenManager.setTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      options?.onSuccess?.(response);
    },

  });
};

export const useRegister = (options?: UseApiOptions<RegisterResponse, RegisterRequest>) => {
  return useApiPost<RegisterResponse, RegisterRequest>("/auth/register", {
    immediate: false,
    ...options,
  });
};
