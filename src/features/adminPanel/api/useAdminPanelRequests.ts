import { UseApiOptions, useApiDelete, useApiGet, useApiPatch } from "@ametie/vue-muza-use";
import { MaybeRefOrGetter, toValue } from "vue";

import { Permission, PermissionRole } from "@/features/adminPanel/types";
import { User, UsersResponse } from "@/shared/types";

export const useUsersDataRequest = (options?: UseApiOptions<UsersResponse>) => {
  return useApiGet("/users", {
    ...options,
  });
};

export const useUserInfoRequest = (
  userId: MaybeRefOrGetter<string>,
  options?: UseApiOptions<User>,
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
  options?: UseApiOptions<User, { permissions: string[] }>,
) => {
  return useApiPatch<User, { permissions: string[] }>(
    `/users/${toValue(userId)}/permissions`,
    {
      ...options,
    },
  );
};

export const useUpdateUserRole = (
  userId: MaybeRefOrGetter<string>,
  options?: UseApiOptions<User, { role: string }>,
) => {
  return useApiPatch<User, { role: string }>(`/users/${toValue(userId)}/role`, {
    ...options,
  });
};

export const useUserDelete = (
  userId: MaybeRefOrGetter<string>,
  options?: UseApiOptions<User>,
) => {
  return useApiDelete<User>(() => `/users/${toValue(userId)}`, options);
};


export const useUpdateUserProfile = (
  options?: UseApiOptions<User>,
) => {
  return useApiPatch("/me", {
    ...options,
  });
};
