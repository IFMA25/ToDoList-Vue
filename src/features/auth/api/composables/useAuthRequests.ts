import { tokenManager } from "@/shared/api";
import { useApiPost } from "@/shared/api/composables/useApi";
import type { LoginResponse, RegisterResponse, LoginRequest, RegisterRequest, UseApiOptions } from "@/shared/api/types";

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
