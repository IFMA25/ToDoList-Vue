import { UseApiOptions, useApiDelete, useApiGet, useApiPatch } from "@ametie/vue-muza-use";
import { MaybeRefOrGetter, toValue } from "vue";

import { UserResponse, UsersResponse, Permission, PermissionRole } from "@/features/adminPanel/types";

export const useUsersDataRequest = (options?: UseApiOptions<UsersResponse>) => {
  return useApiGet("/users", {
    ...options,
  });
};

export const useUserInfoRequest = (
  userId: MaybeRefOrGetter<string>,
  options?: UseApiOptions<UserResponse>,
) => {
  return useApiGet(`/users/${toValue(userId)}`, {
    ...options,
  });
};

export const usePermissionsRequest = (
  options?: UseApiOptions<Permission[]>,
) => {
  return useApiGet("/permissions", {
    ...options,
  });
};

export const usePermissionsRoleRequest = (
  options?: UseApiOptions<PermissionRole>,
) => {
  return useApiGet("/permissions/roles", {
    ...options,
  });
};

export const useUpdateUserPermissions = (
  userId: MaybeRefOrGetter<string>,
  options?: UseApiOptions<UserResponse, { permissions: string[] }>,
) => {
  return useApiPatch<UserResponse, { permissions: string[] }>(
    `/users/${toValue(userId)}/permissions`,
    {
      ...options,
    },
  );
};

export const useUpdateUserRole = (
  userId: MaybeRefOrGetter<string>,
  options?: UseApiOptions<UserResponse, { role: string }>,
) => {
  return useApiPatch<UserResponse, { role: string }>(`/users/${toValue(userId)}/role`, {
    ...options,
  });
};

export const useUserDelete = (
  userId: MaybeRefOrGetter<string>,
  options?: UseApiOptions<UserResponse>,
) => {
  return useApiDelete<UserResponse>(() => `/users/${toValue(userId)}`, options);
};
