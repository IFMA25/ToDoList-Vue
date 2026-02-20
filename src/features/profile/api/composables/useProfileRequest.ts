import {
  useApiGet,
  UseApiOptions,
} from "@ametie/vue-muza-use";

import { ProfileResponse } from "@/features/profile/types";

export const useProfileRequest = (options?: UseApiOptions<ProfileResponse>) => {
  return useApiGet("/me", {
    ...options,
  });
};
