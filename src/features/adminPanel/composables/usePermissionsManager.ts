import { ref, computed, Ref } from "vue";

import type { Permission } from "../types/index";

export function usePermissionsManager(allAvailablePermissions: Ref<Permission[]>) {
  const userPermissions = ref<Record<string, boolean>>({});

  const setPermissions = (activePermissions: string[]) => {
    const permissionsMap: Record<string, boolean> = {};

    allAvailablePermissions.value?.forEach((permission) => {
      permissionsMap[permission.value] = activePermissions.includes(permission.value);
    });

    userPermissions.value = permissionsMap;
  };

  const getActivePermissions = (): string[] => {
    return Object.entries(userPermissions.value)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key)
      .sort();
  };

  const areAllSelected = computed(() => {
    const currentActiveCount = Object.values(userPermissions.value).filter((v) => v).length;
    return currentActiveCount === allAvailablePermissions.value?.length;
  });

  const toggleAllPermissions = () => {
    const allPermissions = allAvailablePermissions.value?.map((p) => p.value);
    if (areAllSelected.value) {
      setPermissions([]);
    } else {
      setPermissions(allPermissions);
    }
  };

  return {
    userPermissions,
    setPermissions,
    getActivePermissions,
    areAllSelected,
    toggleAllPermissions,
  };
}
