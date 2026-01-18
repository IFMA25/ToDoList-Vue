import { ProfileResponse } from "@/features/profile/types";
import { UseApiOptions } from "@/shared/api";
import { useApiGet } from "@/shared/composables/useApi";

export const useProfileRequest = (options?: UseApiOptions<ProfileResponse>) => {
  return useApiGet("/me", {
    immediate: false,
    ...options,
  });
};
