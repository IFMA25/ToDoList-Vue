import { UseApiOptions } from "@/shared/api";
import { useApiGet } from "@/shared/api/composables/useApi";
import { ProfileResponse } from "@/shared/api/types";

export const useProfileRequest = (options?: UseApiOptions<ProfileResponse>) => {
  return useApiGet("/me", {
    immediate: false,
    ...options,
  });
};
