<script setup lang="ts">
import { onMounted , computed, ref } from "vue";
import { toast } from "vue-sonner";

import { useAdminRequest } from "../api/useAdminRequest";
import { UsersResponse } from "../types";

import VButton from "@/shared/ui/common/VButton.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
import VTable from "@/shared/ui/common/VTable.vue";

const TABLE_HEADS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "createdAt", label: "Created At" },
];

const ERROR_MSG = "Admin role required! Please contact support.";

const usersData = ref<UsersResponse | null>(null);

const hasMore = computed(() => {
  return usersData.value?.pagination.hasMore;
});

const offset = computed(() => {
  return usersData.value?.pagination.offset;
});

const tableRows = computed(() => {
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
    console.log(usersData.value);
  },
  onError: () => {
    if (error.value.status === 403) {
      toast.error(ERROR_MSG);
    }
    return;
  },
});

const loadMore = () => {
  const limit = usersData.value?.pagination.limit;

  execute({
    params: { limit, offset: offset.value + limit },
  });
};

onMounted(() => {
  execute();
});
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <VLoader
      v-if="loading && !usersData"
      color="primaryDark"
      size="w-[100px] h-[100px]"
    />
    <div
      v-else-if="tableRows"
      class="w-full h-full flex flex-col gap-4 items-center"
    >
      <VTable
        :rows="tableRows"
        :heads="TABLE_HEADS"
      />
      <VButton
        v-if="hasMore"
        text="Load More"
        :loading="loading"
        variant="loadMore"
        load-color="primaryDark"
        @click="loadMore()"
      />
    </div>
  </div>
</template>
