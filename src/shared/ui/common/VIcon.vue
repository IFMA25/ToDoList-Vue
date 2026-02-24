<script setup lang="ts">
import { computed } from "vue";
import type { Component } from "vue";

const {
  type,
  size = "w-5 h-5",
} = defineProps<{
  type: string;
  size?: string;
}>();

const icons = import.meta.glob<Component>("@/shared/assets/icons/*.svg", {
  eager: true,
  import: "default",
});

const icon = computed<Component | null>(() => {
  const key = `/src/shared/assets/icons/${type}.svg`;
  return icons[key] ?? null;
});
</script>

<template>
  <component
    :is="icon"
    v-if="icon"
    :class="size"
    aria-hidden="true"
  />
</template>
