import { ProfileResponse } from "@/features/auth/types";
import { UseApiOptions } from "@/shared/api";
import { useApiGet } from "@/shared/api/composables/useApi";

export const useProfileRequest = (options?: UseApiOptions<ProfileResponse>) => {
  return useApiGet("/me", {
    immediate: false,
    ...options,
  });
};
