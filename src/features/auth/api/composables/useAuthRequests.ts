import { tokenManager } from "@/shared/api";
import type { LoginResponse, RegisterResponse, LoginRequest, RegisterRequest } from "@/shared/api/types";
import type { UseApiOptions } from "@/shared/api/types";
import { useApiPost } from "@/shared/composables";

export const useLogin = (options?: UseApiOptions<LoginResponse, LoginRequest>) => {
  return useApiPost<LoginResponse, LoginRequest>("/api/auth/login", {
    immediate: false,
    ...options,
    onSuccess: (response) => {
      tokenManager.setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
      options?.onSuccess?.(response);
    },
  });
};

export const useRegister = (options?: UseApiOptions<RegisterResponse, RegisterRequest>) => {
  return useApiPost<RegisterResponse, RegisterRequest>("/api/auth/register", {
    immediate: false,
    ...options,
  });
};