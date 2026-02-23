import { tokenManager } from "@ametie/vue-muza-use";
import { RouteLocationNormalized } from "vue-router";

import { RouteNames } from "@/shared/config/routeNames";
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

    const userPermissions = profileStore.profileData?.permissions || [];

    const routePermission = to.meta.permission;

    if (routePermission) {

      const hasAccess = userPermissions.some(
        (p) => p.toLowerCase() === routePermission.toLowerCase());

      if (!hasAccess) {
        console.warn(`[Guard] Access denied. Required: ${routePermission}`);

        return { name: RouteNames.notFound };
      }
    }
  }
};
