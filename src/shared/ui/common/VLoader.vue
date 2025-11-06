<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ size?: "sm" | "md" | "lg" }>();

const sizeClass = computed(() => {
  switch (props.size) {
    case "sm": return "w-4 h-4 border-2";
    case "md": return "w-6 h-6 border-[3px]";
    case "lg": return "w-8 h-8 border-[3px]";
    default: return "w-6 h-6 border-2";
  }
});
</script>

<template>
  <div
    :class="[
      'animate-spin rounded-full border-gray-500 border-t-transparent',
      sizeClass,
    ]"
  />
</template>
