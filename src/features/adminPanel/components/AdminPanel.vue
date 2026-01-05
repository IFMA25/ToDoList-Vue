<script setup>
import { onMounted } from "vue";

import { useAdminStore } from "@/features/adminPanel/composables/useAdminStore";
import VLoader from "@/shared/ui/common/VLoader.vue";
import VTable from "@/shared/ui/common/VTable.vue";


const TABLE_HEADS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "createdAt", label: "Created At" },
];

const adminStore = useAdminStore();

onMounted(async () => {
  await adminStore.fetchUsers();
});

</script>

<template>
  <div class="h-full flex  items-center justify-center">
    <VLoader
      v-if="adminStore.loading"
      color="primaryDark"
      size="w-[100px] h-[100px]"
    />
    <VTable
      v-else-if="adminStore.tableRows"
      :rows="adminStore.tableRows"
      :heads="TABLE_HEADS"
    />
  </div>
</template>
