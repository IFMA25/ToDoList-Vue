import { UseApiOptions, useApiPost } from "@ametie/vue-muza-use";

import type { LoginResponse, RegisterResponse, LoginRequest, RegisterRequest } from "@/features/auth/types";

export const useAuth = () => {
  const login = (options?: UseApiOptions<LoginResponse, LoginRequest>) => {
    return useApiPost<LoginResponse, LoginRequest>("/auth/login", {
      authMode: "public",
      ...options,
    });
  };

  const register = (options?: UseApiOptions<RegisterResponse, RegisterRequest>) => {
    return useApiPost<RegisterResponse, RegisterRequest>("/auth/register", {
      authMode: "public",
      ...options,
    });
  };

  return { login, register };
};

