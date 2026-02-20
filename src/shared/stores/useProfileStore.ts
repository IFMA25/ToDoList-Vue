import { tokenManager } from "@ametie/vue-muza-use";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useProfileRequest } from "../composables/api/useProfileRequest";
import { User } from "../types";

export const useProfileStore = defineStore("profile", () => {
  const profileData = ref<User | null>(null);

  const router = useRouter();

  const { execute, loading, data } = useProfileRequest({
    onSuccess: () => {
      profileData.value = data.value;
    },
  });

  const handleLogout = () => {
    profileData.value = null;
    tokenManager.clearTokens();
    router.push({ name: "auth", query: { mode: "signin" } });
  };

  return {
    profileData,
    loading,
    execute,
    handleLogout,
  };
});
