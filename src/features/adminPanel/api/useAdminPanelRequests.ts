import { UseApiOptions, useApiGet, useApiPatch } from "@ametie/vue-muza-use";

import {
  UserResponse,
  UsersResponse,
  Permission,
  PermissionRole,
} from "@/features/adminPanel/types";


export const useUsersDataRequest = (options?: UseApiOptions<UsersResponse>) => {
  return useApiGet("/users", {
    ...options,
  });
};

export const useUserInfoRequest = (
  userId: string,
  options?: UseApiOptions<UserResponse>,
) => {
  return useApiGet(`/users/${userId}`, {
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
  userId: string,
  options?: UseApiOptions<UserResponse, { permissions: string[] }>,
) => {
  return useApiPatch<UserResponse, { permissions: string[] }>(
    `/users/${userId}/permissions`,
    {
      ...options,
    },
  );
};

export const useUpdateUserRole = (
  userId: string,
  options?: UseApiOptions<UserResponse, { role: string }>,
) => {
  return useApiPatch<UserResponse, { role: string }>(`/users/${userId}/role`, {
    ...options,
  });
};
