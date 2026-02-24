<script setup lang="ts">
import { RoleOption, SortOption } from "../types";

import VInput from "@/shared/ui/common/VInput.vue";
import VSelect from "@/shared/ui/common/VSelect.vue";

defineProps<{
  options: {
    roleOptions: RoleOption[];
    sortOptions: SortOption[];
  };
}>();

const search = defineModel<string>("search");
const role = defineModel<RoleOption>("role");
const sort = defineModel<SortOption>("sort");
</script>

<template>
  <div class="flex items-center gap-4 mb-6">
    <VInput
      v-model="search"
      :placeholder="$t('search.placeholder')"
      type="search"
      variant="search"
      icon-left="icon-search"
    />
    <VSelect
      id="role-select"
      v-model="role"
      label-text="Role"
      :options="options.roleOptions"
      label="label"
      track-by="value"
      :close-on-select="true"
      class="min-w-[9.6rem]"
    />
    <VSelect
      id="sort-select"
      v-model="sort"
      label-text="Sort by"
      :options="options.sortOptions"
      label="label"
      track-by="key"
      :close-on-select="true"
      class="min-w-[13rem]"
    />
  </div>
</template>
