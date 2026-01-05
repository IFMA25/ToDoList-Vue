import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { toast } from "vue-sonner";

import { useAdminRequest } from "../api/useAdminRequest";
import { UsersResponse } from "../types";


const ERROR_MSG = "Admin role required! Please contact support.";

const usersData = ref<UsersResponse | null>(null);

const tableRows = computed(() => {
  return usersData.value?.data.map((user) => ({
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
  }));
});

export const useAdminStore = defineStore("adminPanel", () => {

  const { execute, loading, error, data } = useAdminRequest({
    onSuccess: () => {
      usersData.value = data.value;
    },
    onError: () => {
      if (error.value.status === 403) {
        toast.error(ERROR_MSG);
      }
      return;
    },
  });

  const fetchUsers = async () => {
    await execute();
  };

  return {
    tableRows,
    loading,
    error,
    fetchUsers,
  };
});
