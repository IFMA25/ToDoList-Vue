<script setup lang="ts">
import { Category, Permission } from "../types";

import VSwitch from "@/shared/ui/common/VSwitch.vue";

const {
  categories,
  allPermissions,
  modelValue,
} = defineProps<{
  categories: Category[];
  allPermissions: Permission[];
  modelValue: Record<string, boolean>;
}>();

const emit = defineEmits(["update:modelValue"]);

const permissionsForCategory  = (category: Category) => {
  return allPermissions.filter(p => category.value.includes(p.category));
};
</script>

<template>
  <div class="grid grid-cols-[max-content_max-content] gap-y-8 gap-x-32 ">
    <div
      v-for="category in categories"
      :key="category.key"
      class="flex flex-col gap-4 w-[19.5rem]"
    >
      <h3 class="text-lg font-bold leading-tight">
        {{ category.label }}
      </h3>
      <VSwitch
        v-for="permission in permissionsForCategory(category)"
        :id="`permission-${permission.key}`"
        :key="permission.key"
        :model-value="modelValue[permission.value]"
        variant="default"
        :label="permission.description"
        @update:model-value="(val) => {
          emit('update:modelValue', { ...modelValue, [permission.value]: val })
        }"
      />
    </div>
  </div>
</template>
