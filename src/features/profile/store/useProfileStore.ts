import { tokenManager } from "@ametie/vue-muza-use";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import { useProfileRequest } from "../api/composables/useProfileRequest";

import { Profile } from "@/features/profile/types";

const ERROR_MSG = "You are not authorized. Please log in.";

export const useProfileStore = defineStore("profile", () => {
  const profileData = ref<Profile | null>(null);

  const router = useRouter();

  const { execute, loading, error, data } = useProfileRequest({
    onSuccess: () => {
      profileData.value = {
        email: data.value.email,
        name: data.value.name,
        role: data.value.role,
        createdAt: data.value.createdAt,
      };
    },
    onError: () => {
      if (error.value.status === 401) {
        toast.error(ERROR_MSG);
      }
      return;
    },
  });

  const fetchProfile = async () => {
    if (profileData.value) return;
    await execute();
  };

  const handleLogout = () => {
    profileData.value = null;
    tokenManager.clearTokens();
    router.push({ name: "auth", query: { mode: "signin" } });
  };

  return {
    profileData,
    loading,
    error,
    fetchProfile,
    handleLogout,
  };
});
