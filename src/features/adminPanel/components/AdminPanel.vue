<script setup lang="ts">
import { onMounted , computed, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import { useAdminRequest, useUserDeleteRequest } from "../api/useAdminPanelRequests";
import { UsersResponse } from "../types";

import VButton from "@/shared/ui/common/VButton.vue";
import VTable from "@/shared/ui/common/VTable.vue";
import VDropdown from "@/shared/ui/common/dropdown/VDropdown.vue";

const TABLE_HEADS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "createdAt", label: "Created At" },
  { key: "action", label: "Action" },
];
const ACTIONS = ["Edit", "Delete"];
const ERROR_MSG = "Admin role required!";

const usersData = ref<UsersResponse | null>(null);

const router = useRouter();

const hasMore = computed(() => {
  return usersData.value?.pagination.hasMore;
});

const tableRows = computed(() => {
  if(!usersData.value?.data) return [];

  return usersData.value?.data.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
  }));
});

const { execute, loading, error, data } = useAdminRequest({
  onSuccess: () => {
    usersData.value = {
      data: [...(usersData.value?.data || []), ...data.value.data],
      pagination: data.value.pagination,
    };
  },
  onError: () => {
    if (error.value.status === 403) {
      toast.error(ERROR_MSG);
    }
  },
});

const loadMore = () => {
  const pagination = usersData.value?.pagination;
  if (!pagination) return;

  const { limit, offset: currentOffset } = pagination;

  execute({
    params: {
      limit,
      offset: currentOffset + limit },
  });
};

const handleDelete = async (userId: string) => {
  if (!confirm("Are you sure you want to delete this user?")) {
    return;
  }

  const { execute: deleteUser } = useUserDeleteRequest(userId, {
    onSuccess: () => {

      if (usersData.value) {
        usersData.value.data = usersData.value.data.filter(
          (user) => user.id !== userId,
        );
      }
      toast.success("User deleted successfully!");
    },
    onError: (err) => {
      if (err?.status === 403) {
        toast.error("Cannot delete your own account");
      }
    },
  });

  try {
    await deleteUser();
  } catch (err) {
    console.error("Delete failed:", err);
  }
};


const handelAction = (rowData: any, action: string) => {
  if (action === "Edit") {
    router.push({ name: "usersInfo", params: { id: rowData.id } });
  } else if (action === "Delete") {
    handleDelete(rowData.id);
  }
};

onMounted(() => {
  execute();
});
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <VTable
      :rows="tableRows"
      :heads="TABLE_HEADS"
      :loading="loading"
      :has-more="hasMore"
      @load-more="loadMore"
    >
      <template
        #action="{ row }"
      >
        <VDropdown placement="tf">
          <template #trigger="{toggle}">
            <VButton
              text="..."
              variant="action"
              @click="toggle"
            />
          </template>
          <ul class="text-center cursor-pointer flex flex-col gap-2">
            <li
              v-for="action in ACTIONS"
              :key="action"
              @click="handelAction( row, action)"
            >
              {{ action }}
            </li>
          </ul>
        </VDropdown>
      </template>
    </VTable>
  </div>
</template>
