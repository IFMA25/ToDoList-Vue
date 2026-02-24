<script setup lang="ts">
import { computed } from "vue";

const {
  width,
  height,
  variant = "base",
  rounded = "lg",
} = defineProps<{
  width: string;
  height: string;
  variant?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  count?: number;
}>();

const variantStyle = {
  base: "overflow-hidden relative bg-gradient-to-r from-skeletonBase via-skeletonShimmer to-skeletonBase bg-[length:1000px_100%] animate-shimmer-pulse",
};

const roundedMap: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const computedClasses = computed(() => [
  roundedMap[rounded],
  width,
  height,
  variantStyle[variant],
]);
</script>

<template>
  <div :class="computedClasses" />
</template>
