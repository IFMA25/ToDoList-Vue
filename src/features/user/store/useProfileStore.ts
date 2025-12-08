import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue-sonner";

import { useProfileRequest } from "../api/composables/useProfileRequest";

import { Profile } from "@/features/auth/types";

const ERROR_MSG = "You are not authorized. Please log in.";

const profileData = ref<Profile | null>(null);

export const useProfileStore = defineStore("profile", () => {

  const { execute, loading, error, data } = useProfileRequest({
    onSuccess: () => {
      profileData.value = {
        email: data.value.email,
        name: data.value.name,
        role: data.value.role,
      };
    },
    onError: () => {
      if (error.value.status === 401) {
        toast.error(ERROR_MSG);
      }
      return;
    },
  });

  const requestProfileData = async () => {
    await execute();
  };

  const removeProfileData = () => {
    profileData.value = null;
  };

  return {
    profileData,
    loading,
    error,
    requestProfileData,
    removeProfileData,
  };
});
