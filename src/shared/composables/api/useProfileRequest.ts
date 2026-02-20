import {
  useApiGet,
  UseApiOptions,
} from "@ametie/vue-muza-use";

import { User } from "@/shared/types";

export const useProfileRequest = (options?: UseApiOptions<User>) => {
  return useApiGet("/me", {
    ...options,
  });
};
