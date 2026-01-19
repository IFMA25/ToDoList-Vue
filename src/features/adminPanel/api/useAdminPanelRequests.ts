import { computed, Ref } from "vue";

import {
  UserResponse,
  UsersResponse,
  DeleteResponse,
  Permission,
  PermissionRole,
} from "@/features/adminPanel/types";
import { UseApiOptions } from "@/shared/api";
import {
  useApiDelete,
  useApiGet,
  useApiPatch,
} from "@/shared/composables/useApi";

export const useAdminRequest = (options?: UseApiOptions<UsersResponse>) => {
  return useApiGet("/users", {
    immediate: false,
    ...options,
  });
};

export const useUserInfoRequest = (
  userId: string,
  options?: UseApiOptions<UserResponse>,
) => {
  return useApiGet(`/users/${userId}`, {
    immediate: false,
    ...options,
  });
};

export const usePermissionsRequest = (
  options?: UseApiOptions<Permission[]>,
) => {
  return useApiGet("/permissions", {
    immediate: false,
    ...options,
  });
};

export const usePermissionsRoleRequest = (
  options?: UseApiOptions<PermissionRole>,
) => {
  return useApiGet("/permissions/roles", {
    immediate: false,
    ...options,
  });
};

export const useUserDeleteRequest = (
  userId: Ref<string | null>,
  options?: UseApiOptions<DeleteResponse>,
) => {
  const url = computed(() => (userId.value ? `/users/${userId.value}` : ""));
  return useApiDelete<DeleteResponse>(url, {
    immediate: false,
    ...options,
  });
};

export const useUpdateUserPermissions = (
  userId: string,
  options?: UseApiOptions<UserResponse, { permissions: string[] }>,
) => {
  return useApiPatch<UserResponse, { permissions: string[] }>(
    `/users/${userId}/permissions`,
    {
      immediate: false,
      ...options,
    },
  );
};

export const useUpdateUserRole = (
  userId: string,
  options?: UseApiOptions<UserResponse, { role: string }>,
) => {
  return useApiPatch<UserResponse, { role: string }>(`/users/${userId}/role`, {
    immediate: false,
    ...options,
  });
};
