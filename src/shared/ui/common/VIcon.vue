<script setup lang="ts">
import { computed } from "vue";
import type { Component } from "vue";

const props = withDefaults(defineProps<{
  name: string
  size?: number
}>(), {
  size: 20,
});

const icons = import.meta.glob<Component>("@/shared/assets/icons/*.svg", {
  eager: true,
  import: "default",
});

const icon = computed<Component | null>(() => {
  const key = `/src/shared/assets/icons/${props.name}.svg`;
  return icons[key] ?? null;
});
</script>

<template>
  <component
    :is="icon"
    v-if="icon"
    :style="{ width: `${props.size}px`, height: `${props.size}px` }"
    class="shrink-0 fill-current"
    aria-hidden="true"
  />
</template>
