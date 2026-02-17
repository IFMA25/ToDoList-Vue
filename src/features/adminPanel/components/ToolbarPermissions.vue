<script setup lang="ts">
import { RoleOption } from "../types";

import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import VSelect from "@/shared/ui/common/VSelect.vue";

defineProps<{
  roleOptions: RoleOption[];
  labelCheckbox: string;
  allSelected: boolean;
}>();

const role = defineModel<RoleOption | null>("role");

const emit = defineEmits<{
  "update:allSelected": [value: boolean];
}>();
</script>

<template>
  <div class="flex justify-between items-center">
    <VSelect
      id="role-select"
      v-model="role"
      label-text="Role"
      :options="roleOptions"
      label="label"
      track-by="value"
      :close-on-select="true"
      class="min-w-[9.6rem]"
    />
    <VCheckbox
      width="w-5"
      height="h-5"
      variant="default"
      :label="labelCheckbox"
      :model-value="allSelected"
      @update:model-value="emit('update:allSelected', $event)"
    />
  </div>
</template>
