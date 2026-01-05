import { UsersResponse } from "@/features/adminPanel/types";
import { UseApiOptions } from "@/shared/api";
import { useApiGet } from "@/shared/api/composables/useApi";

export const useAdminRequest = (options?: UseApiOptions<UsersResponse>) => {
  return useApiGet("/users", {
    immediate: false,
    ...options,
  });
};
