import { UseApiOptions, useApiPost } from "@ametie/vue-muza-use";

import type { LoginResponse, RegisterResponse, LoginRequest, RegisterRequest } from "@/features/auth/types";

export const useLogin = (options?: UseApiOptions<LoginResponse, LoginRequest>) => {
  return useApiPost<LoginResponse, LoginRequest>("/auth/login", {
    authMode: "public",
    ...options,
  });
};

export const useRegister = (options?: UseApiOptions<RegisterResponse, RegisterRequest>) => {
  return useApiPost<RegisterResponse, RegisterRequest>("/auth/register", {
    authMode: "public",
    ...options,
  });
};


// useAuth => login  and register
