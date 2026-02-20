import { tokenManager } from "@ametie/vue-muza-use";
import { RouteLocationNormalized } from "vue-router";

import { useProfileStore } from "@/shared/stores/useProfileStore";


export const guards = async (to: RouteLocationNormalized) => {
  const token = !!tokenManager.getAccessToken();

  if (!token && to.meta.layout !== "auth") {
    return { name: "auth" };
  }

  if (token) {
    if (to.name === "auth") {
      return { name: "home" };
    }

    const profileStore = useProfileStore();

    if (!profileStore.profileData) {
      await profileStore.execute();
    }

    const userRole = profileStore.profileData?.role;
    const userPermissions = profileStore.profileData?.permissions || [];

    if (userRole === "admin") {
      return;
    }

    const routePermission = to.meta.permission;

    if (routePermission) {

      const hasAccess = userPermissions.some(
        (p) => p.value === routePermission,
      );

      if (!hasAccess) {
        console.warn(`[Guard] Access denied. Required: ${routePermission}`);
        // Если прав нет — редиректим на главную или на страницу 404
        return { name: "home" };
      }
    }
  }
};
